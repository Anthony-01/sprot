// pages/_store/_store.js

import wxappStore from "../../libs/Store.js";

const store2Path = "/pages/_store2/_store2";

var myBehavior = require('../_behaviors/testBehavior.js');

Page(wxappStore.createPage({

  behaviors: [myBehavior],

  /**
   * 页面的初始数据
   */
  data: {
    message: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.store.dispatch({
      name: 'testAction',
      payload: 'hello world'
    });
    // 通过commit方法，修改全局状态。
    this.store.commit({
      name: 'testMutation',
      payload: 'hello world'
    });
    this.addCount();
    this.showCount();
  },

  onClick() {
    this.store.commit({
      name: 'testMutation',
      payload: '那真的牛皮'
    });
  },
  onTab() {
    wx.navigateTo({
      url: store2Path,
      success(res) {
        console.log(res);
      },
      fail(error) {
        console.log(error)
      }
    })
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

  }
}, {
    mutations: {
      testMutation: function ({ setData, payload, data }) {
        console.log(data);
        setData({
          message: payload
        });
      }
    },
    actions: {
      testAction: function ({ commit, payload, data }) {
        setTimeout(() => {
          commit({
            name: 'testMutation',
            payload: payload
          });
        });
      }
    }
}))