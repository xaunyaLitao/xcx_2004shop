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
  selectAlls:function(){
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
    let la=0;
    let selectAll=false;
    _this.data.goodsList.forEach( (value)=>{
      if(value.goods_id==id){
          value.checked=!value.checked;
      }
      if(value.checked){
         total+= value.goods_number* value.cart_price;
          la++
      }
      if(la==_this.data.goodsList.length){
        selectAll=true
      }
    })
      _this.setData({
        totalPrice: total,
        selectAll:selectAll
      })
  },


//购物车商品删除
// delgoods:function(e){
//   let _this = this;
//   let selectGoods = [];
//   let list = _this.data.goodsList;
//   let token = wx.getStorageSync('token')
//   list.forEach(item=>{
//     if(item.checked){   //选中的商品
//       selectGoods.push(item.goods_id)
//     }
//   })

//   if(selectGoods.length>0)
//   {
//     wx.showModal({
//       title: '提示',
//       content: '是否删除选中的商品？',
//       success (res) {
//         if (res.confirm) {
//           console.log('删除商品')
//           wx.request({
//             url: apihost + '/xcx/cart-del?token='+token, //仅为示例，并非真实的接口地址
//             method: 'post',
//             data: {
//               goods: selectGoods.toString(),
//             },
//             header: {
//               'content-type': 'application/json' // 默认值
//             },
//             success (res) {
//               console.log("删除成功")
//               _this.getCartList();
//               _this.setData({
//                 isSelectAll:false,
//                 totalAmount:0
//               })
//             }
//           })
//         } else if (res.cancel) {
//           console.log('用户点击取消')
//         }
//       }
//     })
//   }else{    //未选中商品
//     wx.showToast({
//       title: '请先选择要删除的商品',
//       icon: 'none',
//       duration: 2000
//     })
//   }
// },

delgoods:function(e){
  let _this=this;
  let seletGoods=[];
  let token=wx.getStorageSync('token');
  let list = _this.data.goodsList;
  list.forEach(item=>{
    if(item.checked){
      seletGoods.push(item.goods_id)
    }
  })
  if(seletGoods.length>0){
    wx.showModal({
      title: '提示',
      content: '是否删除所选中的商品',
      success (res) {
        if (res.confirm) {
          console.log('删除商品');
          wx.request({
            url: apihost + '/xcx/cart-del?token='+ token,
            method:'post',
            data:{
              goods:seletGoods.toString(),
            },
            header:{
              'content-type':'application/json'
            },
            success (res){
              console.log("删除成功");
              _this.getCartList();
              _this.setData({
                isSelectAll:false,
                totalAmount:0
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }else{
    wx.showToast({
             title: '请先选择要删除的商品',
             icon: 'none',
             duration: 2000
           })
  }
},


//购物车增加商品数量
  tao:function(e){
let _this=this;   //当前对象
let token=wx.getStorageSync('token');   //取token
let list =_this.data.goodsList;  //当前页面的商品列表
let index=e.currentTarget.dataset.goodsindex
let goods=list[index];  //获取添加数量的商品
let goods_id=list[index].goods_id;  //获取点击的商品id
list[index].goods_number++;    //  点击的商品的数量++

// 请求后端购物车接口
wx.request({
  url: apihost + '/xcx/cart?token='+token,   //请求后端接口的地址
  method:'post',     //post方式发送 接收
  data:{
    goodsid:goods_id
  },
  success:function(d){
    if(d.data.errno==0){  //请求接口成功
      _this.setData({
        goodsList:list
      })
    }else{
      console.log("请求接口错误");
    }  
  }
});
wx.showToast({
  title: '添加成功',
  icon: 'none',
  duration: 2000
});
},

// 购物车商品数量  减号
decrcart:function(e){
  console.log(111);
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