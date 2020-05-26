import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset:utf-8';
// axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
axios.defaults.baseURL = 'http://120.25.234.158:9001'
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
Vue.prototype.$http = axios

// 添加请求拦截器
axios.interceptors.request.use((config)=>{
  // 添加header头的token
  // let token = "nGqD26caeFKhkN/STirR4Q=="
  config.headers['mtoken'] = 'nGqD26caeFKhkN/STirR4Q=='
  // config.headers['clientType'] = 'mobile'
  // let token = window.sessionStorage.getItem('token')
  // if(token){
    // config.headers['SESSION-TOKEN'] = token
  // }
	// if(config.token === true){
	// 	config.headers['token'] = token
  // }
	// 显示loading
	// if(config.loading === true){
		// showLoading()
	// }
	// 在发送请求之前做些什么
	return config;
}, (error)=> {
	// 隐藏loading
	hideLoading()
	// 对请求错误做些什么
	return Promise.reject(error);
});

import 'vant/lib/index.css'; 
import { Button,Loading,Toast,Dialog} from 'vant';
Vue.use(Button) //在需要的页面中就可以直接使用，页面当中也无需再次引入
Vue.use(Loading);
Vue.use(Toast);
Vue.use(Dialog);

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
