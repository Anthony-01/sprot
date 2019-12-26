const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const showToast = (data) => {
  let icon = 'success';
  if (data.code != 1) {
    icon = 'none'
  }
  wx.showToast({
    title: data.msg,
    icon: icon
  })
}

const showTip = (str) => {
  wx.showToast({
    title: str,
    icon: 'none'
  })
} 

const transfromTime = (time) => {
  let back;
  let data = new Date(time);
  back = data.toLocaleString('zh-CN');
  let txt;
  if (/上午/.test(back)) {
    txt = 'AM'
  } else {
    txt = 'PM';
  }
  back = back.replace(/\//g, "-");
  back = back.replace(/上午/, "");
  back = back.replace(/下午/, "");
  return back + " " + txt;
}

module.exports = {
  formatTime: formatTime,
  showToast: showToast,
  showTip: showTip,
  transfromTime: transfromTime
}
