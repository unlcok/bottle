//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../main/main'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // websocket链接
    wx.connectSocket({
      url: 'ws://129.28.148.83:8188/bottle/socket/chat?token=' + wx.getStorageSync("token")
      //url: 'ws://www.badme.xyz/bottle/socket/chat?token='+token
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.setStorageSync("userInfo", this.data.userInfo)
    // 发送用户信息到后台
    var token = wx.getStorageSync('token')
    wx.request({
      url: 'http://www.badme.xyz/bottle/api/v1/user/saveInfo',
      method: 'POST',
      data: {
        rawData: e.detail.rawData,
        signature: e.detail.signature
      },
      header: {
        "token": token
      }
    })
  }
})
