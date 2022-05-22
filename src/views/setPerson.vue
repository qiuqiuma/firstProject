<template>
  <div class="center" v-loading.fullscreen.lock="loading">
    <div class="head" v-if="head">
      <div class="tx">头像</div>
      <!-- <div class="k">  </div>-->
      <el-upload
        :on-success="handleAvatarSuccess"
        style="display: flex; justify-content: space-between"
        action="#"
        :show-file-list="false"
   
        :http-request="uphead"
      >
        <img :src="$store.state.head_img" /><i class="el-icon-arrow-right"></i>
      </el-upload>
    </div>
    <div class="head">
      <div class="nc">昵称</div>

      <div class="k" @click="open">
        <div class="in_name">{{ $store.state.nickname }}</div>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>

    <div class="tips">
      <span>用于在手机上“游戏登录”、“软件商店”等应用评论或发帖时展示。</span>
    </div>

    <div class="head">
      <div class="nc">姓名</div>

      <div class="k">
        <div class="in_name">马总</div>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="head">
      <div class="nc">性别</div>

      <div class="k">
        <div class="in_name">男</div>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>

    <div class="tips">
      <span
        >姓名、性别他人不可见，完善个人信息有助于为您提供贴心的个性化服务</span
      >
    </div>
    <el-dialog
      title="同户名"
      :visible.sync="centerDialogVisible"
      width="30%"
      top="30vh"
      center
    >
      <div class="d_box">
        <input type="text" v-model="input_val" />
        <span class="txt">用户名为2-18位字母、数字或汉字</span>

        <el-button type="primary" class="btn1" @click="btn('enter')"
          >确定</el-button
        >
        <el-button plain @click="btn('enter')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    let _this = this;
    return {
       userimg: _this.$store.state.head_img,
      loading: false,
      head: true,
      centerDialogVisible: false,
      nickname: _this.$store.state.nickname,
      input_val: _this.$store.state.nickname,
    };
  },
  methods: {
    handleAvatarSuccess() {
      this.loading = false;
      this.$router.go(0);
    },
    open() {
      this.centerDialogVisible = true;
    },
    btn(flag) {
      this.centerDialogVisible = false;
      if(flag == "enter")
      {
        
        this.http.get({
          url:"/common/nickname",
          params:{
            username:this.$store.state.user_account,
            nickname:this.input_val
          }
        }).then(()=>{
          this.$message({
                  message: "昵称修改成功",
                  type: "success",
                });
          this.$store.commit({
            type:"setUserMsg",
            nickname:this.input_val
          })
        })
      }
      
    },
    uphead(f){
       let formData = new FormData()
      formData.append('file', f.file)
      formData.append('username', this.$store.state.user_account)
      this.$axios({
        method: 'post',
        url: '/common/upHead',
        data:formData
      }).then(res =>{
           //上传成功之后 显示图片
          this.$message({
                  message: "头像上传成功",
                  type: "success",
                });
          this.$store.commit({
            type:"setUserMsg",
            head_img:res.data
          })
        //  this.userimg = res.data
      })
    }
  },
};
</script>

<style scoped>
.txt {
  display: inline-block;
  margin: 0.5rem 0 0.8rem 0;
  color: #a7a6a3;
  font-size: 13px;
}
.d_box {
  text-align: center;
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.d_box > input {
  width: 70%;
  height: 40px;
  outline: none;
  border-radius: 10px;
  margin: 0 auto;
  border: 0;
  background-color: rgb(243 241 241);
  text-indent: 2rem;
}
.el-button {
  width: 70%;
  margin: 0 auto;
}
.btn1 {
  margin: 0.5rem auto;
  border: 0;
  background-color: #ffc915;
}
.center {
  width: 50%;
  font-size: 1rem;
  margin: 200px auto;
}

.head {
  cursor: pointer;
  height: 70px;
  width: 100%;
  position: relative;
  border-bottom: 1px gainsboro solid;
  display: flex;
  justify-content: space-between;
  line-height: 70px;
  margin: 2rem 0;
}
.head .el-icon-arrow-right {
  line-height: 70px;
  margin: 0 0.6rem;
}
.head img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  vertical-align: middle;
}

.head .k {
  display: flex;
  font-size: 1rem;
}

.nickname {
  height: 50px;
  width: 100%;

  margin-top: 20px;
  border-bottom: 1px gainsboro solid;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.nickname .nc {
  /* height: 100px;
    width: 200px; */

  font-size: 13px;

  margin-left: 10px;
}

.nickname .k2 {
  color: gainsboro;
  width: 10px;
  /* margin-left: 770px; */
  margin-left: 10px;
}

.tips span {
  font-size: 12px;
  color: rgb(167, 159, 159);
}

.tips {
  margin-top: 7px;
  margin-left: 10px;
}


</style>