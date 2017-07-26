// map.js
let app = getApp()
Page({
  data: {
    systemInfo: {},
    locationInfo: {},
    userInfo: {},
    center: {
      latitude: 0,
      longitude: 0
    },
    controls: [{
      id: 1,
      iconPath: '/assets/getp.png',
      position: {
        left: 0,
        top: 0,
        width: 40,
        height: 40
      },
      clickable: true
    }],
    controlTime: Date.now(),
    circles: [],
    markers: []
  },
  // 生命周期函数--监听页面加载
  onLoad(options) {
    let that = this
    app.getSystemInfo((systemInfo) => {
      that.setData({
        systemInfo: systemInfo,
        'controls[0].position.left': 15,
        'controls[0].position.top': systemInfo.screenHeight - 119
      })
    })
    app.getUserSteps((userSteps) => {
      that.setData({
        'userInfo.stepInfo': userSteps
      })
    })
    this.setData({
      'mapCTX': wx.createMapContext('map')
    })
    that.getLocation(true)
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
  // 生命周期函数--上拉触底事件的处理函数
  onReachBottom() {

  },
  // 方法
  // 获取用户位置
  getLocation(type) {
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        let marker = {
          id: 1,
          latitude: res.latitude,
          longitude: res.longitude,
          iconPath: '/assets/my.png',
          width: 20,
          height: 20,
          anchor: {
            x: 0.5,
            y: 0.5
          }
        }
        let circle = {
          latitude: res.latitude,
          longitude: res.longitude,
          fillColor: '#FFD7003C',
          radius: 200
        }
        let setData = {
          'locationInfo': res,
          'circles': [circle],
          'markers': [marker],
          'controlTime': Date.now()
        }
        if (that.data.center.latitude === 0) {
          setData['center.latitude'] = res.latitude
          setData['center.longitude'] = res.longitude
        }
        that.setData(setData)
        type && that.data.mapCTX.moveToLocation()
      }
    })
  },
  // 中心点检测
  controltap(e) {
    let time = Date.now()
    if (this.data.controlTime - time > 60000) {
      this.getLocation(true)
    } else {
      this.data.mapCTX.moveToLocation()
    }
  }
})
