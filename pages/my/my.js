// pages/my/my.js
const app = getApp()
const apihost = app.globalData.apiUrl;
Page({
  motto: 'Hello World',
    xue:'大哥',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  /**
   * 生命周期函数--监听页面加载
   */

  //  点击登录
  login:function(u){
    let userinfo = u.detail.userInfo;
    let token = wx.getStorageSync('token')
  wx.login({
    success (res) {
      // console.log(res);
      if (res.code) {
        //发起网络请求
        wx.request({
          url: apihost + '/xcx/user-login?code=' + res.code+'&token='+token,
          method: 'post',
          header:{'content-type':'application/json'},
          data: {
            u: userinfo
          },
          success: function(res){
            console.log(res);
              //保存token
              wx.setStorageSync('toekn',res.data.data.token);
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
   },


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