// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("main onShow");
    // websocket链接
    wx.connectSocket({
      url: 'ws://localhost:8188/bottle/socket/chat?token=' + wx.getStorageSync("token")
      //url: 'ws://www.badme.xyz/bottle/socket/chat?token='+token
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  editBottle: function () {

  },

  bottleContent: function (e) {
    this.data.content = e.detail.value
  },

  throwBottle: function () {
    var user = wx.getStorageSync("userInfo");
    var type = user.gender === 1 ? "girl" : "man";
    wx.request({
      url: 'http://www.badme.xyz/bottle/api/v1/bottle',
      method: 'POST',
      data: {
        type: type,
        content: this.data.content
      },
      header: {
        "token": wx.getStorageSync("token")
      },
      success: data => {
        wx.showToast({
          title: '发送成功',
        })
      }
    })
  }
})