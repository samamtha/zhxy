// pages/personal/personal.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    active: true,
    commonURL: "https://www.zhxy.xyz/img/center/",
    my: [
      {
        id: 'question',
        imgURL: 'question.png',
        nav: '我的问题',
        bgc: '#fdfdfd',
      },
      {
        id: 'answer',
        imgURL: 'answer.png',
        nav: '我的回答',
        bgc: '#fdfdfd',
      },
      {
        id: 'help',
        imgURL: 'help.png',
        nav: '使用帮助',
        bgc: '#fdfdfd',
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(this.data.my);
    this.setData({
      userInfo: app.globalData.userInfo,
    })
  },
  navTo: function (e) {
    //console.log(e);
    //console.log(e.currentTarget.id);
    var that = this;
    var url = e.currentTarget.id;
    if(url == 'answer'){
      wx.navigateTo({
        url: 'question/question?active=false',
      })
    }
    else{
      wx.navigateTo({
        url: url+'/'+url+'?active=true',
      })
    }
  },

  itemTouch: function (e) {
    var id = e.currentTarget.id, my = this.data.my;
    for (var i = 0, len = my.length; i < len; ++i) {
      if (my[i].id == id) {
        my[i].bgc = '#f6f6f6';
      }
    }
    this.setData({
      my : my,
    });
  },

  itemTouchend: function (e) {
    var id = e.currentTarget.id, my = this.data.my;
    for (var i = 0, len = my.length; i < len; ++i) {
      if (my[i].id == id) {
        my[i].bgc = '#fdfdfd';
      }
    }
    this.setData({
      my: my,
    });
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
  
  }
})