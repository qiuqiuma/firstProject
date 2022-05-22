<template>
  <div
    class="box"
    style="
      width: 100%;
      margin: 1rem auto;
      background-color: #fff;
      padding: 2rem;
    "
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      style="padding: 2rem; width: 65%"
    >
      <div class="tpBox">
        <el-form-item prop="name">
          <el-input placeholder="姓名(必填)" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            style="width: 350px"
            placeholder="手机号(必填)"
            v-model="form.phone"
          ></el-input>
        </el-form-item>
      </div>

      <!-- <el-form-item prop="adress">-->
      <!--<area-cascader style="line-height:20px;width:100%;" :level="1" type="all" placeholder="请选择地区(必填)" v-model='form.address' :data="pcaa"></area-cascader>-->
      <area-select
        style="
          line-height: 20px;
          width: 100%;
          padding-left: 5rem;
          margin-bottom: 1rem;
        "
        v-model="form.adress"
        type="text"
        :level="2"
        :data="pcaa"
      ></area-select>

      <!--</el-form-item>-->
      <el-form-item prop="detailed">
        <el-input
          placeholder="详细地址(必填)"
          v-model="form.detailed"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="邮政编码(选填)" v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item class="bottom_box">
        <el-button @click="quxiao">取消</el-button>
        <el-button @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "vue-area-linkage/dist/index.css";
import { pca, pcaa } from "area-data";
// import res from '../util/adress'
import axios from "axios";
// console.log(res)
export default {
  props: ["adress_msg"],
  created() {
    if (this.adress_msg) {
      console.log("数据：", this.adress_msg);
      this.form.name = this.adress_msg.name;
      this.form.phone = this.adress_msg.phone;
      this.form.code = this.adress_msg.zipCode;
      this.form.detailed = this.adress_msg.detailedAdress;
      this.form.adress[0] = this.adress_msg.province;
      this.form.adress[1] = this.adress_msg.city;
      this.form.adress[2] = this.adress_msg.county;
    }

    // this.name = this.adress_msg.name
  },
  data() {
    return {
      pca: pca,
      pcaa: pcaa,
      str:"",
      form: {
        name: "", // 姓名
        phone: "", // 电话
        adress: [], // 大概地址
        detailed: "", // 详细地址
        code: "", // 邮编
      },
      // 验证
      rules: {
        name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入您的联系电话", trigger: "blur" },
          {
            pattern:
              "^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$",
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        adress: [
          {
            required: true,
            message: "请选择地址",
            trigger: "blur",
          },
        ],
        detailed: [
          {
            required: true,
            message: "请填写您的详细地址信息",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form
        .validate()
        .then(() => {
          console.log(this);
           this.str = ""
           for (let i = 0; i < 3; i++) {
              this.str += this.form.adress[i];
            }
            this.str += this.form.detailed;
          //判断是添加地址还是更新地址
          if (!this.adress_msg) {
            
            // 拼接地址
           
            this.$axios({
              url: "/common/addAdress",
              method: "get",
              params: {
                username: this.$store.state.user_account,
                name: this.form.name,
                phone: this.form.phone,
                adress: this.str,
                zipCode: this.form.code,
                detailedAdress: this.form.detailed,
                province: this.form.adress[0],
                city: this.form.adress[1],
                county: this.form.adress[2],
              },
            }).then((res) => {
              if (res.data == "success") {
                this.$message({
                  message: "地址添加成功",
                  type: "success",
                });
                this.$emit("cansle");
              } else {
                this.$message.error("地址添加失败");
              }
            });
          } else {
            this.http.get({
              url: "/common/upAdress",
              params: {
                adressId: this.adress_msg.adressId,
                name: this.form.name,
                phone: this.form.phone,
                adress: this.str,
                zipCode: this.form.zipCode,
                province: this.form.adress[0],
                city: this.form.adress[1],
                county: this.form.adress[2],
                detailedAdress: this.form.detailed,
              },
            }).then(()=> {
              this.$emit("cansle")
              this.$message({
                  message: "地址修改成功",
                  type: "success",
                });
            } )
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    quxiao() {
      this.$emit("cansle");
    },
  },
};
</script>

<style scoped>
.box {
  box-sizing: border-box;
}
.el-input__inner {
  height: 10rem;
}
.tpBox {
  display: flex;
  justify-content: space-between;
}

.bottom_box .el-button {
  width: 180px;
}

.bottom_box .el-button:nth-child(1):hover {
  background-color: rgb(15, 14, 14);
  color: white;
}

.bottom_box .el-button:nth-child(2) {
  background-color: #ffc915;
}

.bottom_box .el-button:nth-child(2):hover {
  background-color: #daab12;
  color: black;
}

.el-form-item {
  padding-left: 10px;
}
</style>
