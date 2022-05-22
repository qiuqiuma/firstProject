<template>
<div class="login2">
    <!-- <div class="login_user"><span>*管理账户：</span><input type="text" /></div>
    <div class="login_pswd">
      <span>*密&nbsp;&nbsp;&nbsp;码：</span><input type="password" />
    </div> -->
    <el-form :model="form" ref="form" style="margin-top: 2rem" :rules="rule">
        <!-- <el-form-item prop="userAcount">
        <el-input
          placeholder="请输入账号"
          v-model="form.userAcount"
          class="input-with-select"
        >
        </el-input>
         <el-input v-model="form.userAcount"></el-input> 
      </el-form-item>-->
        <el-form-item prop="userAcount">
            <el-input placeholder="请输入手机号" v-model="form.userAcount" class="input-with-select">
                <el-select style="width: 80px" v-model="select" slot="prepend" placeholder="+86">
                    <el-option label="+86" value="1"></el-option>
                    <el-option label="+123" value="2"></el-option>
                    <el-option label="+456" value="3"></el-option>
                </el-select>
            </el-input>
            <!-- <el-input v-model="form.userAcount"></el-input> -->
        </el-form-item>
        <el-form-item prop="pwd">
            <el-input v-model="form.pwd" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <input type="button" class="login_btn" value="登录" @click="to_login_admin" />
            <!-- <button class="login_btn" >登录</button> -->
        </el-form-item>

        <el-form-item>
            <div class="login_botm">
                <span>隐私政策</span>
                <span @click="$emit('regist')" style="color: #ffc915; cursor: pointer">注册账号</span>
            </div>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
    props: ["rule"],
    data() {
        return {
            select: "",
            form: {
                userAcount: "",
                pwd: "",
            },
            a_rules: {
                userAcount: [{
                    required: true,
                    message: "账号不能为空",
                    trigger: "blur",
                }, ],
                pwd: [{
                    required: true,
                    message: "请输入密码",
                    trigger: "blur",
                }, ],
            },
        };
    },
    methods: {
        to_login_admin() {
            let param = new URLSearchParams()
            param.append('username', this.form.userAcount)
            param.append('password', this.form.pwd)
            let _this = this
            this.$refs.form.validate().then(() => {
                    this.$axios({
                        method: "post",
                        url: "/common/login",
                        data: param
                    }).then((res) => {
                        let resObj = res.data.data;
                        console.log(res)
                        this.$emit('tip',res.data.resMsg)
                        if (res.data.resMsg == "success") {
                          window.localStorage.setItem('token',res.data.token)
                            // 用户信息存入vuex
                            _this.$store.commit({
                                type: "setUserMsg",
                                nickname: resObj.nickName,
                                head_img: resObj.headImg,
                                user_account: resObj.userName,
                                loginFlag: true,
                            });
                            this.$router.push("/");
                       // } else if (res.data.resMsg == "pwd_error") {
                            // this.$message.error('用户名或密码错误');
                      //  } else {

                            // this.$confirm('该用户还未注册，是否马上注册?', '提示', {
                            //     confirmButtonText: '确定',
                            //     cancelButtonText: '取消',
                            //     type: 'warning'
                            // }).then(() => {
                            //         this.$router.push('/register')
                            //         });

                                }
                            });
                    });
                },
            },
        };
</script>

<style>
</style>
