// pages/index/index.js
let app = getApp()
let store = app.store
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
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

  },
  duankai (){
    // 断开 IM
    app.globalData.nim.disconnect();
    app.setTotalUnread(0)
    store.dispatch({
      type: 'Reset_All_State'
    })
    // 更新 token
    // app.global.nim.setOptions({
    //   token: 'newToken'
    // });
    // // 重新连接
    // nim.connect();
  },
  chonglian(){
    app.globalData.nim.connect();
   
    // 更新 token
    // app.global.nim.setOptions({
    //   token: 'newToken'
    // });
    // // 重新连接
    // nim.connect();
  },
  changeAccount(){
    app.globalData.nim.setOptions({
      token: '016e7e473499d30ea2536a89fade8fa5'
    });
    // 重新连接
    app.globalData.nim.connect();
  }
})