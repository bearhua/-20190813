import WeAppRedux from './redux/index.js';
import createStore from './redux/createStore.js';
import reducer from './store/reducer.js';

import ENVIRONMENT_CONFIG from './config/envConfig.js'
import PAGE_CONFIG from './config/pageConfig.js'

const {Provider} = WeAppRedux;
console.log(reducer)
const store = createStore(reducer) // redux store

App(
  Provider(store)(//1.provider 用来将Redux的store绑定到App上 App(Provider(store){onLaunch:function(){}}等价于 App({onLaunch:function(){},store:store}))
    {
      globalData: {
        // emitter: null,
        // netcallController: null,
        ENVIRONMENT_CONFIG,
        PAGE_CONFIG
      },
      onShow: function(e) {
        if (e.scene == 1007 || e.scene == 1008) {
          try{
            this.globalData.netcall && this.globalData.netcall.destroy()
            this.globalData.nim && this.globalData.nim.destroy({
              done: function () {
              }
            })
          }catch(e) {
          }
        }
      },
      onLaunch: function (e) {
        let imUserInfo = wx.getStorageSync('imUserInfo')
        if (imUserInfo) {
          this.globalData.imUserInfo = imUserInfo
        }
        // let systemInfo = wx.getSystemInfoSync()
        // this.globalData.videoContainerSize = {
        //   width: systemInfo.windowWidth,
        //   height: systemInfo.windowHeig、32、
        // }
      },
      //设置消息未读总数
      setTotalUnread : function(num){
        // var num = '100';
        console.log(num)
        if (num && parseInt(num) > 99) num = '99+'
        if (num && parseInt(num) > 0){
          wx.setTabBarBadge({
            index: 0,
            text: '' + num,
          })
        }else{
          wx.removeTabBarBadge({
            index: 0
          })
        }
      }
    }
  )
)
