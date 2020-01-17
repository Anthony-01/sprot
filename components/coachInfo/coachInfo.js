// components/coachInfo/coachInfo.js
let app = getApp();

import myHttp from '../../utils/http.js';
import util from '../../utils/util.js';

const mobileRegExp = /^1[345678]\d{9}$/;

var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
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
    detail: false,
    region: [],
    customItem: '全部',
    adjust: false
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

      qqmapsdk = new QQMapWX({
        key: 'OOTBZ-2NGK4-S3SUF-DHK3S-ZEDD6-QIB6B'
      });
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
        // console.log("返回修改性别的信息：", data);
        // //if code == 1 操作成功
        // console.error("修改后的性别", gender);
        // console.log("修改后的性别", gender);
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

      console.error("设置教练信息!");

      this.setData({
        ["userInfo.avatar"]: user.avatarUrl,
        ["userInfo.nickname"]: user.nickname,
        ["userInfo.identity"]: user.userType == 1 ? "教练" : "学员",
        ["userInfo.code"]: user.uniqueCode,
        ["userInfo.tel"]: user.mobile,
        region: [user.province, user.city],
        gender: user.gender,
        ["userInfo.workingYear"]: user.workingYears,
        ["userInfo.teachingStyle"]: user.teachingStyle,
        ["userInfo.intro"]: user.intro
      })

      // this._adjust();
    },
    adjust() {
      // let self = this;
      // let modifyTeachingStyle = app.globalData.http.modifyTeachApi;
      // let teachingStyle = app.globalData.userInfo.teachingStyle;
      // console.error("****************************", teachingStyle);
      // myHttp.request(modifyTeachingStyle.url + "?teachingStyle=" + teachingStyle, modifyTeachingStyle.method, null).then(data => {
      //   util.showToast(data);
      //   console.error(data);
      //   if (data.code != 1) {
      //     self.setData({
      //       ["userInfo.teachingStyle"]: null
      //     })
      //   } else {
      //     app.globalData.userInfo.teachingStyle = teachingStyle
      //     self.setData({
      //       ["userInfo.teachingStyle"]: teachingStyle
      //     })
      //   }
      // })
      // let self = this;
      // this.setData({
      //   adjust: true
      // })
      // setTimeout(() => {
      //   self.setData({
      //     adjust: false
      //   })
      // }, 60)
    },

    _telSubmit(e) {
      let self = this;
      let tel = e.detail.value;

      if (!mobileRegExp.test(tel)) {
        util.showTip("请输入正确的电话格式!");
        this.setData({
          ["userInfo.tel"]: ""
        })
        return;
      }

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
      if (e.detail.detail.value.length == 0) return;
      let intro = e.detail.detail.value.length ? e.detail.detail.value : null;

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
          self.setData({
            ["userInfo.intro"]: intro
          })
        }
      })
    },
    _teachStyleSubmit(e) {
      console.error("教学风格");
      console.log(e);
      let self = this;
      if (e.detail.detail.value.length == 0) return;
      let teachingStyle = e.detail.detail.value.length ? e.detail.detail.value : '\s';

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
          self.setData({
            ["userInfo.teachingStyle"]: teachingStyle
          })
        }
      })
    },
    bindRegionChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this._submitLocation(e.detail.value);

    },
    _submitLocation(value) {
      //发送http请求
      if (this.data.region[0] == value[0] && this.data.region[1] == value[1]) {
        util.showTip("操作成功");
        return;
      }

      let self = this;
      let area = app.globalData.http.areaApi;
      let data = {
        country: "china",
        province: value[0],
        city: value[1]
      }

      myHttp.request(area.url, area.method, data).then(data => {
        util.showToast(data);
        if (data.code == 1) {

          self.setData({
            region: value
          });
          app.globalData.userInfo.area = value;
        }
      })


    },

    _getLocation() {
      let self = this;
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation',
              success() {
                self.getAndSetLocation();
              },
              fail() {

              }
            })
          } else {
            self.getAndSetLocation();
          }
        }
      })

    },

    getAndSetLocation() {
      let self = this;
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success(res) {
          const latitude = res.latitude
          const longitude = res.longitude
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude
            },
            success(res) {
              console.log(res);
              let value = [res.result.address_component.province, res.result.address_component.city];
              self._submitLocation(value);
            },
            fail(res) {
              util.showTip("获取地址失败，请手动选择!");
            }
          })
        }
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})

