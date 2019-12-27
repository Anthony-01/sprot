const app = getApp();

import myHttp from '../../utils/http.js';
import util from '../../utils/util.js';

Page({
  data: {
    userInfo: {
      avatarUrl: "",
      nickname: "",
      type: "0",
      mobile: "",
    },
    courseItem: [
      // {
      //   num: "一",
      //   status: "已确认",
      //   time: "2019/10/11 14:40:20",
      //   myTime: "2019/10/11 14:40:20",
      // }
    ],
    selectArray: [
    //   {
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
      let course = this.data.course[index].Hours;
      course.forEach(item => {
        item.num = util.toChNumber(item.hourID);
        item.time = util.transfromTime(item.studentConfirmTime);
        item.myTime = util.transfromTime(item.coachConfirmlTime);
        // item.status 
        if (item.confirmState == 1 || item.confirmState == 3) {
          item.status = "已签到"
        } else if (item.cancelState == 1 || item.cancelState == 2) {
          item.status = "申请退课"
          item.time = util.transfromTime(item.applyCancelTime);
          item.myTime = util.transfromTime(item.auditCancelTime);
        }
      })
      self.setData({
        courseItem: course
      })
    }
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
      ["userInfo.avatarUrl"]: data.avatarUrl,

    })
  },
  requestUserInfo(user) {
    let self = this;
    let studentCourseApi = app.globalData.http.studentCourseApi;
    myHttp.request(studentCourseApi.url + "?userID=" + user.userID, studentCourseApi.method, null).then(data => {
        console.error("获取学员信息成功:");
        console.log(data);
        // return;
        if (data.code == 1) {
          self.setData({
            ['userInfo.mobile']: data.payload.mobile,
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
      let txt = item.projectName + '('+ item.Hours.length +'节)';
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
    if (course.confirmState == 3 || course.confirmState == 2 || course.cancelState == 1 || course.cancelState == 2) {
      //如果course的状态是已经签到，那么返回
      //cancelState 或者2的情况?
      //confirmState course.cancelState == 1
      return
    }
    if (course == undefined || course.courseID == undefined || course.hourID == undefined) {
      return;
    }

    let coachComfirmApi = app.globalData.http.coachComfirmApi;

    myHttp.request(coachComfirmApi.url + "?courseID=" + course.courseID + "&hourID=" + course.hourID, coachComfirmApi.method, null).then(data => {
      util.showToast(data);
      console.log(data);
      if (data.code == 1) {
        let status = 0;
        switch (this.data.courseItem[index].confirmState) {
          case 0: {
            status = 2;
            break;
          }
          case 1: {
            status = 3;
            break;
          }
        }
        // if (this.data.courseItem[index].confirmState == 0) 
        self.setData({
          //如果学生已经签到,那么3
          ['courseItem[' + index + '].confirmState']: status,
          ['courseItem[' + index + '].myTime']: util.transfromTime(new Date().getTime()),
          ['courseItem[' + index + '].coachConfirmlTime']: new Date().getTime()
        })
      }
    })
  },

  /**
   * 同意退课
   * 
  */
  _onGiveUp(e) {
    let self = this;
    let index = e.currentTarget.dataset.index;
    let course = this.data.courseItem[index];
    if (course.confirmState == 3 || course.cancelState == 2) {
      //如果course的状态是已经签到，那么返回
      //cancelState 或者2的情况?
      //confirmState course.cancelState == 1
      return
    }
    if (course == undefined || course.courseID == undefined || course.hourID == undefined) {
      return;
    }
    let api = app.globalData.http.hoursCancelPassApi;
    myHttp.request(api.url + "?courseID=" + course.courseID + "&hourID=" + course.hourID, api.method, null).then(data => {
      util.showToast(data);
      console.log(data);
      if (data.code == 1) {
        
        self.setData({
          ['courseItem[' + index + '].cancelState']: 2,
          ['courseItem[' + index + '].myTime']: util.transfromTime(new Date().getTime()),
          ['courseItem[' + index + '].auditCancelTime']: new Date().getTime(),
        })
      }
    })
  },


  //课程预约链接
  _onLink() {
    wx.navigateTo({
      url: studentServer
    })
  },

})