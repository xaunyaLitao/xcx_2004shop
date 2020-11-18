//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    goods:[],
    "bnrUrl": [{
      "url": "/images/draw-banner.jpg"
    }, {
      "url": "/images/discount-banner.jpg"
    }, {
      "url": "/images/nursing-banner.jpg"
    }, {
      "url": "/images/discount-banner.jpg"
    }],
    dataList:[
      {
        goods_id:1,
        goods_title:'商品标题1',
        goods_img:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        goods_xiaoliang:'0',
        goods_price:'60'
      },{
        goods_id:1,
        goods_title:'商品标题2',
        goods_img:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        goods_xiaoliang:'0',
        goods_price:'70'
      }, {
        goods_id: 1,
        goods_title: '商品标题3',
        goods_img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        goods_xiaoliang: '0',
        goods_price: '80'
      }, {
        goods_id: 1,
        goods_title: '商品标题4',
        goods_img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        goods_xiaoliang: '0',
        goods_price: '90'
      }, {
        goods_id: 1,
        goods_title: '商品标题5',
        goods_img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        goods_xiaoliang: '0',
        goods_price: '110'
      }
    ],



  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    let _this=(this);
    wx.request({
      url: 'http://weixinshop.2004.com/api/test', //仅为示例，并非真实的接口地址
      data: {
        x: 'xsx',
        y: 'csc'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        // console.log(res);
       _this.setData({
      
       })
      }
    }),

    // 接收商品
wx.request({
  url: 'http://weixinshop.2004.com/api/goods',
  success:function(res) {
    console.log(res);
    _this.setData({ 
      goods:res.data
    })
   },
   fail:function(){
     console.log("请求失败");
   }
})



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
  }
})
