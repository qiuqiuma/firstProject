<template>
  <div class="all_box">
    <div style="width:1152px; margin: 0 auto; padding-top: 2rem">
      <tit txt="地址管理"></tit>
      <adress
        @addFlag="handleadd"
        v-if="show_adress"
        :adress_arr="adress_arr"

      ></adress>
      <addAdrress
        @cansle="handcansle"
        :adress_msg="adress_msg"
        v-if="add"
       
      ></addAdrress>
    </div>


  </div>
</template>
<script>
import tit from "./titile";
import adress from "./myAdress";
import addAdrress from "@/views/addAdrress";
import foot from "@/components/foot";
export default {
  // created() {
  //   this.http.get({
  //     url: "/common/disAdress",
  //     params: {
  //       username: this.$store.state.user_account,
  //     },
  //   }).then((val) => {
  //     let msg = val.data.data;
  //     // console.log("ssss",msg)
  //     msg.forEach((e) => {
  //       e.display = true;
  //       this.adress_arr.push(e);
  //     });
  //   });
  
  // },
  data() {
    return {
      adress_arr: [],
      add: false,
      show_adress: true,
      adress_msg: {},
      adress_code:{}
    };
  },
  methods: {
    handleadd(val) {
      
      // this.adress_msg = {};
      // console.log("数据：",val.adress_msg)
      this.add = !this.add;
      this.show_adress = !this.show_adress;
      if (val) {
         console.log("收到的数据：",val)
        this.adress_msg = val
        // this.adress_msg = val.adress_msg;
      }else{
         this.adress_msg = null
      }
    },
    handcansle() {
      this.add = !this.add;
      this.show_adress = !this.show_adress;
      this.$forceUpdate()
    },
  },
  components: {
    tit,
    adress,
    addAdrress,
    foot,
  },
};
</script>

<style scoped>
.all_box {
  width: 100vw;
  height: 60vh;
  background-color: rgb(233, 238, 243);
}
</style>