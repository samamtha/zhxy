//logs.js
const util = require('../../utils/util.js')
Page({
  data: {
    commonURL: 'https://www.zhxy.xyz/img/map/' ,
    toView:'',
    firstTop:'',
    windowWidth:'',
    windowHeight:'',
    pxz:'',
    pyz:'',
    logs: [],
    left:'',
    top:'',
    xldevation:5350,
    yldevation:-2450,
    xla:113410881,  
    yla:23019682,
    xpa:213 + 70 ,       
    ypa:674 + 40,
    xz:3.61 ,       
    yz:3.3,
    xpixel:0,
    ypixel:0,
    latitude:0,     //纬度
    longitude:0,    //经度
    pchangex:596-662,
    pchangey:-532-146,
    cos:1238/1374,
    sin:596/1374,
    stv: {          //缩放
      distance: 0,  //两指距离
      scale: 1,     //缩放倍数
    }
  },

  //页面加载
  onLoad: function () {
    var page = this;
    page.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })

    //获取手机屏幕大小
    wx.getSystemInfo({
      success: function (res) {
        console.log("窗口可用宽度：" + res.windowWidth)
        console.log("窗口可用高度：" + res.windowHeight)
        page.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      }
    })

//    console.log("onLoad定位");
    var i = 0;
    setInterval(function () {
      i = i + 1;
      wx.getLocation({
        success: function (res) {
          var pxz = ((res.longitude * 1000000 - page.data.xla + page.data.xldevation) / page.data.xz + page.data.xpa) + page.data.pchangex
          var pyz = (-(res.latitude * 1000000 - page.data.yla + page.data.yldevation) / page.data.yz + page.data.ypa) + page.data.pchangey
          page.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            left: page.data.cos * pxz - page.data.sin * pyz + 662 - 25 + "rpx",
            top: page.data.cos * pyz + page.data.sin * pxz + 146 - 50+ "rpx",
            pxz: pxz,
            pyz: pyz,
          })

          if (i < 3) {
            page.setData({
              toView: (page.data.cos * page.data.pxz - page.data.sin * page.data.pyz + 662) * page.data.windowWidth / 750 - page.data.windowWidth * 0.5 / page.data.stv.scale,
              firstTop: (page.data.cos * page.data.pyz + page.data.sin * page.data.pxz + 146) * page.data.windowHeight / 1206 - page.data.windowHeight * 0.5 / page.data.stv.scale,
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: "获取经纬度失败",
            icon: "none"
          })
        },
      })
    }, 2000)
  },

  //focus按钮
  focus: function () {
    let page = this;
    page.setData({
      toView: (page.data.cos * page.data.pxz - page.data.sin * page.data.pyz + 662) * page.data.windowWidth / 750 - page.data.windowWidth * 0.5 / page.data.stv.scale,
      firstTop: (page.data.cos * page.data.pyz + page.data.sin * page.data.pxz + 146) * page.data.windowHeight / 1206 - page.data.windowHeight * 0.5 / page.data.stv.scale,
    })
  },

  //触摸开始
  touchstartCallback: function (e) { 
    console.log('touchstartCallback');
    console.log(e);
    if (e.touches.length === 1) {
//  单指
    } else {
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);
      this.setData({
        'stv.distance': distance,
      })
    }
  },
  
  touchmoveCallback: function (e) {
    //触摸移动中
    console.log('touchmoveCallback');
    console.log(e); 
    if (e.touches.length === 1) {
      //单指移动
      if (this.data.stv.zoom) {
        //缩放状态，不处理单指
        return;
      }
    } else {
      let page = this;
      //双指缩放
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);
      let distanceDiff = distance - this.data.stv.distance;
      let newScale = this.data.stv.scale + 0.005 * distanceDiff;
      //限制放大缩小倍数
      if (newScale>0.4 && newScale<1.0){
      page.setData({
        'stv.distance': distance,
        'stv.scale': newScale,
        left: page.data.cos * page.data.pxz - page.data.sin * page.data.pyz + 662 - 25 + "rpx",
        top: page.data.cos * page.data.pyz + page.data.sin * page.data.pxz + 146 - 50 + "rpx",
      })  
      }
    }
  },

  touchendCallback: function (e) {
    //触摸结束
    console.log('touchendCallback');
    console.log(e);
    if (e.touches.length === 0) {
      //手指离开
    }
  },
})
