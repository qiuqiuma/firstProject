<template>
  <div>
    <Head v-if="headFlag" :changeFlag="changeFlag"></Head>
    <router-view></router-view>
    <foot v-if="footFlag"></foot>
  </div>
</template>

<script>
import Head from "./views/index";
import foot from '@/components/foot'
export default {
    data() {
    return {
      loading: null,
      headFlag:true,
       changeFlag:false,
      footFlag:true
    };
  },
  watch: {
    "$route.path": function (val) {
      // 监听路由变化 对导航菜单做出变化
      if(val != "/index") this.changeFlag = true;
      else this.changeFlag = false;
      if (val == "/register" || val == "/setPerson" ||val == "/person" || val=="/login" ) {
        this.headFlag = false;
        this.footFlag = false
      }else if(val == "/shop" || val == "/index" || val == "/video" || val == "/result"){
         this.footFlag = false
            this.headFlag = true;
      }else{
         this.headFlag = true;
          this.footFlag = true
      }
     
    },
  },

  components: {
    Head,
    foot
  },
};
</script>

<style>
@import url("../src/assets/font/icon2/iconfont.css");
@import url("../src/assets/font/icon1/iconfont.css");
@import url("../src/assets/font/icon3/iconfont.css");
@import url("../src/assets/font/icon4/iconfont.css");
@import url("../src/assets/font/icon5/iconfont.css");
@import url("../src/assets/css/xiang_ying.css");


@import url("../src/assets/css/phone.css");
@import url("../src/assets/css/login.css");




</style>
