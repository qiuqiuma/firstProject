<template>
<div class="box">
    <!-- <BgAnimate></BgAnimate> -->
   <LineCanvas :canvasWidth="canvasWidth" 
                  :canvasHeight="canvasHeight"
                  :dotsNum="dotsNum"
                  :isColor="isColor" style=" position: absolute;z-index:4">
    </LineCanvas>
    <el-form style="position: relative;z-index:5" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item>
            <div class="reTxt">注册账户</div>
        </el-form-item>
        <el-form-item prop="age">
            <el-input v-model="ruleForm.age" placeholder="请输入注册的手机号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
            <el-input v-model="ruleForm.nickname" placeholder="昵称：取个昵称吧" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
            <el-input show-password type="password" v-model="ruleForm.pass" placeholder="请输入密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input show-password type="password" v-model="ruleForm.checkPass" placeholder="再次确认密码" autocomplete="off"></el-input>
        </el-form-item>
        <div class="last_item">
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        </div>
    </el-form>

</div>
</template>

<script>
import BgAnimate from '@/components/BgAnimate'
import Partivleground from 'vue-particleground'
import LineCanvas from 'vue-line-canvas';
export default {

    data() {
        var checkAge = (rule, value, callback) => {
            let reg = new RegExp("^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$");
            if (value === "") {
                return callback(new Error("账号不能为空"));
            } else if (!reg.test(value)) {
                return callback(new Error("请输入正确的手机号"));
            } else {
                callback();
            }

        };
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (value.length < 6) {
                callback(new Error("密码长度为6位以上"));
            } else {
                if (this.ruleForm.checkPass !== "") {
                    this.$refs.ruleForm.validateField("checkPass");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        var checkNick = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请填写你的昵称"));
            } else {
                callback();
            }
        };
        return {
            canvasWidth: window.innerWidth, // canvas width
            canvasHeight: window.innerHeight, // canvas height
            dotsNum: 50, // dot number
            isColor: true, // is color
            ruleForm: {
                pass: "",
                checkPass: "",
                age: "",
                nickname: ""
            },
            rules: {
                pass: [{ validator: validatePass, trigger: "blur" }],
                checkPass: [{ validator: validatePass2, trigger: "blur" }],
                age: [{ validator: checkAge, trigger: "blur" }],
                nickname: [{ validator: checkNick, trigger: "blur" }],
            },
        };
    },
    methods: {
        submitForm(formName) {
            let _this = this;
            this.$refs.ruleForm.validate((valid) => {
                if (!valid) {
                    console.log("error submit!!");
                } else {
                    // console.log('error submit!!');
                    // return false;
                    //       console.log(46497)
                    //    alert('submit!');
                    var params = new URLSearchParams();
                    params.append("username", `${this.ruleForm.age}`);
                    params.append("password", `${this.ruleForm.pass}`);
                    params.append("nickName", `${this.ruleForm.nickname}`);
                    this.$axios({
                        url: "/common/regist",
                        method: "post",
                        data: params,
                    }).then((val) => {
                        if (val.data.single != "success") {
                            this.$message.error(val.data.msg);
                        } else {
                            this.$message({
                                message: val.data.msg,
                                type: "success",
                            });
                            setTimeout(() => {
                                this.$router.push("/login");
                            }, 500)
                        }

                    });
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
    components: {
        Partivleground,
        LineCanvas
    }
};
</script>

<style scoped>
.box {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgb(233, 227, 227);
   
}

.el-form {
    width: 400px;
    margin: 10% auto;
    background-color: #fff;
    border-radius: 20px;
    padding: 0 100px 50px 0;
}

.reTxt {
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    padding: 2rem;
    box-sizing: border-box;
}

.last_item {
    display: flex;
    margin-left: 100px;

    justify-content: space-around;
}
</style>
