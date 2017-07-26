// index.js
let app = getApp()
Page({
  // data
  data: {
    userInfo: {},
    loading: true
  },
  // 生命周期函数--监听页面加载
  onLoad() {
    let that = this
    app.getUserInfo((userInfo) => {
      that.setData({
        userInfo: userInfo,
        loading: false
      })
    })
  },
  // 生命周期函数--上拉触底事件的处理函数
  onReachBottom() {

  },
  // 事件处理函数
  // 进入挑战
  enter() {
    wx.redirectTo({
      url: '/pages/map/map'
    })
  }
})
