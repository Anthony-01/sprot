// components/coachInfo/coachInfo.js
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
      avater: "../../image/lily.png",
      nickname: "蒙娜丽莎(Lily)",
      identity: "教练",
      isCoach: false,
      code: "58DF359S"
    },
    gender: 1,
    array: ['1年', '2年', '3年', '3年以上'],
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
        [ccode]: newCode

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
    },
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})

