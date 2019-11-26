/**
 * 个人信息页面
 * 根据isCoach显示教练或学员信息
 */
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      avater: "../../image/wechat.png",
      nickname:"蒙娜丽莎(Lily)",
      identity:"教练",
      isCoach:false,
      code:"58DF359S"
    }
  },
  //换一组
  copy:(e)=> {
    wx.setClipboardData({
      data: "58DF359S",
    })
  },
  //复制
  change:(e)=> {
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
    const query = wx.createSelectorQuery();
    query.select('#reverse-status').boundingClientRect();
    query.exec((res) => {
      console.log(res[0])
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})