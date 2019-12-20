const app = getApp();

const host = app.globalData.http.host;

const apiRequest = (url, method, data, title) => {     //接收所需要的参数，如果不够还可以自己自定义参数
  wx.showLoading({
    title: title ? title : '加载中',
    mask: true
  })

  
  let header = {};

  if (app.globalData.token)
    header['Cookie'] = app.globalData.token

  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: host + url,
      data: data ? data : null,
      method: method,
      header: header,
      withCredentials: true,
      success: function (res) {
        console.debug(res);
        if (res.header && res.header['Set-Cookie']) {
          //.match(/token=(\S){1,};/)
          app.globalData.token = res.header['Set-Cookie'].match(/token=(\S+);/)[0]
          console.log("myToken:", app.globalData.token);
        }
        if (res.statusCode != 200) {
          wx.showToast({
            title: 'http:' + res.statusCode,
            icon: 'none',
            duration: 2000
          });
          reject();
        }
        if (res.data.code && res.data.code == 302) {
          if (app.globalData.loginErrorChance-- < 0) {
            wx.showToast({
              title: '登录失败',
              icon: 'none',
              duration: 2000
            });
            reject();
          } else {
            resolve(new Promise(function (resolve, reject) {
              wx.login({
                success: res => {
                  // console.log(res);
                  resolve(new Promise(function (resolve, reject) {
                    //登录
                    apiRequest('/login/miniLogin', 'get', { code: res.code }, null, '登录中').then(loginRes => {
                      // 登录成功后，重新发起当前的请求
                      resolve(apiRequest(url, method, data, header, title));
                    }).catch(() => { });
                  }));
                }
              })

            }));
          }
        }  else {
          //接口调用成功
          console.log("调用http接口成功:", res);
          resolve(res.data);    //根据业务需要resolve接口返回的json的数据
          wx.hideLoading();
        }
      },
      fail: function (res) {
        // fail调用接口失败
        wx.showToast({
          title: '服务器维护中，请稍后重试',
          icon: 'none',
          duration: 3000
        });
        resolve();
      }
    })
  });
  return promise;  //注意，这里返回的是promise对象
}

let get = (url) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(url, 'get'))
  })
}

let post = (url, data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(url, 'post', data))
  })
}

let post1 = (url, data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(url, 'post', data, { 'Content-Type': 'application/json' }))
  })
}

let request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    switch(method){
      case 'GET': {
        resolve(apiRequest(url, 'GET'))
        break;
      }
      case 'POST': {
        resolve(apiRequest(url, 'post', data))
        break;
      }
    }
  })
}

export default {
  get: get,
  post: post,
  post1: post1,
  request
}