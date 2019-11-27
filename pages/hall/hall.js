const app = getApp()

Page({
  data: {
    userInfo: {
      isCoach: false
    },
    systemInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    coachArray: 
      [ {
        avater: "../../image/icon64_appwx_logo.png",
        nickname: "蒙娜丽莎（Lily）",
        experience: "3年"
      },
         {
          avater: "../../image/icon64_appwx_logo.png",
          nickname: "蒙娜丽莎（Lily）",
          experience: "4年"
        }],
    studentArray:[
      {
        avater: "../../image/icon64_appwx_logo.png",
        nickname: "蒙娜丽莎（Lily）",
        totalClass:10,
        curClass:2,
        isReverse:true,       //是否预约
      },
      {
        avater: "../../image/icon64_appwx_logo.png",
        nickname: "蒙娜丽莎（Lily）",
        totalClass: 10,
        curClass: 2,
        isReverse: false,       //是否预约
      },
    ],
    isReverseNum:0
  },
  clickCoach(e) {
    //console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '../index/index',
      success:(res)=>{
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      app.globalData.userInfo.isCoach = false;   //test
      this.setData({
        userInfo: app.globalData.userInfo,
        systemInfo: app.globalData.systemInfo
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        res.userInfo.isCoach = false; //test
        this.setData({
          userInfo: res.userInfo,
          systemInfo: app.globalData.systemInfo
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            systemInfo: app.globalData.systemInfo
          })
        }
      })
    }
    this.getReverseNum();
  },


  //计算预约人数
  getReverseNum:function() {
    let studentArr = this.data.studentArray;
    let num = 0;

    for(let i = 0;i < studentArr.length; i++) {
      if(studentArr[i].isReverse)
        num++;
    }

    this.setData({
      isReverseNum:num
    })
  }
})