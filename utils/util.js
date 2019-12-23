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

module.exports = {
  formatTime: formatTime,
  showToast: showToast
}
