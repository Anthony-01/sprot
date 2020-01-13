var name;
var phone;
var num;
var course;
var tip;

const app = getApp();
import myHttp from '../../utils/http.js';
import util from '../../utils/util.js';
import customEvent from '../../utils/customEvent.js';

const mobileRegExp = /^1[3456789]\d{9}$/;


var editPath;
if (app.globalData.isCoach == false) {
  editPath = '/pages/studentIndex/studentIndex';
} else {
  editPath = '/pages/coachIndex/coachIndex';
}

Page ({
  data: {
    courses: [],
    array: ['网球一对一项目（10节）', '篮球20人大班（15节）'],
    tel: '',
    remarks: '',
    coachID: 0
  },

  observers: {
    'courses': function(value) {
      console.error("course new value:", value);
    }
  },

  onLoad(options) {
    let eventChannel = this.getOpenerEventChannel();
    eventChannel.on(customEvent.SET_COURSE, this.setCourse);

    
    
  },
  onShow() {
    let userInfo = app.globalData.userInfo;
    if (userInfo.mobile) {
      this.setData({
        tel: userInfo.mobile
      })
    }
  },

  setCourse(data) {
    console.error("获得课程项目：", data);
    this.setData({
      courses: data.courses,
      array: data.courses.map(item => item.projectName + "（" + item.hours + "节）"),
      coachID: data.id
    })
  },

  _onSubmitTel(e) {
    let tel = e.detail.value;
    console.log("电话:", tel);
    this.setData({
      tel: tel
    })
  },

  _onSubmitRemarks(e) {
    let remarks = e.detail.value;
    console.log("备注:", remarks);
    this.setData({
      remarks: remarks
    })
  },
  

  onUpload(e) {
    //首先检查信息是否符合规范
    let tel = this.data.tel;
    if (!mobileRegExp.test(tel)) {
      //手机号码格式不符合规范
      util.showTip("手机格式不符合规范");
      return;
    }
    let index = this.data.index;
    if (index == undefined || index < 0 || index >= this.data.array.length) {
      util.showTip("请选择课程");
      return;
    }
    let projectID = this.data.courses[index].projectID;
    let subscribeCourse = app.globalData.http.subCourseApi;

    let postData = {
      projectID: projectID,
      coachID: this.data.coachID,
      mobile: tel,
      remark: this.data.remarks
    }
    console.log(postData);
    myHttp.request(subscribeCourse.url, subscribeCourse.method, postData).then(data => {
      util.showToast(data);
      console.log(data);
    }).catch(err => {
      console.error("提交预约失败:", err);
    })
  },
  
  bindinput(e) {
    console.log(e)
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  editTel(e) {
    console.log("click");
    wx.navigateTo({
      url: editPath,
      success(res) {
        res.eventChannel.emit(customEvent.SET_CURRENT, {data: {
          current: "mine"
        }})
      }
    })
  },

})