// pages/search/search.js
const app = getApp();
import myHttp from '../../utils/http.js';
import util from '../../utils/util.js';
import customEvent from '../../utils/customEvent.js';

const coachDetailPage = '/pages/coachInfo/coachInfo';

const pageSize = 3;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coachList: [
      
    ],
    workingYearArray: ['1年', '2年', '3年', '3年以上'],
    pageIndex: 1,
    nearByCoaches: [],
    hiddenNearby: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //let 
  },

  _onSearchFocus(e) {
    console.log(e);
    // console.error("隐藏");
    this.setData({
      hiddenNearby: true
    })
  },

  _onSearchCoach(e) {
    let self = this;
    // console.error("显示");
    this.setData({
      hiddenNearby: false
    })
    if (e.detail.value.length == 0) {
      self.setData({
        coachList: []
      })
      return;
    };
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
    wx.hideKeyboard();
    this.setData({
      isFocus: false
    })
  },

  _onCoachPage(e) {
    //教练页面
    console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index;
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

  

  _onNearByCoach(e) {
    //教练页面
    console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index;
    let user = this.data.nearByCoaches[index];


    if (user) {
      wx.navigateTo({
        url: coachDetailPage,
        success(res) {
          res.eventChannel.emit(customEvent.SET_COACH, { user: user });
        }
      })
    }
  },

  _onRefresh() {
    this._requestNearByCoaches(this.data.pageIndex + 1);
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
    //请求附近的教练
    this._requestNearByCoaches(this.data.pageIndex);
  },

  _requestNearByCoaches(index) {
    let self = this;
    let nearbyApi = app.globalData.http.nearbyCoachesApi;
    myHttp.request(nearbyApi.url + "?Page=" + index + "&PageSize=" + pageSize, nearbyApi.method, null).then(data => {
      console.log(data);
      if (data.code == 1) {
        util.showTip("刷新成功!")
        if (data.payload.pageData.length == 0) {
          self._requestNearByCoaches(1);
          return;
        }
        self.setData({
          nearByCoaches: data.payload.pageData,
          pageIndex: index
        })
      }
    })
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