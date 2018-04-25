<template>
	<div class="useradmin">
		<el-container style="width: 1200px;margin:0 auto;border: 1px solid #eee;">
			<el-main>
				<el-table :data="tableData" height="600" stripe align="center" :default-sort="{prop: 'id', order: 'descending'}">
					<el-table-column prop="id" label="序号" width="140" sortable>
					</el-table-column>
					<el-table-column prop="name" label="姓名" width="120" sortable>
					</el-table-column>
					<el-table-column prop="username" label="用户名" width="140" sortable>
					</el-table-column>
					<el-table-column prop="address" label="地址" sortable>
					</el-table-column>
					<el-table-column prop="phone" label="手机号码" sortable>
					</el-table-column>
				</el-table>
			</el-main>
		</el-container>
	</div>
</template>
<style>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}
	
	.el-aside {
		color: #333;
	}
</style>

<script>
	export default {
		data() {
			return {
				tableData: []
			}
		},
		//		beforeCreate() {
		//			alert("组件实例化之前执行的函数");
		//		},
		//		created() {
		//			alert("组件实例化完毕，但页面还未显示");
		//		},
		//		beforeMount() {
		//			alert('组件挂载前，页面仍未展示，但虚拟DOM已经配置');
		//		},
		mounted() {
			var _this = this;
			_this.init();
			//			alert("组件挂载后，此方法执行后，页面显示。")
		},
		activated() {
			var _this = this;
			_this.init();
		},
		//		beforeUpdate() {
		//			alert("组件更新前，页面仍未更新，但虚拟DOM已经配置");
		//		},
		//		updated() {
		//			alert("组件更新，此方法执行后，页面显示")
		//		},
		//		beforeDestory() {
		//			alert("组件销毁前");
		//		},
		//		destoryed() {
		//			alert("组件销毁");
		//		},
		methods: {
			init() {
				fetch("http://localhost:3000/users", {
						method: "get"
					}).then(result => {
						return result.json();
					})
					.then(data => {
						var dataArr = [];
						var len = data.length;
						for(var i = 0; i < len; i++) {
							var obj = {};
							obj.username = data[i].username;
							obj.name = data[i].name;
							obj.id = data[i].id;
							obj.phone = data[i].phone;
							obj.address = data[i].address.street;
							dataArr[i] = obj;
						}
						this.tableData = dataArr;
					})
			}
		}

	}
</script>
<style>
	* {
		margin: 0;
		padding: 0;
	}
	
	.el-main {
		height: 90vh;
		overflow: auto;
	}
	
	.el-menu--horizontal .el-menu-item {
		padding: 0;
	}
	
	.el-menu--horizontal .el-menu-item a {
		display: inline-block;
		height: 100%;
		padding: 0 20px;
	}
</style>