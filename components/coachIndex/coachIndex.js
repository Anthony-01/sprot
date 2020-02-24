// components/coachIndex/coachIndex.js
// components/studentIndex/studentIndex.js

const app = getApp();
const coachDetalPath = "/pages/coachInfo/coachInfo";
const searchPath = "/pages/search/search";

import myHttp from '../../utils/http.js';
import util from '../../utils/util.js';
import customEvent from '../../utils/customEvent.js';

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
  //https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=2dea904982d4b31ce4319ce9e6bf4c1a/622762d0f703918fc7ebb6c0583d269759eec486.jpg
  data: {
    headerTxt: `欢迎回来！\n您可以在此管理您的课程，并添加预约的新学员，也可添加您的教练。`,
    imageSrc: "",
    userInfo: {
      avatar: "",
      nickname: ""
    },
    coachList: [],
    workingYears: ['一年', '两年', '三年', '三年以上']
  },

  attached() {
    console.log("设置教练:", app.globalData.myCoaches);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    coachDetail(e) {
      //进入教练详情页并且导入信息
      let index = e.currentTarget.dataset.index;
      let user = this.data.coachList[index];
      wx.navigateTo({
        url: coachDetalPath,
        success(res) {
          console.log("路由导航成功");
          res.eventChannel.emit(customEvent.SET_COACH, { user: user });
        },
        fail(err) {
          console.log("进入页面失败:", err);
        }
      })
    },
    setInfo() {
      let user = app.globalData.userInfo;
      console.log("设置用户信息:", user);
      this.setData({
        ["userInfo.avatar"]: user.avatarUrl,
        ["userInfo.nickname"]: user.nickname
      })
    },
    setCoachList(data) {
      console.log("CoachComponent设置我的教练:", data);
      console.log("*****************")
      console.log(data[0].avatarUrl);
      this.setData({
        coachList: data
      })
      console.log("*****************")
    },
    onAddCoach() {
      wx.navigateTo({
        url: searchPath
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})

