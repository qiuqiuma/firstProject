<template>
  <div>
    <!-- 购物区 -->
    <div :class="join_car_class">
      <span
        class="iconfont9 icon-duigou"
        style="color: #ffff99; font-size: 1.6rem"
      ></span>
      加入购物车成功！
    </div>
    <!-- 版心 -->

    <div class="shopping_center">
      <div class="shop_left">
        <!-- 图片·区 -->
        <div class="shop_big_img">
          <img :src="shang_msg.goodsImg" />
        </div>
        <!-- 缩略图 -->
        <div class="shop_small_img">
          <div><img :src="shang_msg.goodsImg" alt="" /></div>
          <div><img :src="shang_msg.goodsImg" alt="" /></div>
          <div><img :src="shang_msg.goodsImg" alt="" /></div>
          <div><img :src="shang_msg.goodsImg" alt="" /></div>
        </div>
      </div>
      <!-- 右边参数选择区 -->
      <div class="shop_right">
        <!-- 名称价格 -->
        <div class="shop_r_top">
          <!-- 名称 -->
          <h1 style="font-size: 2rem">{{ shang_msg.goodsName }}</h1>
          <!-- 价格 -->
          <div class="price_box">
            <div class="price">
              <span>{{ shang_msg.price }}</span>
              <span>{{ Number(shang_msg.price) + 100 }}</span>
            </div>
            <!-- 倒计时 -->
            <div class="dao_jishi">
              <span>距活动结束：</span>
              <div class="dao_box">
                <span>0{{ h }}</span>
                <span>:</span>
                <span>{{ m }}</span>
                <span>:</span>
                <span>{{ s }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 发货  换新等.... -->
        <div class="shop_txt">
          <!-- 发货 -->
          <div>
            <span>发&nbsp;&nbsp;&nbsp;&nbsp;货</span>
            <span>&nbsp;&nbsp;支付成功后，48小时内发货</span>
          </div>
          <!-- 换新 -->
          <div>
            <span>换&nbsp;&nbsp;&nbsp;&nbsp;新</span>
            <span>&nbsp;&nbsp;以旧换新 至高额外返现300元 立即参与 </span>
          </div>
          <!-- 分期 -->
          <div>
            <span>分&nbsp;&nbsp;&nbsp;&nbsp;期</span>
            <span>&nbsp;&nbsp;享6期免息</span>
          </div>
        </div>
        <!-- 七天无理由 -->
        <div class="shop_wuliy">
          <span class="iconfont icon-jinri">7天无理由</span>
          <span class="iconfont3 icon-baohu">安全支付</span>
          <span class="iconfont1 icon-huabei">花呗分期</span>
        </div>
        <!-- 颜色 -->
        <div class="shop_can">
          <!-- 标题 -->
          <span style="font-size: 1.2rem">颜色</span>

          <ul class="color_list">
            <li
              v-for="(item, index) in shang_msg.color"
              ref="color"
              @click="shop_can(index, 'color')"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <!-- 版本 -->
        <div class="shop_can2" v-show="banBen">
          <!-- 标题 -->
          <span style="font-size: 1.2rem">版本</span>

          <ul class="color_list">
            <li
              v-for="(item, index) in shang_msg.parameter"
              ref="parameter"
              @click="shop_can(index, 'parameter')"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <!-- 数量 -->
        <div class="shop_num">
          <!-- 标题 -->
          <span style="font-size: 1.2rem">数量</span>
          <div class="num_count">
            <span @click="reduce" style="font-size: 1.5rem">-</span>
            <span>{{ number }}</span>
            <span @click="add" style="font-size: 1.5rem">+</span>
          </div>
        </div>
        <!-- 购买 加入购物车 -->
        <div class="shop_buy">
          <!-- 版心 -->
          <div class="buy_center">
            <!-- 购买参数 -->
            <div class="buy_canshu">
              <span>{{ phone_color }}</span>
              <span>{{ n_cun }}</span>
              <span>x{{ number }}</span>
              <span>￥{{ Number(this.shang_msg.price) + total }}</span>
            </div>
            <!-- 总计 -->
            <div class="buy_tal">
              <span>总计：</span>
              <span>￥{{ allPrice }}</span>
            </div>
            <!-- 加入购物车 购买 -->
            <div class="join_car">
              <!-- 加入购物车 -->
              <div class="join_c" @click="join_tip">加入购物车</div>
              <!-- 购买 -->
              <div class="buy_m" @click="to_buy">立即购买</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    allPrice() {
      return this.number * (Number(this.shang_msg.price) + this.total);
    },
    banBen() {
      return this.shang_msg.parameter == null ? false : true;
    },
  },
  mounted() {
    let type = this.$route.query.type;
    let goodsId = this.$route.query.goodsId;
    console.log(goodsId);
    this.http
      .get({
        url: "/goodsmsg",
        params: {
          goodsId,
        },
      })
      .then((res) => {
        //  console.log(res.data)
        this.shang_msg = res.data[0];
        this.phone_color = res.data[0].color[0];
        if (res.data[0].parameter != null)
          this.n_cun = res.data[0].parameter[0];
      });
    this.old_tal = this.total;
    this.price_d = Number(this.old_tal);
    this.number = 1;
    // this.phone_color = this.shang_msg.color[0]
    console.log(this.shang_msg);
    let dao_1 = document.querySelectorAll(".dao_box>span");
    clearInterval(this.time);
    this.time = setInterval(() => {
      dao_1[4].innerText = this.s > 9 ? this.s : "0" + this.s;
      if (this.s <= 0) {
        this.s = 60;
        this.m--;
      }
      this.s--;
    }, 1000);
  },
  data() {
    return {
      shang_msg: {},
      number: 1,
      n_cun: "",
      phone_color: "",
      total: 0,
      old_tal: 0,
      price_d: 0,
      //    倒计时
      h: 3,
      m: 45,
      s: 10,
      time: null,
      // 加入购物车提示
      join_car_class: "join_car_tip",
      join_tim: null,
    };
  },
  methods: {
    shop_can(index, flag) {
      this.number = 1;
      function clear_style(arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i].style.border = "1px dashed rgb(192, 188, 188)";
        }
      }
      let neiCun = this.$refs.parameter;
      let Color = this.$refs.color;
      if (flag == "parameter" && neiCun != undefined) {
        this.total = index * 200;
        clear_style(neiCun);
        this.n_cun = neiCun[index].innerText;
        neiCun[index].style.border = "2px dashed black";
      } else {
        clear_style(Color);
        this.phone_color = Color[index].innerText;
        Color[index].style.border = "2px solid black";
      }
    },
    // 数量减少
    reduce() {
      if (this.number == 1) {
        this.number = 1;
      } else {
        this.number--;
      }
      this.count();
    },
    // 数量增加
    add() {
      this.number++;
      this.count();
    },
    // 计算总价
    count() {
      // this.total = this.number * Number(this.singlePrice);
    },
    // 加入购物车成功提示
    join_tip() {
      // 判断是否登录
      if (this.$store.state.loginFlag) {
        (this.join_car_class = "join_car_tip join_cg"),
          clearInterval(this.join_tim);
        this.join_tim = setInterval(() => {
          this.join_car_class = "join_car_tip";
        }, 1200);
        this.$axios({
          url: "/common/addCart",
          method: "get",
          params: {
            goodsId: this.$route.query.goodsId,
            username: this.$store.state.user_account,
            color: this.phone_color,
            parameter: this.n_cun,
            number: this.number,
          },
        });
      } else {
        this.$router.push("/login");
      }
    },
    // 购买
    to_buy() {
      if (!this.$store.state.loginFlag) this.$router.push("/login");
      else {
        this.$router.push({
          name: "subOrder",
          params: {
            order_msg: [
              {
                goodsId: this.$route.query.goodsId,
                price:this.shang_msg.price,
                goodsImg:this.shang_msg.goodsImg,
                goodsName: this.shang_msg.goodsName,
                color:[this.phone_color] ,
                parameter:[this.n_cun] ,
                number: this.number,
              },
            ],
          },
        });
      }
    },
  },
};
</script>

<style>
@import url("../assets/css/shopping.css");
</style>
