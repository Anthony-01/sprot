//app.js

//mock
const API = require('./utils/api.js');
// const cHost = 'http://sport.webfox.com/';
const cHost = 'https://sport.foxuc.net/';

//User
const loginUrl = 'api/Login/MinProgram';
const infoUrl = 'api/User/Info';
const searchCoachesUrl = 'api/User/SeachCoaches';
const myCoachesUrl = 'api/User/MyCoaches';
const modifyGenderUrl = 'api/User/ModifyGender';
const modifyMobileUrl = 'api/User/ModifyMobile';
const modifyUniqueCodeUrl = 'api/User/ModifyUniqueCode';
const applyBecomeCoachUrl = 'api/User/ApplyBecomeCoach';
const subscribeCourseUrl = 'api/User/SubscribeCourse';
const subscribeRecordUrl = 'api/User/SubscribeRecord';
const myCourseUrl = 'api/User/MyCourse';
const hoursCancelUrl = 'api/User/HoursCancel';
const hoursConfirmUrl = 'api/User/HoursComfirm';

//Coach
const addStudentUrl = 'api/Coach/AddStudent';
const studentCourseUrl = 'api/Coach/StudentCourse';
const myStudentUrl = 'api/Coach/MyStudent';
const subscribeRecordCUrl = 'api/Coach/SubscribeRecord';
const subscribePassUrl = 'api/Coach/SubscribePass';
const subscribeRejectUrl = 'api/Coach/SubscribeReject';
const modifyWorkingYearsUrl = 'api/Coach/ModifyWorkingYears';
const modifyTeachingStyleUrl = 'api/Coach/ModifyTeachingStyle';
const modifyIntroUrl = 'api/Coach/ModifyIntro';
const hoursComfirmUrl = 'api/Coach/HoursComfirm';
const hoursCancelPassUrl = 'api/Coach/HoursCancelPass';
const hoursCancelRejectUrl = 'api/Coach/HoursCancelReject';

//Project
const allProjectUrl = 'api/Project/GetAll'


const studentRouteSrc = "/pages/studentIndex/studentIndex";
const coachRouteSrc = "/pages/coachIndex/coachIndex";




App({
  /**
   * 首页加载好以后调用
  */
  onLaunch: function (object) {

    // console.log("程序启动:", object);
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    let _self = this;

    wx.getSystemInfo({
      success: (res)=> {
        this.globalData.systemInfo = res;
        let modelmes = res.model;

        if (modelmes.search('iPhone X') != -1) {

          _self.globalData.isIphoneX = true

        }
        console.log(res);
        console.log("is IphoneX:", _self.globalData.isIphoneX)
      }
    })
  },

  /**
   * 监听页面启动以及切前台
   * */ 
  onShow() {
    
  },

  /**
   * 监听页面切后台
  */
  onHide() {

  },

  /**
   * 初始化小程序时一些设定
  */
  globalData: {
    userInfo: null,
    systemInfo:null,
    isIphoneX: false,
    isCoach: false,
    token: null,
    myCoaches: [],
    loginErrorChance: 3,
    myOrderes: [],
    http: {
      host: cHost,
      loginApi: {
        url: loginUrl,
        method: 'POST',
      },
      infoApi: {
        url: infoUrl,
        method: 'GET',
      },
      searchApi: {
        url: searchCoachesUrl,
        method: 'GET'
      },
      myCoachesApi: {
        url: myCoachesUrl,
        method: 'GET'
      },
      genderApi: {
        url: modifyGenderUrl,
        method: 'POST'
      },
      mobileApi: {
        url: modifyMobileUrl,
        method: 'POST'
      },
      uniqueCodeApi: {
        url: modifyUniqueCodeUrl,
        method: 'POST'
      },
      becomeCoachApi: {
        url: applyBecomeCoachUrl,
        method: 'POST'
      },
      subCourseApi: {
        url: subscribeCourseUrl,
        method: 'POST'
      },
      subRecordApi: {
        url: subscribeRecordUrl,
        method: 'GET'
      },
      myCourseApi: {
        url: myCourseUrl,
        method: 'GET'
      },

      hoursCancelApi: {
        url: hoursCancelUrl,
        method: 'POST'
      },
      hoursConfirmApi: {
        url: hoursConfirmUrl,
        method: 'POST'
      },
      //coach
      addStudentApi: {
        url: addStudentUrl,
        method: 'POST'
      },
      studentCourseApi: {
        url: studentCourseUrl,
        method: 'POST'
      },
      myStudentApi: {
        url: myStudentUrl,
        method: 'GET'
      },
      subscribeRecord: {
        url: subscribeRecordCUrl,
        method: 'GET'
      },
      subscribePassApi: {
        url: subscribePassUrl,
        method: 'POST'
      },
      subscribeRejectApi: {
        url: subscribeRejectUrl,
        method: 'POST'
      },
      modifyWorkApi: {
        url: modifyWorkingYearsUrl,
        method: 'POST'
      },
      modifyTeachApi: {
        url: modifyTeachingStyleUrl,
        method: 'POST'
      },
      modifyIntroApi: {
        url: modifyIntroUrl,
        method: 'POST'
      },
      coachComfirmApi: {
        url: hoursComfirmUrl,
        method: 'POST'
      },
      hoursCancelPassApi: {
        url: hoursCancelPassUrl,
        method: 'POST'
      },
      hoursCancelRejectApi: {
        url: hoursCancelRejectUrl,
        method: 'POST'
      },



      //
      allProjectApi: {
        url: allProjectUrl,
        method: 'GET'
      }

    }
  },


  
  

})