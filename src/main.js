// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import Home from './components/Home'
import UserAdmin from './components/UserAdmin'
import About from './components/About'
import Add from './components/Add'
import VueResource from 'vue-resource'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.prototype.$axios = axios
const router = new VueRouter({
	mode: "history",
	//	base: __dirname,
	routes: [{
			path: "/",
			component: Home
		},
		{
			path: "/about",
			component: About
		}, {
			path: "/userAdmin",
			component: UserAdmin
		},
		{
			path: "/add",
			component: Add
		}
	]

})
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
//	template: `
//	
//  <div id="app">	
//		<el-menu :default-active="2" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
//			<el-menu-item index="2">
//				<router-link to="/">主页</router-link>
//			</el-menu-item>
//			<el-menu-item index="1">
//				<router-link to="/UserAdmin">用户管理系统</router-link>
//			</el-menu-item>
//			<el-menu-item index="3">
//				<router-link to="/About">关于我们</router-link>
//			</el-menu-item>
//			<el-menu-item index="4">
//				<router-link to="/Add">添加用户</router-link>
//			</el-menu-item>
//		</el-menu>
//		<router-view></router-view>
//	</div>
//	`
})
//.$mount("#app")