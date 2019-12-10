// pages/studentIndex/studentIndex.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerTxt: `欢迎来到网球预约训练场！\n您可以通过预约码预约到您的教练。\n也可以在此管理您的课程签到。`,
    imageSrc: "../../image/gao.png",
    current: "homepage",
    isIphoneX: false
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

    let isIphoneX = app.globalData.isIphoneX;

    this.setData({

      isIphoneX: isIphoneX

    })

    console.log("student", this.data.isIphoneX);
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