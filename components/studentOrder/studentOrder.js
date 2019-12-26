// components/studentOrder/studentOrder.js
const app = getApp();

import myHttp from '../../utils/http.js';
import util from '../../utils/util.js';


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
        coachNickname: "",
        projectName: "",
        subscribeStateCH: "",
        collectTime: "",
        showTime: ""
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setOrderes() {
      // return
      let self = this;
      let orders = app.globalData.myOrderes;
      console.log(orders);
      orders.forEach(item => {
        item.showTime = util.transfromTime(item.collectTime)
      });
      this.setData({
        orderAry: orders
      })
    },
    transfromTime(time) {
      return util.transfromTime(time);
    }
  },
  options: {
    addGlobalClass: true
  }
})
