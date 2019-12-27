//index.js
//获取应用实例
const app = getApp()

const cStudentRoute = 1;
const cCoachRoute = 2;

const studentRouteSrc = "/pages/studentIndex/studentIndex";
const coachRouteSrc = "/pages/coachIndex/coachIndex";

//用户类型
const commonType = 0;
const coachType = 1;

import customEvent from '../../configs/customEvent.js';

import myHttp from '../../utils/http.js';



Page({
  data: {
    //路由
    studentIndex: 1,
    coachIndex: 2,
    notAuthorize: false,
    userCode: ""
  },
  /**
   * 页面初始化函数
  */
  onLoad: function (option) {
    // this.login().then(data => {
    //   // console.log("返回信息:", data);
    //   this.enterIndex(data);
    // }).catch(() => {
    //   console.log("用户未授权")
    // })
  },

  onShow() {
    this.login().then(data => {
      // console.log("返回信息:", data);
      this.enterIndex(data);
    }).catch(() => {
      console.log("用户未授权")
    })
  },
  

  /*******************************/ 
  /**********自定义方法************/ 
  /*******************************/ 
  handleClick(event) {
    let route;
    switch (event.currentTarget.dataset.index) {
      case cStudentRoute: {
        route = studentRouteSrc;
        break;
      }
      case cCoachRoute: {
        route = coachRouteSrc;
        break
      }
    }

    wx.navigateTo({
      url: route,
      success() {

      },
      fail(err) {
        console.log(err);
      }
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserInfo(res) {
    console.error("获得用户信息:", res);
    if (res.detail.rawData) {
      // let info = {}
      // var userInfo = res.userInfo
      let data = {};
      for (let name in res.detail) {
        data[name] = res.detail[name];
      }
      data.code = this.data.userCode;
      this.enterIndex(data);
    } else {

    }
  },
  

  /**
   * 用户登录
  */
  login() {
    let self = this;
    return new Promise((resolve, reject) => {
      wx.login({
        success(loginRes) {
          // console.log("登陆成功:", loginRes);
          self.setData({
            userCode: loginRes.code
          })
          //获取用户设置
          wx.getSetting({
            success(res) {
              // console.log(res);
              //消除loading
              if (res.authSetting['scope.userInfo'] === true) { //已经授权并且返回个人信息
                self.getWXUserInfo(loginRes.code, resolve, reject);
              } else {
                reject(null);
                self.setData({
                  notAuthorize: true
                })
              }
            }
          })

        },
        //登录失败
        fail(err) {
          console.error("登录失败!", err);
        }
      })
    })
  },

  /**
   * 获取用户微信信息
  */
  getWXUserInfo(code, resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        // console.log("getUserInfo接口返回:", res);
        let data = {};
        for (let name in res) {
          data[name] = res[name];
        }
        data.code = code;
        // console.log("已授权用户：", data);
        resolve(data);
      }
    })
  },

  //获取服务器数据并进入相应界面
  enterIndex(data) {
    // console.error("进入页面所需要的信息", data);
    // this.getSportUserInfo(data);
    this.getSportUserInfoByMyHttp(data);
    
  },
  /**
   * 第三方服务器获取消息
   * @return 第三方服务器保存的用户信息
  */
  getSportUserInfo(info) {
    let self = this;
    let httpConfig = app.globalData.http;
    let data = {
      code: info.code,
      rawData: info.rawData,
      encryptedData: info.encryptedData,
      iv: info.iv,
      signature: info.signature
    };
    // console.error("发送数据", data)
    return new Promise((resolve, reject) => {
      wx.request({
        url: httpConfig.host + httpConfig.loginApi.url,
        data: data,
        responseType: "text",
        dataType: 'json',
        method: httpConfig.loginApi.method,
        success(res) {
          if (res.data.code ==1) {
            // console.error("responseData:",res);
            app.globalData.token = res.data.payload.token;
            // let coaches = 
            let url;
            switch (res.data.payload.userType) {
              case commonType: {
                url = studentRouteSrc;
                break;
              }
              case coachType: {
                url = coachRouteSrc;
                break;
              }
            }
            wx.navigateTo({
              url: coachRouteSrc,
              success(navigateRes) {
                navigateRes.eventChannel.emit(customEvent.SET_COACH, {data: res.data.payload.MyCoaches})
              }
            })
          } else {
            console.error("登录失败:", res);
          }
          

        },
        fail(err) {
          console.err(err);
        },
        complete() {
          console.log("完成请求")
        }
      })
    }) 
  },
  getSportUserInfoByMyHttp(info) {
    let self = this;
    let httpConfig = app.globalData.http;
    let data = {
      code: info.code,
      rawData: info.rawData,
      encryptedData: info.encryptedData,
      iv: info.iv,
      signature: info.signature
    };
    myHttp.request(httpConfig.loginApi.url, httpConfig.loginApi.method, data).then(data => {
      if (data.code == 1) {
        // console.error("responseData:", data);
        let url;
        switch (data.payload.userType) {
          case commonType: {
            url = studentRouteSrc;
            break;
          }
          case coachType: {
            url = coachRouteSrc;
            break;
          }
        }
        app.globalData.myCoaches = data.payload.MyCoaches
        wx.reLaunch({
          url: url,
          success(navigateRes) {
            // console.log(navigateRes)
            // navigateRes.eventChannel.emit(customEvent.SET_COACH, { data: data.payload.MyCoaches })
          }
        })
      } else {
        
        console.error("登录失败:", data);
      }
    }).catch(err => {
      console.error("登录失败:", res);
    })
  }
})
