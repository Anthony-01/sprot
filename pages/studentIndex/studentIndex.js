// pages/studentIndex/studentIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerTxt: `欢迎来到网球预约训练场！\n您可以通过预约码预约到您的教练。\n也可以在此管理您的课程签到。`,
    imageSrc: "https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=2dea904982d4b31ce4319ce9e6bf4c1a/622762d0f703918fc7ebb6c0583d269759eec486.jpg",
    current: "homepage"
  },
  handleChange({ detail }) {
    //设置页面的教练数据
    //每个组件内部请求用户个人的数据，个人数据可以保存在app中间；
    //通过网络请求后者其他方式进行
    //如何改变来使componet组件展现不同
    let title;
    if (detail.key == "mine") {
      title = "我的信息"
    } else {
      title = "首页"
    }
    wx.setNavigationBarTitle({
      title: title
    })

    this.setData({
      current: detail.key
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let title;
    if (this.data.current == "mine") {
      title = "我的信息"
    } else {
      title = "首页"
    }
    console.log(title);
    wx.setNavigationBarTitle({
      title: title
    })
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

  }
})