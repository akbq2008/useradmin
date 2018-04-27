<template>
	<div class="add">
		<h1>编辑</h1>
		<!--<el-container>-->
			<el-form v-loading="loading" ref="form" size="medium " :rules="rules" label-width="80px" :label-position="labelPosition" :model="formLabelAlign">
				<el-form-item label="姓名" prop="name">
					<el-input clearable v-model="formLabelAlign.name" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="用户名" prop="username">
					<el-input clearable v-model="formLabelAlign.username" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-select v-model="formLabelAlign.address.prov" placeholder="请选择活动区域" @change="cityFun">
						<el-option :value="item.p" v-for="(item,index) in provList" :key="index"></el-option>
					</el-select>
					<el-select v-model="formLabelAlign.address.city" placeholder="请选择活动区域">
						<el-option :value="item.n" v-for="(item,index) in cityList" :key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="手机号码" prop="phone">
					<el-input clearable v-model="formLabelAlign.phone" placeholder="请输入手机号码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit(form)" ref="confirms">确定提交</el-button>
					<el-button type="primary" @click="$router.go(-1)">返回</el-button>
				</el-form-item>
			</el-form>
		<!--</el-container>-->
	</div>
</template>

<script>
	import city from '@/assets/js/city.min.js';
	import Loading from 'element-ui'
	export default {
		name: "add",
		data() {
			return {
				labelPosition: 'left',
				provList: [],
				cityList: [],
				form: '',
				address: {
					prov: "",
					city: ""
				},
				loading: true,
				rules: {
					name: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 20,
							message: '最小3位',
							trigger: 'blur'
						}
					],
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 20,
							message: '最小3位',
							trigger: 'blur'
						}
					],
					address: [{
						required: true,
						message: '请输入地址',
						trigger: 'change'
					}],
					phone: [{
							required: true,
							message: '请输入电话号码',
							trigger: 'blur'
						},
						{
							validator: function(rule, value, callback) {
								if(/^1[34578]\d{9}$/.test(value) == false) {
									callback(new Error("请输入正确的手机号"));
								} else {
									callback();
								}
							},
							trigger: 'blur'
						}
					],
				},
				formLabelAlign: {
					name: '',
					username: '',
					address: {
						prov: '',
						city: ''
					},
					phone: ''
				}
			}
		},
		mounted() {
			var _this = this;
			_this.init();
		},
		methods: {
			init() {
				var _this = this;
				_this.provList = city.citylist;
				_this.fetchUser(this.$route.params.id);
			},
			fetchUser(id) { //编辑页面数据的获取
				var _this = this;
				this.$http.get("http://localhost:3000/users/" + id).then(result => {
					//					console.log(result.data)
					_this.formLabelAlign = result.data;

					var len = _this.provList.length;
					for(var i = 0; i < len; i++) {
						var item = _this.provList[i];
						if(item.p == _this.formLabelAlign.address.prov) {
							this.cityList = item.c;
							break;
						}
					}
					this.loading = false;
				})
			},
			onSubmit(formName) {
				var _this = this;
				var loc = {
					"prov": _this.formLabelAlign.address.prov,
					"city": _this.formLabelAlign.address.city
				};
				if(_this.formLabelAlign.name == "") {
					_this.$alert('请输入姓名！');
					return;
				} else if(_this.formLabelAlign.username == "") {
					_this.$alert('请输入用户名！');
					return;
				} else if(_this.formLabelAlign.address.prov == "" || _this.formLabelAlign.address.city == "") {
					_this.$alert('请选择地址！');
					return;
				} else if(_this.formLabelAlign.phone == "") {
					_this.$alert('请输入手机号码！');
					return;
				}
				_this.$refs.form.validate((valid) => {
					if(valid) {
						var loading = this.$loading({
							lock: true,
							text: '修改成功！',
							spinner: 'el-icon-loading',
							fullscreen: true,
							background: 'rgba(0, 0, 0, 0.7)'
						});
						_this.$http.put("http://localhost:3000/users/" + this.$route.params.id, {
							name: _this.formLabelAlign.name,
							username: _this.formLabelAlign.username,
							phone: _this.formLabelAlign.phone,
							address: loc
						}).then(data => {
							if(data.status == 200) {
								this.$nextTick(() => {
									loading.close();
									_this.$router.push({
										path: '/UserAdmin'
									});
								});
								//以服务的方式调用的 Loading 需要异步关闭
							}
						});
					} else {
						_this.$alert('修改失败！');
						return false;
					}
				});

			},
			cityFun() { //选择地区
				var _this = this,
					len = _this.provList.length;
				_this.formLabelAlign.address.city = "";
				for(var i = 0; i < len; i++) {
					var item = _this.provList[i];
					if(item.p == _this.formLabelAlign.address.prov) {
						_this.cityList = item.c;
						break;
					}
				}
			}
		}
	}
</script>

<style scoped>
	.add h1 {
		margin-top: 50px;
	}
	
	.el-form {
		margin: 0 auto;
		margin-top: 100px;
		width: 800px;
	}
	
	.el-form-item {
		margin-bottom: 22px;
	}
	
	.el-button--medium {
		width: 200px;
	}
</style>