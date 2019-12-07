Page({
  data: {
    userInfo: {
      avator: "../../image/lily.png",
      nickname: "蒙娜丽莎（Lily）",
      type: "网球一对一私教",
      phone: "15986878985",
    },
    courseItem:[
      {
        num:"一",
        status:"已确认",
        time:"2019/10/11 14:40:20",
        myTime: "2019/10/11 14:40:20",
      },
      {
        num:"二",
        status: "已确认",
        time: "2019/10/11 14:40:20",
        myTime: "2019/10/11 14:40:20",
      }, 
      {
        num: "三",
        status: "已确认",
        time: "2019/10/11 14:40:20",
        myTime: "2019/10/11 14:40:20",
      }
    ],
    selectArray: [{
      "id": 1,
      "text": "网球一对一项目（10节）"
    }, {
      "id": 2,
      "text": "篮球20人大班（15节）"
    }]
  },
  selectHandle(e) {
    console.log("event:", e.detail);
  },
  onLoad(option) {
    let self = this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('studentInfo', function (data) {
      self.setUserInfo(data);
    })
  },
  setUserInfo(data) {
    this.setData({
      ["userInfo.nickname"]: data.nickname,
      ["userInfo.avator"]: data.avator,

    })
  }
  
})