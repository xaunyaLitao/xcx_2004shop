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
    list:[],
    page:1,  //列表 页号
    pagesize:6, //列表大小

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function(){
    console.log(123211);
    this.data.page++;
    this.getGoodsList();
  },

  //商品详情
  goodsDetail:function(e){

    //获取被点击的 商品id
    let goods_id = e.currentTarget.id;
    //切换至 详情页
    wx.redirectTo({
      url: '/pages/detail/detail?goods_id='+goods_id
    });
  },

      // 接收商品
      getGoodsList:function(){
        let _this=this;
        wx.request({
          url: 'http://weixinshop.2004.com/api/goods',
          data:{
              page:_this.data.page,  //分页 页号
              size:_this.data.pagesize
          },
          header:{'content-type':'application/json'},
          success(res) {
            console.log(res);
            let new_list=_this.data.list.concat(res.data.data.list)
            _this.setData({ 
              // goods:res.data
              list: new_list
            })
           },
           fail:function(){
             console.log("请求失败");
           }
        })
      },


       //登录
  doLogin:function(){
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://weixinshop.2004.com/xcx/home-login?code='+res.code,
            success:function(d){
              console.log(d);
              //获取登录token
              wx.setStorage({
                key:"token",
                data:d.data.data.token
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  onLoad: function () {
    let _this = this;
   
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

    _this.doLogin();
    _this.getGoodsList();


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
