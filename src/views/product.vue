<template>
  <div>
    <header class="phone_head">
      <img src="../assets/img/phone.jpg" alt="" />
    </header>
    <div :class="to_top" @click="hui_top">
      <span
        id="icon"
        class="iconfont icon-xiangyou1"
        style="font-size: 2rem; color: white"
      >
      </span>
    </div>
    <!-- 版心 -->
    <div class="phone_box">
      <div class="phone_center">
        <div class="phone_center_top">
          <a href="#">全部商品</a>
          <a href="#shou_ji">手机</a>
          <a href="#pei_jian">配件&周边</a>
        </div>
        <!-- 商品区 -->
        <a id="shou_ji">
          <ul class="phone_list">
            <li v-for="(item, index) in phone_msg" :key="index" ref="productList" @click="toShop(index,'phone')">
              <div class="list_main">
                <div class="phone_img" :key="item.goodsImg">
                  <img v-lazy="item.goodsImg" />
                </div>
                <div class="phone_price">
                  <span>{{ item.goodsName }}</span>
                  <span>￥{{ item.price }}</span>
                </div>
              </div>
            </li>
          </ul>
        </a>
        <!-- 配件 周边 -->

        <div class="pei_box">
          <!-- 广告 -->
          <div class="pei_banner">
            <img src="../assets/img/watch/banner_watch.jpg" />
          </div>
          <!-- 商品区 -->
          <a id="pei_jian">
            <ul class="phone_list">
              <li v-for="(item, index) in pei_data" :key="index" @click="toShop(index,'watch')">
                <div class="list_main">
                  <div class="phone_img">
                    <img v-lazy="item.goodsImg" :key="item.goodsImg">
                  </div>
                  <div class="phone_price">
                    <span>{{ item.goodsName }}</span>
                    <span>￥{{ item.price }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import foot from "../components/foot";
export default {
  activated() {
    let list = document.querySelectorAll(".phone_list li .list_main");
    for (let i = 0; i < list.length; i++) {
      list[i].addEventListener("click", () => {
        this.shop_msg.src = list[i].childNodes[0].childNodes[0].src;
        this.shop_msg.name = list[i].childNodes[2].childNodes[0].innerText;
        this.shop_msg.price = list[i].childNodes[2].childNodes[2].innerText;
        //  当点击是获取当前点击的一些属性
        // 通过路由传参到商品详情页面
        this.$router.push({
          path: "/shop",
          query: {
            name: this.shop_msg.name,
            src: this.shop_msg.src,
            price: this.shop_msg.price,
          },
        });

        // console.log(this.shop_msg.name)
      });
    }
  },
  created() {
    // 获取商品信息
   
    // this.$axios("/goodsmsg")
    this.http.get({
      url:"/goodsmsg"
    })
    .then((res)=>{
      console.log(res)
     this.phone_msg = res.data.goods
      this.pei_data = res.data.parts
    })
    let _this = this;
    window.addEventListener("scroll", () => {
      // 获取滚动条长度
      let sc_height = document.documentElement.scrollTop;

      if (sc_height > 900) {
        _this.to_top = "xian_shi";
      } else {
        _this.to_top = "to_top";
      }
    });
  },
  components: {
    foot,
  },
  data() {
    return {
      phone_msg: [],
      // 配件 周边数据
      pei_data: [],
        
      

      // 回到顶部

      to_top: "to_top",
      shop_msg: {},
    };
  },
  methods: {
    toShop(index,flag){
      let goodsId,type = flag;

      if(flag == 'phone')
      {
        goodsId = this.phone_msg[index].goodsId

      }else{
        goodsId = this.pei_data[index].goodsId
      }
      let _this = this;
      this.$router.push({
          path: "/shop",
          query: {
           goodsId,
          },
        });
    },
    hui_top() {
      // 让回到顶部有一个过渡过程
      let tim = setInterval(() => {
        if (document.documentElement.scrollTop != 0) {
          document.documentElement.scrollTop -= 250;
        } else {
          clearInterval(tim);
        }
      }, 20);
    },
  },
};
</script>

<style scoped>

.loading{
  width: 100px;
  height: 100px;
}
</style>