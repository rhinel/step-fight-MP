// steps.js
let app = getApp()
Page({
  data: {
    userInfo: {}
  },
  // 生命周期函数--监听页面加载
  onLoad(optons) {
    let that = this
    app.getUserInfo((userInfo) => {
      that.setData({
        'userInfo.info': userInfo
      })
    })
    app.getUserSteps((userSteps) => {
      that.setData({
        'userInfo.step': userSteps
      })
    })
  },
  // 生命周期函数--监听页面初次渲染完成
  onReady() {

  },
  // 生命周期函数--监听页面显示
  onShow() {

  },
  // 生命周期函数--监听页面隐藏
  onHide() {

  },
  // 生命周期函数--监听页面卸载
  onUnload() {

  },
  // 页面上拉触底事件的处理函数
  onReachBottom() {

  }
})
