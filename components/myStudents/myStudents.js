// components/myStudents/myStudents.js
const courseRouteSrc = "/pages/myCourse/myCourse";
const addRouteSrc = "/pages/addStudent/addStudent";
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
    studentsAry: [
      {
        nickname: "高圆圆(yuan.gao)",
        avator: '../../image/gao.png',
        infoes: [
          {
            name: "报名课程",
            value: "2个"
          },
          {
            name: "课程进度",
            value: "2 / 10"
          }
        ]
      },
      {
        nickname: "迪丽热巴(Lucy)",
        avator: '../../image/dili.png',
        infoes: [
          {
            name: "课程类型",
            value: "标准私教课"
          },
          {
            name: "课程进度",
            value: "2 / 10"
          }
        ]
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItemHandle(e) {
      let index = e.currentTarget.dataset.studentIndex;
      let data = this.data.studentsAry[index];
      wx.navigateTo({
        url: courseRouteSrc,
        success(res) {
          res.eventChannel.emit("studentInfo", data)
        }
      })
    },
    //添加新学员
    onAddHandle(e) {
      wx.navigateTo({
        url: addRouteSrc
      })
    }
    
  },
  lifetimes: {
    attached() {
      console.log(this.data.studentsAry.length)
    }
  },
  options: {
    addGlobalClass: true
  }
})
