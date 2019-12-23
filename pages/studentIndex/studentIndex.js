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
    current: "mine",
    isIphoneX: false,

    coachList: [],
    pages: []

  },
  
  handleChange({ detail }) {
    let title;
    switch (detail.key) {
      case "homepage": {
        title = "首页";
        break;
      }
      case "order": {
        title = "我的预约";
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
        title = "我的信息"
        break;
      }
    }
    wx.setNavigationBarTitle({
      title: title
    })

    let isIphoneX = app.globalData.isIphoneX;

    this.setData({

      isIphoneX: isIphoneX

    })

    console.log("student", this.data.isIphoneX);

    // const eventChannel = this.getOpenerEventChannel();
    // eventChannel.on(customEvent.SET_COACH, this.setCoach);
    this.setCoach()
    this.requestUserInfo();

  },



  /**
   * 请求用户个人信息
   * */ 
  requestUserInfo() {

    if (app.globalData.userInfo != null) return;
    let httpConfig = app.globalData.http;
    let self = this;
    myHttp.request(httpConfig.infoApi.url, httpConfig.infoApi.method).then(data => {
      console.error("个人信息:", data);
      if (data.code == 1) {
        app.globalData.userInfo = data.payload;
        let indexPage = self.selectComponent('#studentIndex');
        indexPage.setInfo();
        let infoPage = self.selectComponent('#studentInfo');
        infoPage.setInfo();
      }
    }).catch(err => {
      console.error(err);
      wx.showToast({
        title: '获取个人信息失败:',
      })
    })
  },

  setCoach() {
    let data = app.globalData.myCoaches;
    console.log("设置我的教练", data);
    let slef = this;

    this.setData({
      coachList: [{ 
        nickName: "莎士比亚(Lucy)",
        avator: "../../image/lucy.png",
        experience: "2年",
        gender: 1
      }
      ]
    }, () => {
      console.log(slef.data.coachList);
    })
    this.selectComponent('#studentIndex').setCoachList([
      {
        nickName: "莎士比亚(Lucy)",
        avator: "../../image/lucy.png",
        experience: "2年",
        gender: 1
      },
      {
        nickName: "莎士比亚(Lucy)",
        avator: "../../image/lucy.png",
        experience: "2年",
        gender: 1
      },
      {
        nickName: "莎士比亚(Lucy)",
        avator: "../../image/lucy.png",
        experience: "2年",
        gender: 1
      },
      {
        nickName: "莎士比亚(Lucy)",
        avator: "../../image/lucy.png",
        experience: "2年",
        gender: 1
      },
      {
        nickName: "莎士比亚(Lucy)",
        avator: "../../image/lucy.png",
        experience: "2年",
        gender: 1
      },
      {
        nickName: "莎士比亚(Lucy)",
        avator: "../../image/lucy.png",
        experience: "2年",
        gender: 1
      },
      {
        nickName: "莎士比亚(Lucy)",
        avator: "../../image/lucy.png",
        experience: "2年",
        gender: 1
      },
      {
        nickName: "莎士比亚(Lucy)",
        avator: "../../image/lucy.png",
        experience: "2年",
        gender: 1
      },
      {
        nickName: "莎士比亚(Lucy)",
        avator: "../../image/lucy.png",
        experience: "2年",
        gender: 1
      },
      {
        nickName: "莎士比亚(Lucy)",
        avator: "../../image/lucy.png",
        experience: "2年",
        gender: 1
      },
      {
        nickName: "莎士比亚(Lucy)",
        avator: "../../image/lucy.png",
        experience: "2年",
        gender: 1
      },
      {
        nickName: "莎士比亚(Lucy)",
        avator: "../../image/lucy.png",
        experience: "2年",
        gender: 1
      }
    ])
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