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

const toDouble = (num) => {
  if (num < 10) {
    return "0" + num;
  }
  return num
}

const transfromTime = (time) => {
  if (time == null) return '';
  let back;
  let data = new Date(time);

  let year = data.getFullYear();
  let month = data.getMonth();
  let date = data.getDate();
  let hour = data.getHours();
  let min = data.getMinutes();
  let seconds = data.getSeconds();

  back = `${year}/${month + 1}/${date} ${toDouble(hour)}:${toDouble(min)}:${toDouble(seconds)}`
  return back;

  // back = data.toLocaleString('zh-CN');
  // let txt;
  // if (/上午/.test(back)) {
  //   txt = 'AM'
  // } else {
  //   txt = 'PM';
  // }
  // back = back.replace(/\//g, "-");
  // back = back.replace(/上午/, "");
  // back = back.replace(/下午/, "");
  // return back + " " + txt;
}

const transfromOrderTime = (time) => {
  // if (time == null) return '';
  // let back;
  // let data = new Date(time);
  // back = data.toLocaleString('zh-CN');
  // let txt;
  // if (/上午/.test(back)) {
  //   txt = 'AM'
  // } else {
  //   txt = 'PM';
  // }
  // back = back.replace(/\//g, "-");
  // back = back.replace(/上午/, "");
  // back = back.replace(/下午/, "");
  // return back + " " + txt;
  let back = transfromTime(time);
  back = back.replace(/\//g, "-");
  return back;
}

const toChNumber = (num)=> {
  let back = "未知";
  switch(num) {
    case 1: {
      back = "一";
      break;
    }
    case 2: {
      back = "二";
      break;
    }
    case 3: {
      back = "三";
      break;
    }
    case 4: {
      back = "四";
      break;
    }
    case 5: {
      back = "五";
      break;
    }
    case 6: {
      back = "六";
      break;
    }
    case 7: {
      back = "七";
      break;
    }
    case 8: {
      back = "八";
      break;
    }
    case 9: {
      back = "九";
      break;
    }
    case 10: {
      back = "十";
      break;
    }
    case 11: {
      back = "十一";
      break;
    }
    case 12: {
      back = "十二";
      break;
    }
    case 13: {
      back = "十三";
      break;
    }
    case 14: {
      back = "十四";
      break;
    }
    case 15: {
      back = "十五";
      break;
    }
    case 16: {
      back = "十六";
      break;
    }
    case 17: {
      back = "十七";
      break;
    }
    case 18: {
      back = "十八";
      break;
    }
    case 19: {
      back = "十九";
      break;
    }
    case 20: {
      back = "二十";
      break;
    }

  }
  return back;
}

module.exports = {
  formatTime: formatTime,
  showToast: showToast,
  showTip: showTip,
  transfromTime: transfromTime,
  toChNumber: toChNumber,
  transfromOrderTime: transfromOrderTime
}
