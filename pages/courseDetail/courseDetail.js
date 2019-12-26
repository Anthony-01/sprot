const app = getApp();

import myHttp from '../../utils/http.js';
import util from '../../utils/util.js';

Page({
  data: {
    userInfo: {
      avator: "../../image/lily.png",
      nickname: "蒙娜丽莎（Lily）",
      type: "网球一对一私教",
      phone: "",
    },
    courseItem: [
      {
        num: "一",
        status: "已确认",
        time: "2019/10/11 14:40:20",
        myTime: "2019/10/11 14:40:20",
      }
    ],
    selectArray: [{
      "id": 1,
      "text": "网球一对一项目（10节）"
    }, {
      "id": 2,
      "text": "篮球20人大班（15节）"
    }]
  },
  selectHandle(e) {
    console.log("event:", e.detail);
  },
  onLoad(option) {
    let self = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('studentInfo', function (data) {
      self.setUserInfo(data);
    })
  },
  setUserInfo(data) {

    this.requestUserInfo(data);
    this.setData({
      ["userInfo.nickname"]: data.nickname,
      ["userInfo.avator"]: data.avatarUrl,

    })
  },
  requestUserInfo(user) {
    let self = this;
    let studentCourseApi = app.globalData.http.studentCourseApi;
    myHttp.request(studentCourseApi.url + "?userID=" + user.userID, studentCourseApi.method, null).then(data => {
        console.error("获取学员信息成功:");
        console.log(data);
        if (data.code == 1) {

        }
      }).catch(err => {
        console.error("获取学员信息失败:", err);
      })
  }

})