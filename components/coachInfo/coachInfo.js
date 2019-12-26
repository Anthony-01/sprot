// components/coachInfo/coachInfo.js
let app = getApp();

import myHttp from '../../utils/http.js';
import util from '../../utils/util.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hidden: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: {
      avatar: "../../image/lily.png",
      nickname: "蒙娜丽莎(Lily)",
      identity: "教练",
      isCoach: false,
      code: "58DF359S",
      tel: "",
      workingYear: null,
      teachingStyle: "",
      intro: ""
    },
    
    gender: 1,
    array: ['1年', '2年', '3年', '3年以上'],
    detail: false
  },
  lifetimes: {
    attached() {
      var phone = wx.getSystemInfoSync();  //调用方法获取机型

      var that = this;

      if (phone.platform == 'ios') {

        that.setData({

          detail: true

        });

      } else if (phone.platform == 'android') {

        that.setData({

          detail: false

        });

      }
      console.log(phone);
      console.log("check:", this.data.detail)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //复制
    copy(e) {
      wx.setClipboardData({
        data: this.data.userInfo.code,
      })
    },
    //换一组
    _change(e) {
      let self = this;
      let ccode = "userInfo.code";
      let modifyCode = app.globalData.http.uniqueCodeApi;

      myHttp.request(modifyCode.url, modifyCode.method, null).then(data => {
        console.error("专属码:", data);
        util.showToast(data);
        if (data.code == 1) {
          self.setData({
            [ccode]: data.payload.newUniqueCode
          })
          app.globalData.userInfo.uniqueCode = data.payload.newUniqueCode;
        }
      })
    },
    //选择性别
    _sexTab(e) {
      let id = e.currentTarget.dataset.id,
        index = parseInt(e.currentTarget.dataset.index),
        num = parseInt(e.currentTarget.dataset.index)
      let gender = e.currentTarget.dataset.index;
      var that = this;
      if (this.data.gender == gender) return;

      let modifyGender = app.globalData.http.genderApi;
      myHttp.request(modifyGender.url + '?Gender=' + gender, modifyGender.method, null).then(data => {
        console.log("返回修改性别的信息：", data);
        //if code == 1 操作成功
        util.showToast(data);
        if (data.code == 1) {
          that.setData({
            gender: gender
          })
          app.globalData.userInfo.gender = gender;
        }
      }).catch(err => {

      })
    },
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value);
      let self = this;
      this.setData({
        ["userInfo.workingYear"]: e.detail.value
      })
      let modifyWork = app.globalData.http.modifyWorkApi
      myHttp.request(modifyWork.url + "?workingYears=" + e.detail.value, modifyWork.method, null).then(data => {
        util.showToast(data);
        console.log(data);
        if (data.code != 1) {
          self.setData({
            ["userInfo.workingYear"]: undefined
          })
        } else {
          app.globalData.userInfo.workingYears = e.detail.value;
        }
      }).catch(err => {
        console.error(err);
      })
      
    },
    setInfo() {
      let user = app.globalData.userInfo;

      this.setData({
        ["userInfo.avatar"]: user.avatarUrl,
        ["userInfo.nickname"]: user.nickname,
        ["userInfo.identity"]: user.userType == 1 ? "教练" : "学员",
        ["userInfo.code"]: user.uniqueCode,
        ["userInfo.tel"]: user.mobile,
        gender: user.gender,
        ["userInfo.workingYear"]: user.workingYears,
        ["userInfo.teachingStyle"]: user.teachingStyle,
        ["userInfo.intro"]: user.intro
      })
    },

    _telSubmit(e) {
      let self = this;
      let tel = e.detail.value;

      let modifyTel = app.globalData.http.mobileApi;

      myHttp.request(modifyTel.url + '?mobile=' + tel, modifyTel.method, null).then(data => {
        console.error('电话提交信息:', data);
        util.showToast(data);
        if (data.code != 1) {
          self.setData({
            ['userInfo.tel']: ""
          })
        } else {
          app.globalData.userInfo.mobile = tel;
        }
      }).catch(err => {

      })
    },
    _introSubmit(e) {
      let self = this;
      let intro = e.detail.value.length ? e.detail.value : null;

      let modifyIntro = app.globalData.http.modifyIntroApi;
      myHttp.request(modifyIntro.url + "?intro=" + intro, modifyIntro.method, null).then(data => {
        util.showToast(data);
        console.error(data);
        if (data.code != 1) {
          self.setData({
            ["userInfo.intro"]: null
          })
        } else {
          app.globalData.userInfo.intro = intro;
        }
      })
    },
    _teachStyleSubmit(e) {
      let self = this;
      let teachingStyle = e.detail.value.length ? e.detail.value : '\s';

      let modifyTeachingStyle = app.globalData.http.modifyTeachApi;
      myHttp.request(modifyTeachingStyle.url + "?teachingStyle=" + teachingStyle, modifyTeachingStyle.method, null).then(data => {
        util.showToast(data);
        console.error(data);
        if (data.code != 1) {
          self.setData({
            ["userInfo.teachingStyle"]: null
          })
        } else {
          app.globalData.userInfo.teachingStyle = teachingStyle
        }
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})

