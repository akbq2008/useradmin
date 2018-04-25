// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import Home from './components/Home'
import UserAdmin from './components/UserAdmin'
import Edit from './components/Edit'
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
			component: UserAdmin,
			children: [{
				path: "edit",
				name: 'edit',
				component: Edit
			}]
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
})