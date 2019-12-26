// pages/addStudent/addStudent.js
const app = getApp();

import myHttp from '../../utils/http.js';
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['网球一对一项目（10节）', '篮球20人大班（15节）'],
    projects: [],
    remarks: "",
    uniqueCode: "",
    projectId: 0,
    index: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let self = this;
    let projects = app.globalData.http.allProjectApi;

    myHttp.request(projects.url, projects.method, null).then(data => {
      console.error("项目信息", data);
      if (data.code == 1) {
        self.setData({
          array: data.payload.map(item => self.getTxt(item)),
          projects: data.payload
        })
      }
    })

  },
  getTxt(project) {
    return `${project.projectName}(${project.hours}节)`
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  _submitOrder(e) {
    // console.log({ name: name, phone: phone, num: num, course: course, tip: tip });
    // const query = wx.createSelectorQuery();
    // query.select('#form-name').boundingClientRect();
    // query.exec((res) => {
    //   console.log(res[0])                                       
    // })
    if (this.data.index == null || this.data.projects.length == 0) {
      util.showTip("请选择课程后再提交!")
      return;
    }
    if (this.data.uniqueCode.length == 0) {
      util.showTip("请填写学院专属码后提交!")
      return;
    }

    let addStudent = app.globalData.http.addStudentApi;

    let data = {
      uniqueCode: this.data.uniqueCode,
      projectID: this.data.projects[this.data.index].projectID,
      remark: this.data.remarks
    };
    console.log(data);

    myHttp.request(addStudent.url, addStudent.method, data).then(data => {
      util.showToast(data);
      console.log(data);
      if (data.code == 1) {
        //是否需要跳转
      }
    }).catch(err => {
      console.error("提交失败");
    })

    // console.log("提交");

  },
  // bindblur(e) {
  //   this.setData({
  //     uniqueCode: e.detail.value
  //   })
  // },
  _uniqueCodeInput(e) {
    this.setData({
      uniqueCode: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  _onSubmitRemarks({detail}) {
    // console.log("提交的备注", detail.value);
    this.setData({
      remarks: detail.value
    });
  }
})