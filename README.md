### 目录结构
```shell
|- components 自定义组件目录
  |- emoji 表情包组件
  |- swipedelete 列表删除组件
|- config (appkey等及默认头像配置)
|- controller 
   |- im.js 连接云信的js
|- images 项目中使用的一些高频次图片
|- pages 主功能一级页面
	|- recentchat 最近会话页
  |- chating 会话详情页
  |- historyFromCloud 历史记录
|- redux 数据管理相关js，用于创建数据管理仓库-store
|- store 数据管理相关js，
  |- reducer.js 提供修改store.js中的数据的操作  eg：store.dispatch({type: 'FriendCard_Update_Online_Status',payload: statusArr})
  |- store.js IM全局数据们
|- utils 存放一些工具类js
	|- emojimap.js emoji文本与对应图片的映射关系，自定义emoji组件使用
	|- imageBase64.js 存储一些小图标bese64编码
	|- util.js 一些工具方法的集合
|- vendors 引入外部的库，主要有网易云信IM的SDK NIM_Web_NIM_weixin_v6.0.0.js
|- app.js 小程序根实例，存储了全局中的一些数据 (setTotalUnread--自定义的设置bar的总未读数的方法,在该js中使用createStore等创建store用于存储数据,使用格式参见代码)
|- app.json 注册页面以及定义页面一些基本样式
|- app.wxss 全局样式
|- project.config.json 设置整个小程序工程的一些属性
```


### 几个核心的js
  - im.js 
     
		初始化时相关回调及顺序   1.onConnect -> 2.onMyInfo (存储个人信息到全局数据) -> 3.onUsers (同步好友用户名片) ->4.onSessions (同步最近会话列表回调)
		 -> 5.onRoamingMsgs (同步漫游消息) -> 6.onSyncDone (同步完成) -> 7.onPushEvents （sync done之后触发,设置订阅后，服务器消息事件回调）

		onSysMsg 操作主体为对方，收到系统通知，例如被对方撤回消息触发
		onUpdateSession **会话更新：收到消息、发送消息、设置当前会话、重置会话未读数触发   
		onMsg **收到消息触发
	  
		im.js的使用--创建实例
        import IMController from '../../controller/im.js'
        new IMController({
          token: '016e7e473499d30ea2536a89fade8fa5',
          account: 'tf_1679'     
        })

  - store.js   提供修改store.js中的数据的操作  
  - reducer.js IM全局数据们
		redux的基本使用
		
		1. app.js  将Redux Store绑定到App上
		const store = createStore(reducer) // redux store
		App(Provider(store)({
			onLaunch: function () {
			  console.log("onLaunch")
			}
		  }))

		2.pages上使用  在页面的定义上使用connect,绑定redux store到页面上。
		  
		  const pageConfig = {//页面的定义
			data: {
			},
			...
		  }
		  
		  let mapStateToData = (state) => {//定义要映射哪些state到页面
			let chatList = pageConfig.convertRawMessageListToRenderChatList(state.rawMessageList, state.friendCard, state.groupList, state.unreadInfo)
			return {
			  chatList: chatList,
			}
		  }
		  
		 let mapDispatchToPage = dispatch => {} //定义要映射哪些方法到页面

		3.使用connect将上述定义添加到pageConfig中并注册小程序页面
		let connectedPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
		Page(connectedPageConfig)

		4.以上完成即可以在this.data中访问你在mapStateToData定义的数据

		5.操作store中的数据
		  store.dispatch({type: 'FriendCard_Update_Online_Status',payload: statusArr})

### IM  [API官方文档](https://dev.yunxin.163.com/docs/interface/%E5%8D%B3%E6%97%B6%E9%80%9A%E8%AE%AFWeb%E7%AB%AF/NIMSDK-Web/NIM.html#isMsgRemoteRead__anchor)