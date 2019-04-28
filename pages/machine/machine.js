//logs.js
var util = require('../../utils/util.js');
var app = getApp();
Page({
  //定义初始化数据  每当数据发生变化时，会自动触发页面循环
  data: {
    msgWidth: '',
    windowWidth: '',
    windowHeight: '',
//    position: 'inherit',
    focus: false,
    handleBoxBottom: '0',
    img: 'https://www.zhxy.xyz/img/machine/111.png',
    introduce: 'false',
    scrollTop: '1',
    inputValue: '',
    returnValue: '',
    allContentList: [],              // saving information here
    
    userInfo: {}
  },
  //绑定键盘按下事件，将输入的值赋给data
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })

  },
  //robot introduce触发事件
  changeIntroduce: function (e) {
    let that = this;
    let introduce = that.data.introduce;
    let index = e.currentTarget.id
    if (index && that.data.allContentList[index].state == 'robot'){
      if (introduce == 'false') {
        that.setData({
          introduce: 'true'
        })
      }
    }
    if (introduce == 'true') {
      that.setData({
        introduce: 'false'
      })
    }
  },
  //获得焦点
  focus: function (e) {
    console.log(e.detail);
    let that = this;
    let windowHeight = that.data.windowHeight - e.detail.height;
    
    wx.createSelectorQuery().select('.containerBox').boundingClientRect(function (rect) {
      // 使页面滚动到底部
      that.setData({
        scrollTop: rect.height
      })
    }).exec(
      that.setData({
//        position: 'inherit',     //这里本来是absolute
        handleBoxBottom: e.detail.height,
        windowHeight: windowHeight,
      })
    )
  },
  //失去焦点
  blur: function () {
    let that = this;
    let windowHeight = that.data.windowHeight + that.data.handleBoxBottom;
    that.setData({
//      position: "inherit", 
      windowHeight: windowHeight, 
      handleBoxBottom: 0,
    })
  },
  //点击发送按钮时触发事件，发送数据给后台
  submitTo: function (e) {
    let that = this;
    //飞机变色（换图）
    that.setData({
      img: 'https://www.zhxy.xyz/img/machine/222.png',
      focus: 'true',
    })
    setTimeout(
      function () {

        that.setData({
          img: 'https://www.zhxy.xyz/img/machine/111.png',
        });
      }
      , 250);
    //输入框为非空或非空格
    if (that.data.inputValue != '' && that.data.inputValue != ' ') {
      //将输入数据追加到列表里面
      that.data.allContentList.push({ 
        value: that.data.inputValue,
        state: "my",
        src: that.data.userInfo.avatarUrl
      });
      that.setData({
        allContentList: that.data.allContentList
      })

      //接口
      let _url = 'https://www.zhxy.xyz/page/Response.php';

      wx.request({         //系统封装的请求方法 （注意这里没有ajax的说法）
        url: _url,
        method: 'POST',
        data: {
          ask_str: that.data.inputValue
        }, 
        header: {         //封装返回数据格式
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        success: function (res) {       //请求成功的回调
          let data = res.data;
          if (data.answers !== '') {
            //将返回值追加到列表
            that.data.allContentList.push({ 
              value: data.value,
              state: "robot",
              src: "https://www.zhxy.xyz/img/machine/robot.png"
            });
            //底部对齐
            wx.createSelectorQuery().select('.containerBox').boundingClientRect(function (rect) {
              // 使页面滚动到底部
              that.setData({
                scrollTop: rect.height
              })
            }).exec(
              //调用set方法，告诉系统数据已经改变   启动循环，循环聊天信息
              that.setData({
                allContentList: that.data.allContentList
              })
              )
          } else {//返回答案为空
            wx.showToast({
              title: '答案为空',
            })
          }
        },
        //请求失败
        fail: function () {
          that.data.allContentList.push({ "value": "dead" })
          that.setData({
            allContentList: that.data.allContentList
          })
        }
      })
      //清空input框
      this.setData({
        inputTemp: '',
      })
    }
    //清空inputValue
    that.data.inputValue = '';
  },
  onLoad: function () {
    var that = this;

    //获取用户头像
    that.setData({
      userInfo: app.globalData.userInfo//userInfo
    })

    //获取手机屏幕大小
    wx.getSystemInfo({
      success: function (res) {
//        console.log("窗口可用宽度：" + res.windowWidth)
//        console.log("窗口可用高度：" + res.windowHeight)
        that.setData({
          msgWidth: res.windowWidth - 160 + "px",
          windowHeight: res.windowHeight * 0.91,
        })
        //console.log("聊天窗口可用宽度：" + that.data.windowWidth)
        //console.log("聊天窗口可用高度：" + that.data.windowHeight)
      }
    })
  }
})
