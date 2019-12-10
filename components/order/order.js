// components/order/order.js
var name;
var phone;
var num;
var course;
var tip;

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
    clickUpload: (e) => {
      console.log({ name: name, phone: phone, num: num, course: course, tip: tip });
      // const query = wx.createSelectorQuery();
      // query.select('#form-name').boundingClientRect();
      // query.exec((res) => {
      //   console.log(res[0])                                       
      // })
    },
    bindblur(e) {
      console.log(e)// {value: "ff", cursor: 2} 
      switch (e.target.id) {
        case "form-name": name = e.detail.value; break;
        case "form-phone": phone = e.detail.value; break;
        case "form-num": num = e.detail.value; break;
        case "form-course": course = e.detail.value; break;
        case "form-tip": tip = e.detail.value; break;
      }
    },
    bindinput(e) {
      console.log(e)
    },
    //添加为我的学员
    onAdd(e) {
      console.log(e.currentTarget.dataset);
    }
  },
  options: {
    addGlobalClass: true
  }
})
