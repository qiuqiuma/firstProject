<template>
  <div class="box">
    <div class="box-cart">
      <tit txt="我的购物车"></tit>
      <div class="quanxuan">
        <input @click="checkAll" v-model="all_check" type="checkbox" id="qx" />
        <span class="qx">全选</span>
        <ul class="list_car">
          <li>单价</li>
          <li>数量</li>
          <li>小计</li>
        </ul>
      </div>
      <div class="item_box">
        <div
          v-for="(item, index) in car_msg"
          :class="item.item_style"
          :key="index"
        >
          <input
            type="checkbox"
            @click="isCheck(index)"
            :checked="item.select"
            id="compute"
          />
          <img class="img_src" :src="item.goodsImg" alt="" />
          <div class="shop-content1">
            <a href="#" class="shop-content-font">{{ item.goodsName }}</a
            ><br />
            <span class="shop-content-font" style="color: #6a6a6a">{{
              item.color[0]
            }}</span
            ><br />
            <span class="shop-content-font" style="color: #6a6a6a">{{
              item.parameter[0]
            }}</span
            ><br />
            <!-- <span style="color: #f2752d" class="shop-content-font">优惠活动将在04.22 23:59:59</span> -->
          </div>
          <div class="shop-content1-right">
            <div>
              <span>${{ item.price }}</span
              ><br />
              <span style="color: #6a6a6a; text-decoration: line-through"
                >${{ Number(item.price) + 200 }}</span
              >
            </div>
            <div class="shop-content-button">
              <span>-</span>
              <span>{{ item.number }}</span>
              <span>+</span>
            </div>
            <div>${{ item.number * Number(item.price) }}</div>
          </div>
          <div class="delete" @click="delete_car(index)">
            <i class="el-icon-close"></i>
          </div>
        </div>
        <el-empty
          v-show="car_msg.length == 0 ? true : false"
          description="购物车空空如也"
        >
          <el-button class="gou_btn" @click="gouwu">马上去购物</el-button>
        </el-empty>
      </div>
      <div class="jixu">
        <div class="shop_1">
          <span class="jixugo" @click="gouwu">继续购物></span>
        </div>

        <div class="jixugou-right">
          <div class="one">
            <span
              class="right1"
              style="color: rgb(159, 160, 160); font-size: 14px"
              >商品总数</span
            >
            <span
              class="left1"
              style="color: rgb(159, 160, 160); font-size: 14px"
              >{{ checknum }}</span
            ><br />
          </div>
          <div class="one">
            <span class="right2" style="font-size: 16px">总数</span>
            <span class="left2" style="font-size: 16px">{{
              car_msg.length
            }}</span
            ><br />
          </div>

          <button
            class="button"
            :style="checknum == 0 ? '' :active_btn"
            :disabled="checknum == 0 ? true : false"
            @click="go_order"
          >
            立即下单
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { delete } from 'vue/types/umd';
import tit from "./titile";
import foot from "@/components/foot";
import Foot from "../components/foot.vue";
export default {
  mounted() {
    // 请求购物车数据
    this.$axios({
      url: "/common/disCart",
      params: {
        username: window.localStorage.getItem('username'),
      },
    }).then((val) => {
      console.log("购物", val);
      if (val.data.resMsg != "notFound") {
        // this.car_msg = val.data.data;
        val.data.data.forEach((e) => {
          e.select = false;
          e.item_style = "shop1 animate__animated";
          this.car_msg.push(e);
        });
      } else {
        this.empty = true;
      }
    });
  },
  computed: {
    checknum() {
      let n = 0;
      for(let i = 0;i< this.car_msg.length;i++)
      {
        if(this.car_msg[i].select) n++;

      }
      return n;
    },
    all_check: {
      get() {
        return this.checknum == this.car_msg.length && this.car_msg.length != 0
          ? true
          : false;
      },
      set(val) {
        this.checkAll(val);
      },
    },
  },
  data() {
    let _this = this;
    return {
      empty: false,
      curentIndex: -1,
      active_btn: "background: #ffc915;color:black;",
      all_select: false,
      car_msg: [],
      check_n: 0,
      order_msg: [],
      user:_this.$store.state.user_account,
    };
  },
  methods: {
    // 下单
    go_order() {
      this.order_msg = this.car_msg.filter((e) => {
        if (e.select) return e;
      });
      this.$router.push({
        name: "subOrder",
        params: {
          order_msg: this.order_msg,
          cartFlag:true
        },
      });
    },
    // 删除
    delete_car(index) {
      this.$set(
        this.car_msg[index],
        "item_style",
        "shop1 animate__animated animate__slideOutRight"
      );
      this.$forceUpdate();
      setTimeout(() => {
        this.car_msg.splice(index, 1);
      }, 500);
      this.$axios({
        url: "/common/deleteCart",
        method: "get",
        params: {
          goodsId: this.car_msg[index].goodsId,
        },
      });
      console.log(this.car_msg[index]);
    },
    gouwu() {
      this.$router.push("/product");
    },
    checkAll(val) {
      this.car_msg.forEach((e) => this.$set(e, "select", val));
      this.check_n = this.car_msg.length
      this.$forceUpdate();
    },
    isCheck(index) {
      this.$set(this.car_msg[index], "select", !this.car_msg[index].select);
      this.$forceUpdate();
      if (this.car_msg[index].select) {
        this.check_n++;
      } else {
        this.check_n--;
      }
      // console.log(this.car_msg);
      console.log(this.checknum);
      // if (this.checknum > 0)
      //   this.active_btn = "background: #ffc915;color:black;";
      // else this.active_btn = "";
    },
  },
  components: {
    tit,
    foot,
  },
  Foot,
};
</script>

