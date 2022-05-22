<template>
<div class="login_w">
    <div class="mask" v-show="mask_flag"></div>
    <span @click="to_index" class="to_index"> &nbsp;&nbsp;返回首页</span>
    <center style="margin: 5rem 0">
        <img width="200px" src="../assets/img/realmeLogo.png" alt="" />
    </center>
    <div class="login_box">
        <span style="font-size: 1.5rem"> 账号登录 </span>
        <div class="login_top_option">
            <div @click="change" class="pp" :style="active">手机验证码登录</div>
            <div @click="change" class="pp" :style="notactive">密码登录</div>
            <!-- <router-link to="/common" class="pp" style="border-bottom: 2px solid #e35b5b;color:black;" @click="to_common">普通用户登录 </router-link>
                    <router-link to="/admin" class="pp" style="color: #cbb6b6;" @click="to_admin">管理员登录</router-link> -->
        </div>
        <!-- <router-view></router-view> -->
        <common v-show="common_flag" @mask="maskHandle" @regist="to_regist" :rule="b_rules" @tip="tip"></common>
        <admin v-show="admin_flag" :rule="b_rules" @regist="to_regist" @tip="tip"> </admin>
        <div class="bot">
            <span>--------其他登录方式---------</span>
            <span class="iconfont icon-qq" style="color: blue"></span>
        </div>
    </div>
</div>
</template>

<script>
import common from "./common";
import admin from "./admin";
export default {
  
    components: {
        common,
        admin,
    },
    data() {
        return {
            mask_flag: false,
            common_flag: true,
            admin_flag: false,
            active: "border-bottom: 2px solid #e35b5b;color:black;",
            notactive: "color: #cbb6b6;",
            b_rules: {
                userAcount: [{
                    required: true,
                    message: '账号不能为空',
                    trigger: 'blur'
                }, {
                    pattern: "^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$",
                    message: "请输入正确的手机号",
                    trigger: "blur",
                }],
                pwd: [{
                    required: true,
                    message: '请输入验证码',
                    trigger: 'blur'
                }]
            }
        };
    },
    methods: {
        // 登录提示
        tip(val) {
            if (val == "success") {
                this.$message({
                    message: "登录成功",
                    type: "success",
                });
            } else if (val == "pwd_error") {
                this.$message.error('用户名或密码错误');
            } else {
                this.$confirm('该用户还未注册，是否马上注册?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/register')
                });
            }
        },
        to_regist() {
            this.$router.push("/register");
        },
        to_index() {
            this.$router.push("/index");
        },
        maskHandle(val) {
            this.mask_flag = val
        },
        change() {
            this.common_flag = !this.common_flag;
            this.admin_flag = !this.admin_flag;
            let temp;
            // eslint-disable-next-line prefer-const
            temp = this.active;
            this.active = this.notactive;
            this.notactive = temp;
        },
    },
};
</script>

<style>
.bot {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 1rem;
    width: 300px;
    line-height: 30px;
}

.mask {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgb(78, 74, 74);
    opacity: 0.3;
    z-index: 888;
}
</style>
