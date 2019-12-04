// components/studentInfo.js
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
    userInfo: {
      avater: "https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=2dea904982d4b31ce4319ce9e6bf4c1a/622762d0f703918fc7ebb6c0583d269759eec486.jpg",
      nickname: "蒙娜丽莎(Lily)",
      identity: "学员",
      isCoach: false,
      code: "58DF359S"
    },
    fruit: [{
      id: 1,
      name: '香蕉',
    }, {
      id: 2,
      name: '苹果'
    }],
    gender: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //换一组
    copy(e) {
      wx.setClipboardData({
        data: this.data.userInfo.code,
      })
    },
    //复制
    change(e) {
      let code = this.data.userInfo.code;
      let newCode = code.split('');
      newCode.shift();
      newCode.unshift(Math.floor(Math.random() * 10));
      newCode = newCode.join("");
      let ccode = "userInfo.code";
      this.setData({
        [ccode] :newCode
        
      })
    },
    //选择性别
    sexTab(e) {
      let id = e.currentTarget.dataset.id,
        index = parseInt(e.currentTarget.dataset.index),
        num = parseInt(e.currentTarget.dataset.index)
      let gender = e.currentTarget.dataset.index;
      var that = this;
      if (this.data.gender == gender) return;

      this.setData({
        gender: gender
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})
