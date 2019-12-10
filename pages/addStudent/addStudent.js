// pages/addStudent/addStudent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['网球一对一项目（10节）', '篮球20人大班（15节）']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  clickUpload: (e) => {
    console.log({ name: name, phone: phone, num: num, course: course, tip: tip });
    // const query = wx.createSelectorQuery();
    // query.select('#form-name').boundingClientRect();
    // query.exec((res) => {
    //   console.log(res[0])                                       
    // })
  },
  bindblur(e) {
    console.log(e)// {value: "ff", cursor: 2} 
    switch (e.target.id) {
      case "form-name": name = e.detail.value; break;
      case "form-phone": phone = e.detail.value; break;
      case "form-num": num = e.detail.value; break;
      case "form-course": course = e.detail.value; break;
      case "form-tip": tip = e.detail.value; break;
    }
  },
  bindinput(e) {
    console.log(e)
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }
})