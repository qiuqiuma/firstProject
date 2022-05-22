<template>
  <div class="box">
    <adress></adress>
    <div id="banner1">
      <table>
        <tr>
          <td>
            <a href="#">快递配送</a>
            <img src="../assets/img/dault.png" alt="?" />
          </td>
        </tr>
        <tr>
          <!-- <td></td> -->
        </tr>
        <tr>
          <td>
            <a href="#" class="text_small">现在付款，预计4月30日-5月2日送达</a>
          </td>
        </tr>
      </table>
    </div>
    <div id="banner2">
      <div class="banner2_main" v-for="(item, index) in order" :key="index">
        <!-- 左边-->
        <div class="banner2_left">
          <div>
            <img :src="item.goodsImg" alt="" />
          </div>
          <div class="left_txt">
            <span>{{ item.goodsName }}</span>
            <span>{{ item.color[0] }}</span>
            <span>{{ item.parameter[0] }}</span>
          </div>
        </div>
        <!-- 右边-->
        <div class="banner2_right">
          <div style="margin-top: 25px">
            <span class="price_small">${{ Number(item.price) + 200 }}</span
            ><br />
            <span>${{ item.price }}</span>
          </div>
          <div style="line-height: 84px">x{{ item.number }}</div>
          <div style="line-height: 84px">
            ${{ Number(item.price) * item.number }}
          </div>
        </div>
      </div>
    </div>
    <div id="banner3">
      <div><a href="#">优惠券</a></div>
      <div><img src="../assets/img/to_right.png" alt="" /></div>
    </div>
    <div id="banner4">
      <table>
        <tr>
          <td colspan="3"><a href="#">其他</a></td>
        </tr>
        <tr>
          <td><input type="radio" />花呗分期</td>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <td>
            <a href="#" class="text_small">什么是花呗分期？</a>
          </td>
        </tr>
      </table>
    </div>
    <div id="banner5">
      <table>
        <tr>
          <td colspan="2">
            <a href="#">电子发票</a>
            <img src="../assets/img/dault.png" alt="?" />
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td>
            <input type="radio" name="r" id="1" class="radio" />个人
            <input type="radio" name="r" id="2" class="radio" />公司
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td colspan="2">
            <input
              type="text"
              placeholder="请输入个人姓名或公司名称"
              class="input"
            />
          </td>
        </tr>
      </table>
    </div>
    <div id="banner6">
      <table>
        <tr>
          <td><a href="#" class="text_small">商品数量</a></td>
          <td class="text_r">
            <a href="#" class="text_small">{{ order.length }}</a>
          </td>
        </tr>
        <tr>
          <td><a href="#" class="text_small">商品总额</a></td>
          <td class="text_r">
            <a href="#" class="text_small">￥{{ total }}</a>
          </td>
        </tr>
        <tr>
          <td><a href="#" class="text_small">优惠金额</a></td>
          <td class="text_r"><a href="#" class="text_small">-￥0</a></td>
        </tr>
        <tr>
          <td><a href="#" class="text_small">邮费</a></td>
          <td class="text_r">
            <a href="#" class="text_small">￥{{ order.length * 12 }}</a>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <hr />
          </td>
        </tr>
        <tr>
          <td><a href="#" class="text_small">应付：</a></td>
          <td class="text_r">
            <a href="#" class="text_big">￥{{ total +order.length * 12 }}</a>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <input type="button" value="去付款" class="topay" @click="topay" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import foot from "@/components/foot";
