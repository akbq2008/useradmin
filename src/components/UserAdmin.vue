<template>
	<div class="useradmin">
		<el-container ref="contain">
			<el-table     v-loading="loading" :data="tableData" tooltip-effect="dark" height="600" stripe align="center" :default-sort="{prop: 'id', order: 'ascending'}">
				<el-table-column prop="id" label="序号" width="140" sortable>
				</el-table-column>
				<el-table-column show-overflow-tooltip prop="name" label="姓名" width="120" sortable>
				</el-table-column>
				<el-table-column show-overflow-tooltip prop="username" label="用户名" width="140" sortable>
				</el-table-column>
				<el-table-column prop="address" label="地址" sortable>
				</el-table-column>
				<el-table-column prop="phone" label="手机号码" sortable>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<router-link class="el-button el-button--primary el-button--mini" :to="'/useradmin/'+(scope.$index+1)">编辑</router-link>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-container>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				loading: true
			}
		},
		mounted() {
			var _this = this;
			_this.init();
		},
		activated() {
			var _this = this;
			_this.init();
		},
		methods: {
			init() {
				fetch("http://localhost:3000/users", {
						method: "get"
					}).then(result => {
						return result.json();
					})
					.then(data => {
						var dataArr = [],
							len = data.length;
						for(var i = 0; i < len; i++) {
							var obj = {};
							obj.username = data[i].username;
							obj.name = data[i].name;
							obj.id = data[i].id;
							obj.phone = data[i].phone;
							obj.address = data[i].address.prov + " " + data[i].address.city;
							dataArr[i] = obj;
						}
						this.tableData = dataArr;
						this.loading=false;
					})
			},
			handleDelete(index, row) {
				this.$confirm("请确认是否要删除?", '提示', {
					cancelButtonText: '取消',
					confirmButtonText: '确定',
					type: 'warning'
				}).then(() => {
					this.$http.delete("http://localhost:3000/users/" + (index + 1)).then((result) => {
						this.init();
					})
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
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
<style>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}
	
	.el-aside {
		color: #333;
	}
	
	.el-container {
		width: 1200px;
		margin: 100px auto;
		border: 1px solid #eee;
	}
	
	.el-table_1_column_2 .cell {
		display: inline-block;
		width: 100%;
	}
</style>