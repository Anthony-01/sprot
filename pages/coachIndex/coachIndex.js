// pages/coachIndex/coachIndex.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerTxt: `欢迎回来！\n您可以在此管理您的课程，并添加预约的新学员，也可添加您的教练`,
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
    switch (detail.key) {
      case "homepage": {
        title = "首页";
        break;
      }
      case "studentpage": {
        title = "我的学员";
        break;
      }
      case "orderpage": {
        title = "课程预约";
        break;
      }
      case "mine": {
        title = "我的信息";
        break;
      }
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