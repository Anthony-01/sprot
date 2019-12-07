const bookPagePath = "/pages/reverse/reverse";
const myCoursePath = "/pages/myCourse/myCourse";
Page ({
  data:{
    coachInfo:{
      avater:"../../image/lily.png",
      nickname:"蒙娜丽莎（Lily）",
      experience:"3年",
      phone:"15986878985",
      property:"专业保障|严谨教学|课程保障|服务从优"
    }
  },

  onLoad() {

  },
  
  negativeTap(e) {
    let path;
    switch (e.currentTarget.dataset.index) {
      case 1: {
        path = bookPagePath;
        break;
      }
      case 2: {
        path = myCoursePath;
        break;
      }
    }
    wx.navigateTo({
      url: path,
      success() {
        console.log("success");
      },
      fail(err) {
        consol;e.log(err);
      }
    })
  }
})