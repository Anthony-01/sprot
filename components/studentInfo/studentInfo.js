// components/studentInfo.js
const app = getApp();

import myHttp from '../../utils/http.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hidden: {
      type: Boolean,
      value: true
    }
  },

  observers: {
    'hidden': function (value) {
      console.log("info hidden", value)
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: {
      avater: "../../image/lily.png",
      nickname: "蒙娜丽莎(Lily)",
      identity: "学员",
      isCoach: false,
      code: "58DF359S"
    },
    gender: 1
  },

  //初始化
  attached() {
    // app.globalData.userInfo = data.payload;
    // wx.request({
    //   url: httpConfig.host + httpConfig.infoApi.url,
    //   method: httpConfig.infoApi.method,
    //   success(res) {
    //     console.error("请求信息成功:", res);
    //   },
    //   fail(err) {
    //     console.log(err);
    //   }
    // })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //换一组
    copy(e) {
      wx.setClipboardData({
        data: this.data.userInfo.code,
      })
    },
    //复制
    change(e) {
      let code = this.data.userInfo.code;
      let newCode = code.split('');
      newCode.shift();
      newCode.unshift(Math.floor(Math.random() * 10));
      newCode = newCode.join("");
      let ccode = "userInfo.code";
      this.setData({
        [ccode] :newCode
        
      })
    },
    //选择性别
    sexTab(e) {
      let id = e.currentTarget.dataset.id,
        index = parseInt(e.currentTarget.dataset.index),
        num = parseInt(e.currentTarget.dataset.index)
      let gender = e.currentTarget.dataset.index;
      var that = this;
      if (this.data.gender == gender) return;

      this.setData({
        gender: gender
      })
    },
    setInfo() {
      let user = app.globalData.userInfo;
      this.setData({
        ["userInfo.nickname"]: user.nickname,
        gender: user.gender,
        ["userInfo.avater"]: user.avatarUrl,
        ["userInfo.code"]: user.uniqueCode,
        ["userInfo.identity"]: user.userType == 1 ? "教练" : "学员",
      })
    },
    show() {
      this.setData({
        hidden: false
      })
    },
    hidden() {
      this.setData({
        hidden: true
      })
    }
  },

  
  options: {
    addGlobalClass: true
  }
})
