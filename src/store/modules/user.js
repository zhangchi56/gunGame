export default {
	state: {
	  user: {},
	  token: false,
	  userId:''
	},
	getters: {

	},
	mutations: {
	  // 初始化用户信息
	  initUser(state) {
		let user = window.sessionStorage.getItem('user')
		if (user) {
		  state.user = JSON.parse(user)
		  state.token = state.user.token
		  state.userId = state.user.userid
		}
	  },
	  // 登录
	  login(state, user) {
		// 保存登录状态
		state.user = user.user
		state.token = user.token
		state.userId = user.userId
		// 存储到本地存储
		// console.log(user.user)
		// console.log(user.token)
		// console.log(user.userId)
		window.sessionStorage.setItem('user', JSON.stringify(state.user))
		window.sessionStorage.setItem('token', JSON.stringify(state.token))
		window.sessionStorage.setItem('userId', JSON.stringify(state.userId))
	  },
	  // 退出登录
	//   logout(state) {
	// 	// 清除状态
	// 	state.user = {}
	// 	state.token = false
	// 	// 清除本地存储
	// 	window.sessionStorage.clear()
	//   }
	},
	actions: {
  
	}
  }
  