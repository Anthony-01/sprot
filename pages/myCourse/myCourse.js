//学员管理课程详细页面
const app = getApp();

const studentServer = '/pages/reverse/reverse'

import myHttp from '../../utils/http.js';
import util from '../../utils/util.js';

Page({
  data: {
    userInfo: {
      avator: "",
      nickname: "",
      type: "0",
      phone: "",
    },
    courseItem:[
      // {
      //   num:"一",
      //   status:"已确认",
      //   time:"2019/10/11 14:40:20",
      //   myTime: "2019/10/11 14:40:20",
      // }
    ],
    selectArray: [
    // {
    //   "id": 1,
    //   "text": "网球一对一项目（10节）"
    // }, {
    //   "id": 2,
    //   "text": "篮球20人大班（15节）"
    // }
    ],
    course: []
  },
  _selectHandle(e) {
    console.log("event:", e);
    //找到并且显示course
    let back = [];
    let self = this;
    let index;
    this.data.course.forEach((item, idx) => {
      if (item.courseID == e.detail.courseID && item.projectID == e.detail.projectID) {
        index = idx;
      }
    })
    if (index == undefined) {

      this.setData({
        courseItem: []
      })
    } else {
      let course = this.data.course[index].hours;
      course.forEach(item => {
        item.num = util.toChNumber(item.hourID);
        item.time = util.transfromTime(item.coachConfirmlTime);
        item.myTime = util.transfromTime(item.studentConfirmTime);
        // item.status 
        if (item.confirmState == 2 || item.confirmState == 3) {
          //confirmState 0:等待 1:学生确认 2：教练确认
          //cancelState 0:未申请退课, 1:申请退课审核中 2:已退课
          item.status = "已确认";
          // item.time = util.transfromTime(item.coachConfirmlTime);
        }
        // if (item.cancelState == 1) {
        //   item.myTime = util.transfromTime(item.applyCancelTime);
        // }
        if (item.cancelState == 1 || item.cancelState == 2) {
          item.time = util.transfromTime(item.auditCancelTime);
          item.myTime = util.transfromTime(item.applyCancelTime);
        }
        if (item.cancelState == 2) {
          item.status = "已同意退课";
        }
      })
      self.setData({
        courseItem: course
      })
    }
  },
  //课程预约链接
  _onLink() {
    wx.navigateTo({
      url: studentServer
    })
  },
  onLoad(option) {
    let self = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('coachInfo', function (data) {
      self.setUserInfo(data);
    })
  },
  setUserInfo(data) {
    console.log("收到的教练信息", data);
    this.requestUserInfo(data.user);
    this.setData({
      ["userInfo.nickname"]: data.user.nickname,
      ["userInfo.avator"]: data.user.avatarUrl,

    })
  },

  requestUserInfo(user) {
    let self = this;
    let myCourseApi = app.globalData.http.myCourseApi;
    myHttp.request(myCourseApi.url + "?userID=" + user.userID, myCourseApi.method, null).then(data => {
      console.error("获取教练信息成功:");
      console.log(data);
      // return;
      if (data.code == 1) {
        self.setData({
          ['userInfo.phone']: data.payload.mobile,
          ['userInfo.type']: data.payload.Course.length,
          course: data.payload.Course
        })
        self.getSelectArray(data.payload.Course);
      }
    }).catch(err => {
      console.error("获取学员信息失败:", err);
    })
  },

  getSelectArray(course) {
    let back = [];
    course.forEach(item => {
      let courseID = item.courseID;
      let projectID = item.projectID;
      let txt = item.projectName + '(' + item.hours.length + '节)';
      back.push({
        courseID: courseID,
        projectID: projectID,
        text: txt
      })
    })
    this.setData({
      selectArray: back
    })
    let selectComponent = this.selectComponent('#select-component');
    
    selectComponent.setOrigin(0)
  },

  _onConfirm(e) {
    console.log(e);
    let self = this;
    let index = e.currentTarget.dataset.index;
    let course = this.data.courseItem[index];
    if (course.confirmState == 1 || course.confirmState == 3 || course.cancelState == 1 || course.cancelState == 2) {
      //如果course的状态是已经签到，那么返回
      //cancelState
      //confirmState
      return
    }
    if (course == undefined || course.courseID == undefined || course.hourID == undefined) {
      return;
    }

    let hoursConfirmApi = app.globalData.http.hoursConfirmApi;

    myHttp.request(hoursConfirmApi.url + "?courseID=" + course.courseID + "&hourID=" + course.hourID, hoursConfirmApi.method, null).then(data => {
      util.showToast(data);
      console.log(data);
      let state = 1;
      if (this.data.courseItem[index].confirmState == 2) {
        state = 3;
      }
      if (data.code == 1) {
        self.setData({
          ['courseItem[' + index + '].confirmState']: state,
          ['courseItem[' + index +'].myTime']: util.transfromTime(new Date().getTime()),
          ['courseItem[' + index +'].studentConfirmTime']: new Date().getTime(),
        })
      }
    })
  },

  _onGiveUp(e) {
    console.log(e.detail)
    let self = this;
    let index = e.currentTarget.dataset.index;
    let course = this.data.courseItem[index];
    if (course.confirmState == 1 || course.confirmState == 3 || course.cancelState == 1 || course.cancelState == 2) {
      //如果course的状态是已经签到，那么返回
      //cancelState
      //confirmState
      return
    }
    if (course == undefined || course.courseID == undefined || course.hourID == undefined) {
      return;
    }

    let hoursCancelApi = app.globalData.http.hoursCancelApi;

    myHttp.request(hoursCancelApi.url + "?courseID=" + course.courseID + "&hourID=" + course.hourID, hoursCancelApi.method, null).then(data => {
      util.showToast(data);
      console.log(data);
      if (data.code == 1) {
        self.setData({
          ['courseItem[' + index + '].cancelState']: 1,
          ['courseItem[' + index + '].myTime']: util.transfromTime(new Date().getTime()),
          // ['courseItem[' + index + '].studentConfirmTime']: new Date().getTime(),
        })
      }
    })
  }
  
})