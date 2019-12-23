// components/studentOrder/studentOrder.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hidden: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    orderAry: [
      {
        username: "刘德华",
        phone: 18813294788,
        id: "HG657672",
        course: "网球一对一私教课(12节)",
        time: "2019/09/20 12:00:00",
        remarks: "深圳市南山区桃园路102号"
      },
      {
        username: "张学友",
        phone: 18813294788,
        id: "HG657672",
        course: "网球一对一私教课(12节)",
        time: "2019/09/20 12:00:00",
        remarks: "深圳市南山区桃园路102号"
      },
      {
        username: "张学友",
        phone: 18813294788,
        id: "HG657672",
        course: "网球一对一私教课(12节)",
        time: "2019/09/20 12:00:00",
        remarks: "深圳市南山区桃园路102号"
      },
      {
        username: "张学友",
        phone: 18813294788,
        id: "HG657672",
        course: "网球一对一私教课(12节)",
        time: "2019/09/20 12:00:00",
        remarks: "深圳市南山区桃园路102号"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  options: {
    addGlobalClass: true
  }
})
