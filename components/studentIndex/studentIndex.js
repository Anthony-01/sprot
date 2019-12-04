// components/studentIndex/studentIndex.js

const coachDetalPath = "/pages/coachInfo/coachInfo"

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    headerTxt: `欢迎来到网球预约训练场！\n您可以通过预约码预约到您的教练。\n也可以在此管理您的课程签到。`,
    imageSrc: "https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=2dea904982d4b31ce4319ce9e6bf4c1a/622762d0f703918fc7ebb6c0583d269759eec486.jpg",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    coachDetail(e) {
      //进入教练详情页并且导入信息
      console.log()
      wx.navigateTo({
        url: coachDetalPath,
        success() {
          console.log("路由导航成功");
        },
        fail(err) {
          console.log("进入页面失败:", err);
        }
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})
