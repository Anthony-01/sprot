// components/myStudents/myStudents.js
const courseDetailSrc = "/pages/courseDetail/courseDetail";
const addRouteSrc = "/pages/addStudent/addStudent";

const app = getApp();
import myHttp from '../../utils/http.js';
import util from '../../utils/util.js';

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
    studentsAry: [
      // {
      // avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/R25pPknP6LlakrND3oJ78zfYrhlnqMkZy3icJHM4dDaredwjelfQu6vQOgjg3cib3buib6atWaZOQgHrWbXVNgKyg/132"
      // completeHours: 0
      // courseCount: 1
      // nickname: "眼高手低"
      // sumHours: 10
      // userID: 10005
      // }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onItemHandle(e) {

      
      let index = e.currentTarget.dataset.studentIndex;
      let user = this.data.studentsAry[index];

      if (user == null || user.userID == undefined) {
        util.showTip("玩家出错:", user.userID);
        return;
      }

      

      wx.navigateTo({
        url: courseDetailSrc,
        success(res) {
          res.eventChannel.emit("studentInfo", user)
        }
      })
    },
    //添加新学员
    onAddHandle(e) {
      wx.navigateTo({
        url: addRouteSrc
      })
    },

    requestMyStudents() {
      let self = this;
      let myStudent = app.globalData.http.myStudentApi;
      myHttp.request(myStudent.url, myStudent.method, null).then(data => {
        console.error("我的学员:");
        console.log(data);
        if (data.code == 1) {
          self.setData({
            studentsAry: data.payload
          })
        }
      }).catch(err => {
        console.error("我的学员获取失败", err);
      })
    }
    
  },
  lifetimes: {
    attached() {
      console.log(this.data.studentsAry.length)
    }
  },
  options: {
    addGlobalClass: true
  }
})
