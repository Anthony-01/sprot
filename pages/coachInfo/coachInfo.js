const bookPagePath = "/pages/reverse/reverse";
const myCoursePath = "/pages/myCourse/myCourse";

const app = getApp();

import myHttp from '../../utils/http.js';
import util from '../../utils/util.js';

import customEvent from '../../utils/customEvent.js';

Page ({
  data:{
    coachInfo:null,
    property:"专业保障 | 严谨教学 | 课程保障 | 服务从优",
    workingYearsArray: ["1年", "2年", "3年", "3年以上",]
  },

  onLoad(options) {
    let eventChannel = this.getOpenerEventChannel();
    eventChannel.on(customEvent.SET_COACH, this.setCoachInfo);
  },

  setCoachInfo(data) {
    console.log(data.user);
    let test = "";
    this.setData({
      coachInfo: data.user,
      property: test.length > 0 ? test : data.user.teachingStyle
    })
  },
  
  _onOrder(e) {
    //课程预约信息
    let self = this;
    let getProject = app.globalData.http.allProjectApi;

    myHttp.request(getProject.url, getProject.method, null).then(data => {
      if (data.code == 1) {


        wx.navigateTo({
          url: bookPagePath,
          success(res) {
            res.eventChannel.emit(customEvent.SET_COURSE, { courses: data.payload, id: self.data.coachInfo.userID});
          },
          fail(err) {

          }
        })
      } else {
        util.showToast(data);
      }
    });
    
  },
  _onMyCourse(e) {
    let self = this;
    wx.navigateTo({
      url: myCoursePath,
      success(res) {
        res.eventChannel.emit("coachInfo", { user: self.data.coachInfo})
      },
      fail(err) {

      }
    })
  },

  onShow() {
    wx.hideHomeButton();
  }
})