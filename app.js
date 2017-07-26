//app.js
let ajax = require('assets/utils/request.js')

App({
  // data
  globalData: {
    userInfo: null,
    systemInfo: null,
    userSteps: null
  },
  // 生命周期
  onLaunch(options) {
    console.log(options)
  },
  // 方法
  getUserInfo(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success(res) {
          Promise.all([
            that.getLogin(res),
            that.getUserInfoAfL()
          ]).then((data) => {
            let userInfo = Object.assign({}, data[0], data[1])
            that.globalData.userInfo = userInfo
            typeof cb == "function" && cb(userInfo)
          })
        }
      })
    }
  },
  getLogin (code) {
    return new Promise((resolve, reject) => {
      ajax('/wchat/getLogin', code, (res) => {
        resolve(res.data.data)
      })
    })
  },
  getUserInfoAfL () {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        success(res) {
          resolve(res.userInfo)
        },
        fail(res) {
          resolve({
            nickName: 'Friend',
            avatarUrl: '/assets/photo.jpg'
          })
        }
      })
    })
  },
  getSystemInfo(cb) {
    var that = this
    if (this.globalData.systemInfo) {
      typeof cb == "function" && cb(this.globalData.systemInfo)
    } else {
      wx.getSystemInfo({
        success(res) {
          that.globalData.systemInfo = res
          typeof cb == "function" && cb(res)
        }
      })
    }
  },
  getUserSteps(cb) {
    var that = this
    if (this.globalData.userSteps) {
      typeof cb == "function" && cb(this.globalData.userSteps)
    } else {
      wx.getWeRunData({
        success(res) {
          res.session_key = that.globalData.userInfo.session_key
          ajax('/wchat/getEncryptedData', res, (res) => {
            that.globalData.userSteps = res
            typeof cb == "function" && cb(res)
          })
        }
      })
    }
  }
})
