// pages/studentIndex/studentIndex.js
const app = getApp();

import customEvent from '../../configs/customEvent.js'

import myHttp from '../../utils/http.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerTxt: `欢迎来到网球预约训练场！\n您可以通过预约码预约到您的教练。\n也可以在此管理您的课程签到。`,
    imageSrc: "../../image/gao.png",
    current: "homepage",
    isIphoneX: false,

    coachList: [],
    pages: []

  },
  
  handleChange({ detail }) {
    let title;
    switch (detail.key) {
      case "homepage": {
        title = "首页";
        this.requestUserInfo();
        //是否在申请个人信息以后再重新申请教练信息
        break;
      }
      case "order": {
        title = "我的预约";
        this.setOrder();
        break;
      }
      case "mine": {
        title = "我的信息"
        break;
      }
    }
    
    wx.setNavigationBarTitle({
      title: title
    })
    let self = this;
    this.setData({
      current: detail.key
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;

    this.setData({

      isIphoneX: isIphoneX

    })

    // getOpenerEventChannel

    // let channel = this.getOpererEventChannel();


    const eventChannel = this.getOpenerEventChannel();
    
    eventChannel.on && eventChannel.on(customEvent.SET_CURRENT, this.setCurrent);
    

  },

  setCurrent(data) {
    let current = data.data.current;
    if (this.data.current == current) {
      return;
    }
    this.handleChange({detail: {
      key: current
    }})

  },



  /**
   * 请求用户个人信息
   * */ 
  requestUserInfo() {

    if (app.globalData.userInfo != null) {
      this.setComponentUser();
      this.setCoach();
      return;
    };
    let httpConfig = app.globalData.http;
    let self = this;
    myHttp.request(httpConfig.infoApi.url, httpConfig.infoApi.method).then(data => {
      // console.error("个人信息:", data);
      if (data.code == 1) {
        app.globalData.userInfo = data.payload;
        self.setComponentUser();
        self.setCoach();
      }
    }).catch(err => {
      console.error(err);
      wx.showToast({
        title: '获取个人信息失败:',
      })
    })
  },

  setComponentUser() {
    let self = this;
    let indexPage = self.selectComponent('#studentIndex');
    indexPage.setInfo();
    let infoPage = self.selectComponent('#studentInfo');
    infoPage.setInfo();
  },

  setCoach() {
    let data = app.globalData.myCoaches;
    // console.log("设置我的教练", data);
    let slef = this;
    let myCoaches = app.globalData.http.myCoachesApi;
    let studentIndexPage = this.selectComponent("#studentIndex");

    myHttp.request(myCoaches.url, myCoaches.method, null).then(data => {
      if (data.code == 1) {
        console.error("教练数据:");
        console.log(data);
        studentIndexPage.setCoachList(data.payload);
        app.globalData.myCoaches = data.payload;
      }
    }).catch(err => {
      console.error("请求教练失败:", err);
    })

    this.setData({
      coachList: data
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
    // console.error("indexShow");
    wx.hideHomeButton();
    let title;
    switch (this.data.current) {
      case "homepage": {
        title = "首页";
        break;
      }
      case "order": {
        title = "我的预约";
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

    //刷新教练以及个人信息
    this.setOrder();
    this.requestUserInfo();
    // this.setCoach();
  },

  setOrder() {
    //请求并且
    let self = this;
    let orderPage = this.selectComponent("#studentOrder");

    let orderApi = app.globalData.http.subRecordApi;//刷新预约
    myHttp.request(orderApi.url, orderApi.method, null).then(data => {
      //获得以后
      if (data.code == 1) {
        app.globalData.myOrderes = data.payload;
        orderPage.setOrderes();
      } else {
        console.log("获取预约失败");
      }
    })
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
  
  onSwitchChange({ detail }) {
    const value = detail.value;
    this.setData({
      switch: value,
      spinShow: !value
    });
  }

})