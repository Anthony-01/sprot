// pages/coachIndex/coachIndex.js
const app = getApp()

import myHttp from '../../utils/http.js';
import util from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerTxt: `欢迎回来！\n您可以在此管理您的课程，并添加预约的新学员，也可添加您的教练`,
    imageSrc: "../../image/gao.png",
    current: "mine",
    isIphoneX: false
  },
  handleChange({ detail }) {
    let title;
    switch (detail.key) {
      case "homepage": {
        title = "首页";
        // this.requestUserInfo();
        this.getUserInfo();
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
    
    let self = this;
    wx.setNavigationBarTitle({
      title: title,
      success() {
        // if (detail.key == "mine") {
        //   let infoPage = self.selectComponent("#coach-info");
        //   // infoPage.setInfo();
        //   infoPage.adjust();
        // }
        
      }
    })

    this.setData({
      current: detail.key
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handleChange({ 
      detail: {
        key: this.data.current
      }
    })

    let isIphoneX = app.globalData.isIphoneX;

    this.setData({

      isIphoneX: isIphoneX

    })

    this.getUserInfo();
    let self = this;
    setTimeout(() => {
      self.handleChange({
        detail: {
          key: "homepage"
        }
      })
    }, 1000)
    
  },

  getUserInfo() {

    if (app.globalData.userInfo != null) {
      this.setComponentUser();
      this.setCoach();
      return;
    };

    let user = app.globalData.http.infoApi;
    let self = this;
    myHttp.request(user.url, user.method, null).then(data => {
      console.error(data);
      if (data.code == 1) {
        console.log("*************");
        console.log(data);
        app.globalData.userInfo = data.payload;
        // let indexPage = self.selectComponent("#coach-index");
        // indexPage.setInfo();
        // let infoPage = self.selectComponent("#coach-info");
        // infoPage.setInfo();
        // let myStudentPage = self.selectComponent("#coach-students");
        // myStudentPage.requestMyStudents();
        // let orderPage = self.selectComponent("#coach-order");
        // orderPage.requestMyOrderes();
        self.setComponentUser();
      } else {
        util.showToast(data);
      }
    })
  },

  setComponentUser() {
    let indexPage = this.selectComponent("#coach-index");
    indexPage.setInfo();
    let infoPage = this.selectComponent("#coach-info");
    infoPage.setInfo();
    let myStudentPage = this.selectComponent("#coach-students");
    myStudentPage.requestMyStudents();
    let orderPage = this.selectComponent("#coach-order");
    orderPage.requestMyOrderes();
  },

  setCoach() {
    let data = app.globalData.myCoaches;
    // console.log("设置我的教练", data);
    let slef = this;
    let myCoaches = app.globalData.http.myCoachesApi;
    let coachIndexPage = this.selectComponent("#coach-index");

    myHttp.request(myCoaches.url, myCoaches.method, null).then(data => {
      if (data.code == 1) {
        console.error("教练页面我的教练数据:");
        console.log(data);
        coachIndexPage.setCoachList(data.payload);
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
    wx.hideHomeButton();
    let title;
    let self = this;
    
    
    switch (this.data.current) {
      case "homepage": {
        title = "首页";
        this.getUserInfo();
        break;
      }
      case "studentpage": {
        title = "我的学员";
        let myStudentPage = self.selectComponent("#coach-students");
        myStudentPage.requestMyStudents();
        break;
      }
      case "orderpage": {
        title = "课程预约";
        let orderPage = self.selectComponent("#coach-order");
        orderPage.requestMyOrderes();
        break;
      }
      case "mine": {
        title = "我的信息";
        this.getUserInfo();
        break;
      }
    }

    wx.setNavigationBarTitle({
      title: title
    })

    //刷新个人信息
    

    //刷新学员信息

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