import adress from "@/views/adress";
export default {
  computed: {
    total() {
      let sum = 0;
      for (let i = 0; i < this.order.length; i++) {
        sum += Number(this.order[i].price) * this.order[i].number;
      }
      return sum;
    },
    // 获取当前时间
    nowTime() {
      let date = new Date();
      let year = date.getFullYear();
      let Month = Number(date.getMonth()) + 1;
      Month = Month > 10 ? Month : "0" + Month;
      let day =
        Number(date.getDate()) >= 10 ? date.getDate() : "0" + date.getDate();
      let Hours =
        Number(date.getHours()) >= 10 ? date.getHours() : "0" + date.getHours();
      let Minutes =
        Number(date.getMinutes()) >= 10
          ? date.getMinutes()
          : "0" + date.getMinutes();
      let Seconds =
        Number(date.getSeconds()) >= 10
          ? date.getSeconds()
          : "0" + date.getSeconds();
      return `${year}-${Month}-${day} ${Hours}:${Minutes}:${Seconds}`;
    },
    // 生成订单编号
    orderCode() {
      var orderCode = "";
      for (var i = 0; i < 6; i++) {
        orderCode += Math.floor(Math.random() * 10);
      }
      return new Date().getTime() + orderCode; //时间戳，用来生成订单号。
    },
  },
  created() {
    console.log(this.$route);
    this.order = this.$route.params.order_msg;
    this.cartFlag = this.$route.params.cartFlag;
  },
  data() {
    return {
      order: [],
      cartFlag:false
    };
  },
  methods: {
   async topay() {
      this.$router.push("/result");
      for (let i = 0; i < this.order.length; i++) {
      await  this.http.get({
          url: "/common/addOrder",
          params: {
            username: this.$store.state.user_account,
            goodsId: this.order[i].goodsId,
            parameter: this.order[i].parameter[0],
            orderTime: this.nowTime,
            orderNumber: this.orderCode,
            color: this.order[i].color[0],
            number: this.order[i].number,
          },
        });
        console.log("是否删除购物车",this.cartFlag)
        if (this.cartFlag) {
         await this.http.get({
            url: "/common/deleteCart",
            params: {
              goodsId: this.order[i].goodsId,
            },
          });
        }
      }
    },
  },
  components: {
    foot,
    adress,
  },
};
</script>

<style scoped>
.banner2_main,
.left_txt,
.banner2_right,
.banner2_left {
  display: flex;
  justify-content: space-between;
}

.banner2_left {
  width: 200px;
}

.banner2_right {
  width: 400px;
  height: 84px;
  vertical-align: bottom;
}

.banner2_main {
  width: 100%;
  border-bottom: 1px solid #c4baba;
  padding: 2rem 0;
}

.left_txt {
  flex-direction: column;
}

.box {
  width: 100vw;
  padding-bottom: 20px;
  background-color: rgb(233, 238, 243);
}

* {
  margin: 0;
  padding: 0;

  font-size: 15px;
}

a {
  text-decoration: none;
  color: black;
  background-color: white;
}

#banner1,
#banner2,
#banner3,
#banner4,
#banner5,
#banner6 {
  width: 60%;
  background-color: white;
  margin: 10px auto;

  border-radius: 3px;
}

table {
  margin-left: 40px;
  background-color: white;
  margin-right: 40px;
}

table td {
  background-color: white;
}

.text_small {
  font-size: 13px;
  color: #6e6e6e;
  display: block;
  font-weight: normal;
}

#banner1 {
  height: 100px;
  display: flex;
  align-items: center;
}

#banner1 img {
  width: 15px;
  height: 15px;
  background-color: white;
}

#banner2 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  box-sizing: border-box;
}

#banner2 img {
  width: 80px;
  height: 80px;
}

.price_small {
  font-size: 12px;
  color: #6e6e6e;
  text-decoration: line-through;
  font-weight: normal;
  margin-left: 3px;
}

.price {
  font-size: 13px;
}

#banner3 {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#banner3 div {
  margin-left: 40px;
  margin-right: 40px;
  background-color: white;
}

#banner3 img {
  width: 15px;
  height: 15px;
  background-color: white;
}

#banner4 {
  height: 100px;
  display: flex;
  align-items: center;
}

#banner5 {
  height: 150px;
  display: flex;
  align-items: center;
}

#banner5 img {
  width: 15px;
  height: 15px;
  background-color: white;
}

.radio {
  margin-top: 5px;
  background-color: white;
}

.input {
  width: 350px;
  height: 30px;
  background-color: white;
  border: 1px solid #8a8a8a;
  border-radius: 2px;
  margin-top: 5px;
}

#banner6 {
  height: 250px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.text_r {
  text-align: right;
  padding-left: 100px;
}

.text_big {
  font-size: 18px;
  font-weight: bold;
}

.topay {
  background-color: #f3bf23;
  width: 100%;
  border: none;
  height: 38px;
  margin-top: 10px;
  border-radius: 2px;
  font-size: 14px;
}
</style>
