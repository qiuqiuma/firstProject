<template>
  <div class="index_box">
        <!-- 轮播图 -->
        <div class="swiper-container">
           <ul class="swiper-wrapper"> 
               <li class="swiper-slide">
                   <img src="../assets/img/lun1.jpg">
               </li>
               <li class="swiper-slide">
                <img src="../assets/img/lun2.jpg">
               </li>
               <li class="swiper-slide">
                <img src="../assets/img/lun3.jpg">
               </li>
               <li class="swiper-slide">
                <img src="../assets/img/lun4.jpg">
               </li>
         </ul>
         <div class="swiper-button-prev"></div>
         <div class="swiper-button-next"></div>
         <!-- 底部小圆点 -->
         <div class="swiper-pagination"></div>
        </div><!-- swiper-container -->
  
  
        <div class="foot_box">
            <ul class="foot">
                <li>
                    <span class="iconfont icon-zhengpinbaozheng
                    "></span>
                    <span>官方正品</span>
                </li>
                <li>
                    <span class="iconfont icon-qian"></span>
                    <span>顺丰包邮</span>
                </li>
                <li>
                    <span class="iconfont icon-rili"></span>
                    <span>7天无理由退货</span>
                </li>
                <li>
                    <span class="iconfont icon-huowuw"></span>
                    <span>30天换货保障</span>
                </li>
            </ul>
         
             </div>
    </div>
</template>
<script>
import Swiper from 'swiper';

export default {
  mounted(){
     new Swiper ('.swiper-container', {
    observer:true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
          autoplay:{
              delay:2500,//播放延迟
              disableOnInteraction: false//当用户操作后是否停止自动播放
          },
          // 分页器
          pagination: {
              el: '.swiper-pagination',
              clickable :true,//点击分页器会切换到相应图片
            },
            //左右切换按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            loop:true,//循环轮播 到最后下一张直接就是第一张图片
  })        
  },
  data() {
      return {
          lun_img:[]
      }
  },

}
</script>
<style>
@import url("../assets/css/index.css");
@import url('../../node_modules/swiper/css/swiper.min.css');
</style>