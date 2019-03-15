// pages/home/home.js
/*
const imgURL = {
  guide = "./img/guide.png",
  guideHL = "./img/guide_HL.png",
  machine = "./img/machine.png",
  machineHL = "./img/machine_HL.png",
  map = "./img/map.png",
  mapHL = "./img/map_HL.png",
  notice = "./img/notice.png",
  noticeHL = "./img/notice_HL.png"
}
*/

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    newsDetail:[],
    imgURLCommon: "https://www.zhxy.xyz/img/home/",
    imgSuffix: ".png",
    picURLCommon: "https://www.zhxy.xyz/img/home/",
    picSuffix: ".jpg",
    barlist: [
      {
        id: "machine",
        name: "机器问答",
        highlight: false
      },
      {
        id: "guide",
        name: "报道指引",
        highlight: false
      },
      {
        id: "notice",
        name: "通知",
        highlight: false
      },
      {
        id: "map",
        name: "地图",
        highlight: false
      },
      {
        id: "square",
        name: "问题广场",
        highlight: false
      },
      {
        id: "center",
        name: "个人中心",
        highlight: false
      }
    ],
    //body: {
    //  title: "常见问题",
    //  littleTitle: "快来看看有没有想问的问题吧",
    //  appendInfo: "没有找到想问的问题？不用急，去机器问答问问看吧"
    //},
/*    piclist:[
      {
        id: "dormitory"
      },
      {
        id: "canteen"
      },
      {
        id: "traffic"
      }
    ],
*/
    picpop: {
      pop: false,
      id: ""
    }
  },

  itemTap: function (e) {
    //console.log(e);
    var id = e.currentTarget.id, list = this.data.barlist;

    wx.navigateTo({
      url: './../' + id + '/' + id
    })
  },

  itemTouch: function (e) {
    //console.log(e);
    var id = e.currentTarget.id, list = this.data.barlist;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].highlight = true;
      } else {
        list[i].highlight = false;
      }
    }
    this.setData({
      barlist: list
    });

  },

  itemTouchend: function(e) {
    //console.log(e);
    var id = e.currentTarget.id, list = this.data.barlist;
    for (var i = 0, len = list.length; i < len; ++i) {
        list[i].highlight = false;
    }
    this.setData({
      barlist: list
    });
  },

  picTap: function (e) {
    //console.log(e);
    var id = e.currentTarget.id;
    var picpop = this.data.picpop;
    picpop.pop = true;
    picpop.id = id;
    
    this.setData({
      picpop: picpop
    });
  },

  picpopTap: function (e) {
    var picpop = this.data.picpop;
    picpop.pop = false;
    picpop.id = '';

    this.setData({
      picpop: picpop
    })
  },

  toContent: function (e) {
    //console.log(e);

    var obj = this.data.newsDetail;
    //console.log(this.data.newsDetail);
    var url = '../notice/content/content';

    url = url + '?title=' + obj.title + '&call=' + obj.call + '&date=' + obj.date + '&content=' + obj.content;

    //console.log(url);

    wx.navigateTo({
      url: url
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var page = this;
    wx.request({
      url: 'https://www.zhxy.xyz/notice.php',
      data: {
        start: 0,
        len: 1,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        //console.log(res.data[0].title);
        var temp = {};
        temp.title = res.data[0].title;
        temp.date = res.data[0].time;
        temp.call = res.data[0].called;
        temp.content = res.data[0].content;
        page.setData({
          newsDetail: temp
        })
      }
    })
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
    var list = this.data.barlist;
    for (var i = 0, len = list.length; i < len; ++i) {
      list[i].highlight = false;
    }
    this.setData({
      barlist: list
    });
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

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})