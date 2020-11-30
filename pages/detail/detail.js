// pages/detail/detail.js
const app = getApp()
const apihost = app.globalData.apiUrl;
Page({
  data: {
    isLike: true,
    // banner
    detail:[],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s


    kk:"asdfghjkl",
    num:0,
    nums: 1,
		// 使用data数据对象设置样式名
		minusStatus: 'disabled'

  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // 收藏
  addLike:function(e) {
    console.log(e)
    let goods_id = e.currentTarget.dataset.goodsid
    let token = wx.getStorageSync('token')
    wx.request({
      url: apihost + '/xcx/add-fav?id=' + goods_id + '&token=' +token,
      success: function(){
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },


  // 跳到购物车
  switchToCart: function()
  {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

    // 拨打电话
    makeCall:function()
    {
      wx.makePhoneCall({
        phoneNumber: '15010578121'
      })
    },


 //添加购物车
 addCart:function(data)
 {
   let goods_id = data.currentTarget.dataset.goodsid
  //  console.log(goods_id);
   let token = wx.getStorageSync('token');
   wx.request({
     url: app.globalData.apiUrl + '/xcx/cart?token='+token,
     method:'POST',
     dataType: 'json',
     header: {'content-type':'application/x-www-form-urlencoded'},
     data:{
       goodsid: goods_id
     },
     sucess:function(res)
     {
       console.log(res)
     }
   })

   wx.showToast({
    title: '加入购物车成功',
    icon: 'success',
    duration: 2000
  });
 },

  // 立即购买
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
  },
  /**
   * 页面的初始数据
   */
  // data: {

  // },

index:function(res){
  this.setData({
    num:res.detail.current
  })
},


/* 点击减号 */
bindMinus: function() {
  var nums = this.data.nums;
  // 如果大于1时，才可以减
  if (nums > 1) {
    nums --;
  }
  // 只有大于一件的时候，才能normal状态，否则disable状态
  var minusStatus = nums <= 1 ? 'disabled' : 'normal';
  // 将数值与状态写回
  this.setData({
    nums: nums,
    minusStatus: minusStatus
  });
},
/* 点击加号 */
bindPlus: function() {
  var nums = this.data.nums;
  // 不作过多考虑自增1
  nums ++;
  // 只有大于一件的时候，才能normal状态，否则disable状态
  var minusStatus = nums < 1 ? 'disabled' : 'normal';
  // 将数值与状态写回
  this.setData({
    nums: nums,
    minusStatus: minusStatus
  });
},
/* 输入框事件 */
bindManual: function(e) {
  var nums = e.detail.value;
  // 将数值与状态写回
  this.setData({
    nums: nums
  });
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let goods_id=options.goods_id;
      let _this=(this);
      wx.request({
        url: app.globalData.apiUrl + '/xcx/detail',
        data:{
          goods_id:goods_id
        },
        success:function(res){
          // console.log(res);
          _this.setData({
            detail:res.data       
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




