// components/studentInfo.js
const app = getApp();

import myHttp from '../../utils/http.js';
import util from '../../utils/util.js'

const mobileRegExp = /^1[345678]\d{9}$/;

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

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: {
      avater: "../../image/lily.png",
      nickname: "蒙娜丽莎(Lily)",
      identity: "学员",
      isCoach: false,
      code: "58DF359S",
      tel: ""
    },
    gender: 1,
    status: -1,
    statusClass: "",
    stateTxt: ""
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

      // this.setData({
      //   gender: gender
      // })
    },

    /**
     * 电话号码提交
    */
    _telSubmit(e) {
      console.error('电话号码信息:', e);
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

    /**
     * 申请成为教练
    */
    _applyBecomeCoach() {
      let tel = app.globalData.userInfo.mobile;
      if (!mobileRegExp.test(tel)) {
        util.showTip("请输入联系电话后再申请成为教练!");
        return;
      }
      let user = app.globalData.userInfo;
      if (user.applyCoachState == 0) {
        util.showTip("目前是审核状态，请耐心等候!");
        return;
      }
      //必须填写电话号码之后才能申请成为教练

      let coach = app.globalData.http.becomeCoachApi;
      myHttp.request(coach.url, coach.method, null).then(data => {
        console.error(data);
        util.showToast(data);
        //变更状态为申请中
        if (data.code == 1) {
          app.globalData.userInfo.applyCoachState = 0;
          this.setData({
            status: 0,
            statusClass: "waiting"
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    
    /**
     * 设置个人信息
    */
    setInfo() {
      let user = app.globalData.userInfo;

      let txt;
      let classes;
      switch (user.applyCoachState) {
        case -1:{
          txt = "可申请"
          classes = "applying"
          break;
        }
        case 0: {
          txt = "申请中"
          classes = "waiting"
          break;
        }
        case 1: {
          txt = "已通过"
          classes = "passed"
          break;
        }
        case 2: {
          txt = "申请失败"
          classes = "rejected"
          break;
        }
      }
      this.setData({
        ["userInfo.nickname"]: user.nickname,
        gender: user.gender,
        ["userInfo.avater"]: user.avatarUrl,
        ["userInfo.code"]: user.uniqueCode,
        ["userInfo.identity"]: user.userType == 1 ? "教练" : "学员",
        ["userInfo.tel"]: user.mobile,
        applyCoachState: user.applyCoachState,
        stateTxt: txt,
        statusClass: classes
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
