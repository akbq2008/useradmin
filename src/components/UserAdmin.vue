<template>
	<div class="useradmin">
		<el-container ref="contain">
			<el-header>
				<!--<input type="text" @keydown="show"/>-->
				<el-input clearable placeholder="请输入内容" prefix-icon="el-icon-search" v-model="search" @keyup.native="show">
				</el-input>
			</el-header>
			<el-table v-loading="loading" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark" stripe align="center" :default-sort="{prop: 'id', order: 'ascending'}">
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
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 2, 5, 10]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
			</el-pagination>
		</el-container>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [], //表格显示的数据
				dataArr: [], //获取的数据源
				currentPage: 1, //当前页
				pagesize: 5, //页的尺寸
				loading: true, //默认加载loading
				search: ""
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
			handleSizeChange: function(size) {
				this.pagesize = size;
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
			},
			init() {
				fetch("http://localhost:3000/users", {
						method: "get"
					}).then(result => {
						return result.json();
					})
					.then(data => {
						var len = data.length;
						for(var i = 0; i < len; i++) {
							var obj = {};
							obj.username = data[i].username;
							obj.name = data[i].name;
							obj.id = data[i].id;
							obj.phone = data[i].phone;
							obj.address = data[i].address.prov + " " + data[i].address.city;
							this.dataArr[i] = obj;
						}
						this.tableData = this.dataArr;
						this.loading = false;
					})
			},
			show() {
				var searchInput = this.search;
				if(searchInput) {
					var back = this.dataArr.filter((item, index) => {
						return item.name.match(searchInput)
					});
					this.tableData = back; //匹配输入框
				} else {
					this.tableData = this.dataArr; //清空时赋初始值
				}
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