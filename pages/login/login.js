import IMController from '../../controller/im.js'
import { connect } from '../../redux/index.js'
let app = getApp()
let store = app.store
let pageConfig = {//页面的定义
  data: {
    account: '',// 用户输入账号
    password: ''//用户输入密码
  },
  // 测试使用
  onLoad() {
    this.resetStore()
  },
  onShow() {
    this.resetStore()
  },
  onShareAppMessage() {
    return {
      title: '网易云信DEMO',
      path: '/pages/login/login'
    }
  },
  /**
   * 重置store数据
   */
  resetStore: function () {
    store.dispatch({
      type: 'Reset_All_State'
    })
  },
  /**
   * 用户输入事件：dataset区分输入框类别
   */
  inputHandler: function (e) {
    let temp = {}
    temp[e.currentTarget.dataset.type] = e.detail.value
    this.setData(temp)
  },
  /**
   * 单击注册:跳转注册页
   */
  registerTap: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  /**
   * 执行登录逻辑
   */
  doLogin: function () {
    new IMController({
      // token: this.data.password,
      // account: this.data.account
      token: '016e7e473499d30ea2536a89fade8fa5',
      account: 'tf_1679'
    })
  }
}
let mapStateToData = (state) => {//定义要映射哪些state到页面
  return {
    isLogin: state.isLogin || store.getState().isLogin
  }
}

const mapDispatchToPage = (dispatch) => ({//定义要映射哪些方法到页面
  loginClick: function() {
    this.doLogin()
    return
  }
})
let connectedPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)//使用connect将上述定义添加到pageConfig中。

Page(connectedPageConfig)//注册小程序的页面
//完成上述之后,你就可以在this.data中访问你在mapStateToData定义的数据了。

//mapDispatchToPage定义的action会被映射到this对象上
console.log(app.data);