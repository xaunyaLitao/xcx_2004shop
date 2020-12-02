// pages/city/city.js
const app = getApp()
const apihost = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  handInput:function(e){
// console.log(e);
    let value = e.detail.value;
    this.setData({
      value:value
    })
  },
  handl:function(e){
// console.log(e);
    let value =this.data.value;
    let _this=this;
    wx.request({
      url: apihost + '/xcx/tianqi?value='+value,
      success(res){
        console.log(res);
        _this.setData({
          res:res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handl();
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