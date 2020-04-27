// components/order/order.js
var name;
var phone;
var num;
var course;
var tip;

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
    studentOrderAry: [
      // {
      //   studentNickname: "",
      //   mobile: "",
      //   uniqueCode: "",
      //   projectName: "",
      //   recordID: null,
      //   hours: "",
      //   collectTime: "",
      //   showTime: "",
      //   remark: ""
      // }
    ],
    myOrderAry: [
      // {
      //   coachNickname: "",
      //   projectName: "",
      //   subscribeStateCH: "",
      //   collectTime: "",
      //   showTime: ""
      // }
    ],
    current: "student-tab"
  },

  attached() {

    //在wx:if情况下更新
    this.requestMyOrderes();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickUpload: (e) => {
      console.log({ name: name, phone: phone, num: num, course: course, tip: tip });
      
    },
    bindblur(e) {
      console.log(e)// {value: "ff", cursor: 2} 
      switch (e.target.id) {
        case "form-name": name = e.detail.value; break;
        case "form-phone": phone = e.detail.value; break;
        case "form-num": num = e.detail.value; break;
        case "form-course": course = e.detail.value; break;
        case "form-tip": tip = e.detail.value; break;
      }
    },
    bindinput(e) {
      console.log(e)
    },
    //添加为我的学员
    onAdd(e) {
      console.log(e.currentTarget.dataset);
    },
    _onChangeTab(e) {
      this.setData({
        current: e.detail.key
      })
    },
    _onPassOrder(e) {
      // console.log(e.currentTarget);
      let self = this;
      let index = e.currentTarget.dataset.orderIndex;
      let order = this.data.studentOrderAry[index];
      if (order == null || order.subscribeState != 0) {
        //如果预约不存在或者预约状态不==0
        return;
      }

      let passApi = app.globalData.http.subscribePassApi;

      let data = {
        recordID: order.recordID
      }

      myHttp.request(passApi.url + "?recordID=" + order.recordID , passApi.method, null).then(data => {
        util.showToast(data);
        if (data.code == 1) {
          //更改order的状态;
          self.setData({
            ['studentOrderAry[' + index + '].subscribeState']: 1
          })
        }
      })
    },
    _onRejectOrder(e) {
      let self = this;
      let index = e.currentTarget.dataset.orderIndex;
      let order = this.data.studentOrderAry[index];
      if (order == null || order.subscribeState != 0) {
        //如果预约不存在或者预约状态不==0
        util.showTip("该预约已通过或已拒绝");
        return;
      }

      let rejectApi = app.globalData.http.subscribeRejectApi;

      let data = {
        recordID: order.recordID
      }

      myHttp.request(rejectApi.url + "?recordID=" + order.recordID, rejectApi.method, null).then(data => {
        util.showToast(data);
        console.log(data);
        if (data.code == 1) {
          //更改order的状态;
          self.setData({
            ['studentOrderAry[' + index + '].subscribeState']: 2
          })
        }
      })
    },
    /**
     * 请求预约数据
    */
    requestMyOrderes() {
      let self = this;
      let order = app.globalData.http.subscribeRecord;
      myHttp.request(order.url, order.method, null).then(data => {
        console.error("学生预约:");
        console.log(data);
        
        if (data.code == 1) {
          data.payload.forEach(item => {
            item.showTime = util.transfromTime(item.collectTime)
          })
          self.setData({
            studentOrderAry: data.payload.reverse()
          })
        }
      }).catch(err => {
        console.error("获取学生预约失败:", err);
      })

      let myOrder = app.globalData.http.subRecordApi;
      myHttp.request(myOrder.url, order.method, null).then(data => {
        console.log("我的预约");
        console.log(data);
        if (data.code == 1) {
          self.setData({
            myOrderAry: data.payload.reverse()
          })
        }
      }).catch(err => {
        console.error("获取我的预约失败:", err);
      })

    }
  },
  options: {
    addGlobalClass: true
  }
})
