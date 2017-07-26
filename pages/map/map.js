// map.js
let app = getApp()
Page({
  data: {
    systemInfo: {},
    locationInfo: {},
    userInfo: {},
    mapCTX: null,
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
    }, {
      id: 2,
      iconPath: '/assets/step.png',
      position: {
        left: 0,
        top: 0,
        width: 40,
        height: 40
      },
      clickable: true
    }, {
      id: 3,
      iconPath: '/assets/point.png',
      position: {
        left: 0,
        top: 0,
        width: 20,
        height: 20
      }
    }],
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
        'controls[0].position.top': systemInfo.screenHeight - 119,
        'controls[1].position.left': systemInfo.screenWidth - 55,
        'controls[1].position.top': systemInfo.screenHeight - 119,
        'controls[2].position.left': (systemInfo.screenWidth / 2) - 10,
        'controls[2].position.top': (systemInfo.windowHeight / 2) - 15
      })
    })
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
    this.setData({
      'mapCTX': wx.createMapContext('map')
    })
    this.getLocation()
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
  getLocation() {
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        let circle = {
          latitude: res.latitude,
          longitude: res.longitude,
          fillColor: '#FFD7003C',
          radius: 200
        }
        let setData = {
          'locationInfo': res,
          'circles': [circle]
        }
        if (that.data.center.latitude === 0) {
          setData['center.latitude'] = res.latitude
          setData['center.longitude'] = res.longitude
        }
        that.setData(setData)
      }
    })
  },
  // 控件事件
  controltap(e) {
    if (e.controlId === 1) {
      // 回到定位地点
      this.data.mapCTX.moveToLocation()
    } else if (e.controlId === 2) {
      // 查看步数信息
      wx.navigateTo({
        url: '/pages/steps/steps'
      })
    }
  },
  // 更新数据
  regionchange(e) {
    let that = this
    if (e.type === 'end') {
      that.data.mapCTX.getCenterLocation({
        success(res) {
          // 设定范围中心点
          let setData = {
            'circles': [{
              latitude: res.latitude,
              longitude: res.longitude,
              fillColor: '#FFD7003C',
              radius: 200
            }]
          }
          that.setData(setData)
          // 获取范围数据
          // todo
        }
      })
    }
  }
})
