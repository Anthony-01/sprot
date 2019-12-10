var name;
var phone;
var num;
var course;
var tip;

Page ({
  data: {
    array: ['网球一对一项目（10节）', '篮球20人大班（15节）'] 
  },
  

  clickUpload:(e)=>{
    console.log({name:name,phone:phone,num:num,course:course,tip:tip});
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
      case "form-course" : course = e.detail.value; break;
      case "form-tip" :tip = e.detail.value; break;
    } 
  },
  bindinput(e) {
    console.log(e)
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }
})