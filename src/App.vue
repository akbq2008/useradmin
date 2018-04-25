<template>
	<div id="app">
		<el-menu default-active="2" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item index="2">
				<router-link to="/">主页</router-link>
			</el-menu-item>
			<el-menu-item index="1">
				<router-link to="/userAdmin">用户管理系统</router-link>
			</el-menu-item>
			<el-menu-item index="3">
				<router-link to="/about">关于我们</router-link>
			</el-menu-item>

			<el-menu-item index="4" class="nav-right">
				<router-link to="/add">添加用户</router-link>
			</el-menu-item>
		</el-menu>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				//				'activeIndex': '2'
			}
		},
		methods: {}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	.el-menu{
		padding: 0 100px;
	}
	.el-menu--horizontal .nav-right {
		float: right;
	}
	
	* {
		margin: 0;
		padding: 0;
		/*overflow: hidden;*/
	}
</style>