<style scoped>
.gou_btn {
  background-color: #ffc915;
  color: white;
}
.item_active {
  display: none;
}
.item_box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.button {
  width: 300px;
  color: rgb(146, 150, 150);
  height: 40px;
  border: 0px;
  text-align: center;
  margin-top: 20px;
}
input {
  cursor: pointer;
}
.box {
  width: 100vw;
margin-bottom: 20px;
  background-color: rgb(233, 238, 243);
  padding: 2rem;
}

.nav {
  width: 1369px;
  height: 60px;
  /* border: 3px royalblue solid; */
}

.box-cart {
  margin: 0 auto;
  width: 55%;
  background-color: #ffffff;
  /* border: #000 solid 2px; */
}

.cart {
  line-height: 100px;
  text-align: center;
  font-size: 24px;
  color: #000;
  padding-left: 50px;
}

.quanxuan {
  line-height: 60px;
  width: 100%;
  height: 60px;
  background-color: #fbfbfb;
  /* border: #000 solid 2px; */
  margin-top: 10px;
}

#qx {
  margin-left: 50px;
  width: 20px;
  height: 20px;
}

.qx {
  padding-left: 20px;
}

.list_car {
  color: #000;
  float: right;
}

.quanxuan li {
  list-style-type: none;
  float: left;
  padding-right: 95px;
}
.delete {
  position: absolute;
  right: 1rem;
  line-height: 150px;
  cursor: pointer;
  font-size: 1.2rem;
  display: none;
}
.shop1,
.shop2 {
  /* line-height: 150px; */
  height: 150px;
  /* border: #000 solid 3px; */
}

.shop1 {
  position: relative;
  border-bottom: solid 3px #fbfbfb;
}

#compute,
#erji {
  margin-left: 50px;
  margin-top: 75px;
  width: 20px;
  height: 20px;
  float: left;
}

.shop2 {
  margin-top: 5px;
}

.img_src {
  width: 80px;
  height: 80px;
  margin-left: 20px;
  margin-top: 50px;
  float: left;
  /* border: #000 solid 2px; */
}

.shop-content1,
.shop-content2 {
  height: 100px;
  width: 300px;
  /* border: #000 solid 2px; */
  margin-left: 50px;
  margin-top: 30px;
  float: left;
}

a {
  color: #000;
  text-decoration: none;
}

a:hover {
  color: yellow;
}

.shop-content2 {
  margin-top: 5px;
  margin-top: 50px;
}

.shop-content-font {
  line-height: 20px;
  height: 20px;
}

.shop-content1-right {
  width: 400px;
  display: flex;
  justify-content: space-around;
  /* border: solid 2px red; */
  float: right;
  margin-top: 60px;
  font-size: 14px;
  margin-right: 35px;
}
.shop1:hover .delete {
  display: block;
}
.shop-content1-right > div:nth-child(3) {
  line-height: 38px;
}
.shop-content-font li {
  list-style-type: none;
  float: left;
  padding-right: 70px;
}

.shop-content-button {
  border: solid 1px #8d8c8c;
  font-size: 20px;
  height: 30px;
  width: 70px;
  font-size: 14px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  line-height: 30px;
  /* margin-top: 10px; */
}
.shop-content-button > span {
  cursor: pointer;
}
.jixu {
  /* border: 1px solid green; */
  border-top: solid 10px #fbfbfb;
  padding: 1rem 2rem 3rem 2rem;
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  color: #000;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  /* padding-left: 50px; */
}

.jixugou-right {
  margin-right: 5rem;
  height: 100px;
  width: 300px;
  margin-top: 30px;
  font-size: 14px;
}

.right1 {
  width: 20px;
  height: 15px;
  /* border: solid 2px blue; */
}

.left1 {
  float: right;
  width: 20px;
  height: 15px;
  /* border: solid 2px blue; */
}

.right2 {
  width: 20px;
  height: 15px;
  /* border: solid 2px blue; */
}

.left2 {
  float: right;
  width: 20px;
  height: 15px;
}

.one {
  margin-bottom: 15px;
}

.shop_1 {
  width: 150px;
  height: 50px;
  /* border: solid 1px yellow; */
  float: left;
  margin-left: 30px;
}

.shop_1 span {
  font-size: 15px;
  position: relative;
}
</style>
