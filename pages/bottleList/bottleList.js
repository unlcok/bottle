// pages/bottleList/bottleList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: 'http://129.28.148.83:8188/bottle/api/v1/bottle/bottleList',
      method: 'GET',
      header: {
        "token": wx.getStorageSync("token")
      },
      success: res => {
        this.setData({
            bottles: res.data.data
          }),
          console.log(this.data.bottles)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("bottleList onShow");
    // websocket链接
    wx.connectSocket({
      url: 'ws://129.28.148.83:8188/bottle/socket/chat?token=' + wx.getStorageSync("token")
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})