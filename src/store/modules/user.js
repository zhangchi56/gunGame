export default {
	state: {
	  user: {
		  userId:'',
		  userName:'',
		  integral:''
	  },
	  token: false,
	},
	getters: {

	},
	mutations: {
	  // 初始化用户信息
	  initUser(state) {
		let user = window.sessionStorage.getItem('user')
		let token = window.sessionStorage.getItem('token')
		if (user) {
		  state.user.userId = JSON.parse(user)
		  state.user.userName = JSON.parse(user)
		//   state.user.integral = JSON.parse(user)
		}
		if(token){
			state.token = state.token
		}
	  },
	  // 登录
	  login(state, user) {
		//   console.log(user)
		// 保存登录状态
		state.user.userId = user.userId
		state.user.userName = user.userName
		
		state.token = user.token
		// 存储到本地存储
		window.sessionStorage.setItem('userId', JSON.stringify(state.user.userId))
		window.sessionStorage.setItem('userName', JSON.stringify(state.user.userName))
		window.sessionStorage.setItem('token', JSON.stringify(state.token))
	  },
	  //获取用户积分
	  saveIntegral(state,data){
		state.user.integral = data
		window.sessionStorage.setItem('integral', JSON.stringify(state.user.integral))
	  },
	  //改变用户积分
	  changeUserIntegralNul(state,data){
		  state.user.integral = data
		  window.sessionStorage.setItem('integral', JSON.stringify(state.user.integral))
	  }
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
  