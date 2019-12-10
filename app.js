//app.js
App({
  /**
   * 首页加载好以后调用
  */
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //console.log(logs);

    

    //分析如何进行路由界面

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res);

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    let _self = this;

    // wx.getSystemInfo({

    //   success: res => {

    //     let modelmes = res.model;

    //     if (modelmes.search('iPhone X') != -1) {

    //       _self.globalData.isIphoneX = true

    //     }

    //   }

    // })

    wx.getSystemInfo({
      success: (res)=> {
        this.globalData.systemInfo = res;
        let modelmes = res.model;

        if (modelmes.search('iPhone X') != -1) {

          _self.globalData.isIphoneX = true

        }
        console.log(res);
        console.log("is IphoneX:", _self.globalData.isIphoneX)
      }
    })
  },
  globalData: {
    userInfo: null,
    systemInfo:null,
    isIphoneX: false
  }
})