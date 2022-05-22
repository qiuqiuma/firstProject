<template>
<div class="login">
    <el-form :model="form" ref="form" style="margin-top: 2rem" :rules="rule">
        <el-form-item prop="userAcount" :class="yanz_style">
            <el-popover placement="top" title="友情提示" width="100" trigger="manual" :content="null_tip" v-model="visible">
                <el-input slot="reference" placeholder="请输入手机号" v-model="form.userAcount" class="input-with-select">
                    <el-select style="width: 80px" v-model="select" slot="prepend" placeholder="+86">
                        <el-option label="+86" value="1"></el-option>
                        <el-option label="+123" value="2"></el-option>
                        <el-option label="+456" value="3"></el-option>
                    </el-select>
                </el-input>
            </el-popover>

            <!-- <el-input v-model="form.userAcount"></el-input> -->
        </el-form-item>
        <el-form-item prop="pwd">
            <div style="display: flex">
                <el-input v-model="form.pwd" placeholder="请输入验证码"></el-input>
                <input type="button" :value="yan_txt" style="
              background-color: #ffc915;
              margin-left: 1.5rem;
              width: 130px;
              border-radius: 10px;
              border: 0;
              cursor: pointer;
            " @click="yanZ" :disabled="yan_dis" :style="wait" />
            </div>
        </el-form-item>
        <el-form-item>
            <input type="button" class="login_btn" value="登录" @click="to_login_common" />
            <!-- <button  ></button> -->
        </el-form-item>
        <el-form-item>
            <div class="login_botm">
                <span>隐私政策</span>
                <span @click="$emit('regist')" style="color:#ffc915;cursor: pointer;">注册账号</span>
            </div>
        </el-form-item>
    </el-form>
    <div class="hua_box animate__animated animate__flipInX" v-if="hua">
        <div class="close" @click="close">x</div>
        <drag-verify-img-chip class="hua_c" ref="dragVerify" :imgsrc="require('../assets/img/lun1.jpg')" :isPassing.sync="isPassing" :width="400" :showRefresh="true" text="请按住滑块拖动" successText="验证通过" handlerIcon="el-icon-d-arrow-right" successIcon="el-icon-circle-check" @refresh="reimg" @passcallback="pass">
        </drag-verify-img-chip>
    </div>
</div>
</template>

<script>
export default {
    props: ["rule"],
    created() {
        this.b_rules = this.rule;
        console.log("common:", this.rule);
        // this.b_rules.userAcount.push({
        //     pattern: "^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$",
        //     message: "请输入正确的手机号",
        //     trigger: "blur",
        // });
    },
    data() {
        return {
            null_tip: "",
            visible: false, //手机号为空提示
            yanz_style: "",
            wait: "",
            yan_dis: false,
            yan_txt: "获取验证码",
            isPassing: false,
            hua: false, //滑块验证
            select: "",
            username: "",
            pwd: "",
            form: {
                userAcount: "",
                pwd: "",
            },
            b_rules: {},
        };
    },

    methods: {
        reimg() {},
        pass() {
            this.close();
            this.isPassing = false;
            this.wait = "background-color: rgb(231, 225, 225);";
            let n = 5;
            this.yan_dis = true;
            this.$axios({
                url: "/common/yanz",
                method: "post",
                data: {
                    phone: this.form.userAcount
                }
            }).then(res => {
                this.$notify({
                    title: '验证码',
                    message: res.data,
                    duration: 2000
                });
            })
            let t = setInterval(() => {
                if (n == 0) {
                    this.yan_dis = false;
                    this.wait = "";
                    this.yan_txt = "获取验证码";
                    clearInterval(t);
                    // console.log(this.yan_txt);
                } else {
                    this.yan_txt = `${n}s`;
                }
                --n;
            }, 1000);
        },
        // 获取验证码
        yanZ() {
            let reg = new RegExp("^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$");
            if (this.form.userAcount == "") {
                this.null_tip = "手机号不能为空"
                this.visible = true;
                this.yanz_style = "animate__animated animate__shakeX";
                setTimeout(() => {
                    this.yanz_style = "";
                }, 800);
                setTimeout(() => {
                    this.visible = false;
                }, 2000);
            } else if (!reg.test(this.form.userAcount)) {
                this.yanz_style = "animate__animated animate__shakeX";
                setTimeout(() => {
                    this.yanz_style = "";
                }, 800);
            } else {
                this.hua = true;
                this.$emit("mask", true);
            }
        },
        close() {
            this.hua = false;
            this.$emit("mask", false);
        },
        // 登录
        to_login_common() {
            let param = new URLSearchParams()
            param.append('username', this.form.userAcount)
            param.append('password', this.form.pwd)
            this.$refs.form.validate().then(() => {
                this.$axios({
                    method: "post",
                    url: "/common/phoneLogin",
                    data:param
                }).then((res) => {
                    this.$emit('tip',res.data.resMsg)
                    let resObj = res.data.data;
                    if (res.data.resMsg == "success") {
                        // this.$message({
                        //     message: '登录成功',
                        //     type: 'success'
                        // });
                        window.localStorage.setItem('token',res.data.token)
                         this.$store.commit({
                                type: "setUserMsg",
                                nickname: resObj.nickName,
                                head_img: resObj.headImg,
                                user_account: resObj.userName,
                                loginFlag: true,
                            });
                        this.$router.push("/index")
                    }
                    // else{
                    //      this.$message.error('验证码错误，请稍后重试');
                    // }
                });
            });

            // this.$router.push('./public/项目/html/person.html')
        },
    },
};
</script>

<style scoped>
.close {
    font-size: 1.5rem;
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    height: 40px;
    cursor: pointer;
    box-sizing: border-box;
}

.el-select {
    width: 80px;
}

.hua_box {
    display: flex;
    flex-direction: column;
    z-index: 999;
    border-radius: 10px;
    width: 450px;
    height: 260px;
    position: fixed;
    top: 35%;
    left: 38%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
}
</style>
