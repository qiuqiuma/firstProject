<template>
<div>
  <el-result icon="success" title="支付成功" :subTitle="txt">
      <template slot="extra">
        <el-button type="primary" size="medium" @click="to_index">手动跳转</el-button>
      </template>
    </el-result>
</div>

</template>

<script>
export default {
    computed:{
        txt(){
            return `${this.num}s后将跳转到首页`
        }
    },
    mounted() {
       this.tim =  setInterval(() => {
            if(this.num>0) --this.num;
            else this.to_index();
        }, 1000);
    },
    data() {
        return {
            num:5,
            tim:null
        }
    },
    methods:{
       to_index(){
                clearInterval(this.tim)
                this.$router.push("/index")
       }
    }
}
</script>

<style>

</style>