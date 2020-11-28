// pages/cart/cart.js
const app = getApp()
const apihost = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    selectAll:false,
    totalPrice:0,  //总价
  },


  //  全选
  selectAll:function(){
    let list=this.data.goodsList;
    let all= !this.data.selectAll;
    let total=0;
    list.forEach((item)=>{
      if(all){
        item.checked=true
        total+=item.goods_number * item.cart_price
      }else{
        item.checked=false
      }
    })
    this.setData({
      goodsList:list,
      selectAll:all,
      totalPrice:total
    })
  },

  //  单选
  selects:function(res){
    let id=res.target.dataset.id;
    let _this=this;
    let total=0;
  
    _this.data.goodsList.forEach( (value)=>{
      if(value.goods_id==id){
          value.checked=!value.checked;
      }
      if(value.checked){
         total+= value.goods_number* value.cart_price;
      }
    })
      _this.setData({
        totalPrice: total
      })


  },

   /**
   * 获取购物车商品列表
   */
  getCartList: function()
  {
    let _this = this;
    let token = wx.getStorageSync('token')
    wx.request({
      url: apihost + '/xcx/cartlist?token='+token,
      success: function(d)
      {
        console.log(d);

        if(d.data.errno==0)   //请求接口成功
        {
          _this.setData({
            goodsList:d.data.data.list
          })
        }else{
          console.log("接口请求错误")
        }

      }
    })
  },

  
    /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.getCartList()
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