// pages/search/search.js
const app = getApp();
import myHttp from '../../utils/http.js';
import util from '../../utils/util.js';
import customEvent from '../../utils/customEvent.js';

const coachDetailPage = '/pages/coachInfo/coachInfo';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coachList: [
      
    ],
    workingYearArray: ['1年', '2年', '3年', '3年以上']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //let 
  },

  _onSearchCoach(e) {
    let self = this;
    if (e.detail.value.length == 0) return;
    let uniqueCode = e.detail.value.length ? e.detail.value : null;
    let search = app.globalData.http.searchApi;

    myHttp.request(search.url + "?UniqueCode=" + uniqueCode, search.method, null).then(data => {
      
      console.log(data);
      if (data.payload && data.payload.length == 0) {
        util.showTip("未搜索到相应教练，请检查专属码后重新搜索!");
      } else {
        util.showToast(data);
        self.setData({
          coachList: data.payload
        })
      }
    }).catch(err => {
      console.error(err);
    })
  },

  _onIconSearch(e) {
    console.log("iconSearch");
  },

  _onCoachPage(e) {
    //教练页面
    console.log(e.target.dataset.index);
    let index = e.target.dataset.index;
    let user = this.data.coachList[index];
    

    if (user) {
      wx.navigateTo({
        url: coachDetailPage,
        success(res) {
          res.eventChannel.emit(customEvent.SET_COACH, { user: user});
        }
      })
    }
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

  }
})