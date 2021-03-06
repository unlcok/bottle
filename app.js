//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var token = wx.getStorageSync('token')

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'http://129.28.148.83:8188/bottle/api/v1/user/wechat/login?code=' + res.code,
            method: 'POST',
            success: data => {
              console.log(data)
              token = data.data.data.token
              wx.setStorageSync('token', token)
              // 获取用户授权信息及用户信息
              wx.getSetting({
                success: res => {
                  if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                      success: res => {
                        wx.setStorageSync("userInfo", res.userInfo)
                        // 可以将 res 发送给后台解码出 unionId
                        this.globalData.userInfo = res.userInfo
                        // 发送用户信息到后台
                        wx.request({
                          url: 'http://129.28.148.83:8188/bottle/api/v1/user/saveInfo',
                          method: 'POST',
                          data: {
                            rawData: res.rawData,
                            signature: res.signature
                          },
                          header: {
                            "token": token
                          }
                        })
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        if (this.userInfoReadyCallback) {
                          this.userInfoReadyCallback(res)
                        }
                      }
                    })
                  }
                }
              })
              // websocket链接
              wx.connectSocket({
                url: 'ws://129.28.148.83:8188/bottle/socket/chat?token=' + token
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    wx.onSocketOpen(function() {
    })
    wx.onSocketMessage(function(res) {
      console.log("收到消息:" + res.data)
    })
    wx.onSocketClose(function() {
    })
    wx.onSocketError(function() {
      console.log("socketError")
    })
  },
  globalData: {
    userInfo: null
  }
})
