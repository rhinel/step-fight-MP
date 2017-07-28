// steps.js
let app = getApp()
let sliderWidth = 96
let formatTime = require('../../assets/utils/util.js').formatTime

Page({
  data: {
    userInfo: {},
    tabs: ["步数历史", "战斗结果", "奖杯排名"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  // 生命周期函数--监听页面加载
  onLoad(optons) {
    let that = this
    app.getSystemInfo((systemInfo) => {
      that.setData({
        sliderLeft: (systemInfo.windowWidth / that.data.tabs.length - sliderWidth) / 2,
        sliderOffset: systemInfo.windowWidth / that.data.tabs.length * that.data.activeIndex
      })
    })
    app.getUserInfo((userInfo) => {
      that.setData({
        'userInfo.info': userInfo
      })
    })
    app.getUserSteps((userSteps) => {
      userSteps.stepInfoList.forEach((i) => {
        i.timestamp = formatTime(new Date(i.timestamp * 1000))
      })
      userSteps.stepInfoList.reverse()
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

  },
  tabClick(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    })
  }
})
