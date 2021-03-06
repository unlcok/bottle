// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: null,
    hiddenName: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    console.log("main onShow");
    // websocket链接
    wx.connectSocket({
      url: 'ws://129.28.148.83:8188/bottle/socket/chat?token=' + wx.getStorageSync("token")
      //url: 'ws://www.badme.xyz/bottle/socket/chat?token='+token
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      hiddenName: true
    })
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

  },

  editBottle: function() {
    console.log("aa");
    this.setData({
      hiddenName: false
    })
  },

  bottleContent: function(e) {
    this.data.content = e.detail.value
  },

  salvageBottle: function() {
    wx.showModal({
      title: '矮油,捞到咯',
      content: '现在要打开么？',
      success: function(sm) {
        if (sm.confirm) {
          wx.navigateTo({
            url: '../bottleList/bottleList'
          })
        } else {
          wx.showToast({
            title: '稍后可在瓶子列表中查看呦',
          })
        }

      }
    })
    // wx.request({
    //   url: 'http://129.28.148.83:8188/bottle/api/v1/bottle',
    //   method: 'GET',
    //   header: {
    //     "token": wx.getStorageSync("token")
    //   },
    //   success: res => {
    //     console.log(res);
    //     if (res.data.success === false){
    //       wx.showToast({
    //         title: res.data.resultMsg,
    //       })
    //     } else if (res.data.data == null){
    //       wx.showToast({
    //         title: '捞到了空瓶子',
    //       })
    //     }else {
    //       wx.showModal({
    //         title: '矮油,捞到咯',
    //         content: '现在要打开么？',
    //         success: function (sm) {
    //           if (sm.confirm) {
    //             wx.navigateTo({
    //               url: '../bottleList/bottleList'
    //             })
    //           } else{
    //             wx.showToast({
    //               title: '稍后可在瓶子列表中查看呦',
    //             })
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },

  bottleList: function() {
    wx.navigateTo({
      url: '../bottleList/bottleList'
    })
  },

  throwBottle: function() {
    var user = wx.getStorageSync("userInfo");
    var type = user.gender === 1 ? "man" : "girl";

    wx.request({
      url: 'http://129.28.148.83:8188/bottle/api/v1/bottle',
      method: 'POST',
      
      data: {
        type: type,
        content: this.data.content
      },
      header: {
        "token": wx.getStorageSync("token")
      },
      success: data => {
        this.setData({
          hiddenName: true
        })
        wx.showToast({
          title: '发送成功',
        })
      }
    })
  }
})