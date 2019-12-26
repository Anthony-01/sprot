// components/studentIndex/studentIndex.js

const coachDetalPath = "/pages/coachInfo/coachInfo";
const searchPath = "/pages/search/search";
import myHttp from '../../utils/http.js';
const app = getApp();

import customEvent from '../../utils/customEvent.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coachList: {
      type: Array,
      value: []
    },
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
    headerTxt: `欢迎来到网球预约训练场！\n您可以通过预约码预约到您的教练。\n也可以在此管理您的课程签到。`,
    imageSrc: "../../image/gao.png",
    nickName: ""
  },

  lifetimes: {
    attached() {
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    coachDetail(e) {
      //进入教练详情页并且导入信息
      let index = e.target.dataset.index;
      let user = this.data.coachList[index];

      if (user) {
        wx.navigateTo({
          url: coachDetalPath,
          success(res) {
            console.log("路由导航成功");
            res.eventChannel.emit(customEvent.SET_COACH, user);
          },
          fail(err) {
            console.log("进入页面失败:", err);
          }
        })
      }
      
    },
    onConfig(e) {
      console.error("完成搜索");
      console.log(e);
    },
    onAddCoach() {
      wx.navigateTo({
        url: searchPath
      })
    },
    setCoachList(data) {
      console.log("component设置我的教练:", data);
      this.setData({
        coachList: data
      })
    },
    setInfo() {
      let user = app.globalData.userInfo;
      
      this.setData({
        nickName: user.nickname,
        imageSrc: user.avatarUrl
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
