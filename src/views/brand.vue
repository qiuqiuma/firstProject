<template>
   <div>
    <!-- 顶部视频 -->
    <header class="brand_head">
        <video class="vid" muted  src="../assets/video/realme.mp4" autoplay="autoplay" loop>
        </video>
        <!-- 视频中间文字 -->
        <div class="vid_center">
            <span>敢越级</span>
            <div class="play_msg" @click="play_over">
                <span class="iconfont3 icon-bofang" style="font-size: 2rem;"></span>
                <span>点击观看完整视频</span>
            </div>
        </div>
    </header>
    <!-- 中间内容 -->
    <div class="brand_center_box">
<!-- 版心 -->
<div class="brand_center">
<!-- 我们是谁 -->
<div class="brand_center_top">
    <div class="brand_top_txt">
    <br><br>
    <span style="font-size: 2rem;">我们是谁</span>
    <br><br>
    深圳市锐尔觅移动通信有限公司于2018年8月28日正式成立， realme是一家专注于提供优质智能手机和AIoT产品的科技品牌。秉承创新基因，realme在产品性能、设计、品质和服务方面不断超越自我，致力让全球年轻人以合理的价格购买到兼具越级性能和潮流设计的智能产品。
    <br><br>
realme创始人、CEO李炳忠表示：“realme的初心是为年轻人打造有全方位越级体验的产品”。通过对智能手机和AIoT前沿技术的越级应用，realme为消费者带来在所处价位段内领先应⽤的新技术、新功能、新体验，凭借“越级产品”和 “敢越级”的品牌态度，realme愿为全球年轻人构建万物互联的智能潮玩生活。
<br><br>
2020年年初，realme发布“手机+AIoT”双驱动战略。2020年11月，市场研究机构Counterpoint发布2020年第三季度全球智能手机出货量报告， realme仅用9个季度，成为全球最快突破5000万台手机的品牌，连续5个季度在全球智能手机出货量排行榜排名第七，成为全球成长最快的智能手机品牌，稳居主流智能手机品牌之列。

目前，realme已经覆盖中国、印度、俄罗斯、东南亚、欧洲、大洋洲、中东非等全球61个市场。
</div>
</div> <!-- brand_center_top -->
<!-- 我们的dna -->
<div class="brand_dna">
   <div class="dna_center">
    <br><br>
       <span style="font-size: 2rem;">我们的DNA</span>
       <img src="../assets/img/brand/tu1.jpg">
   </div>
</div>
<!-- 我们的使命 愿景 -->
<div class="brand_our_box">
<div class="our_shi">
<img src="../assets/img/brand/yuan_wang.jpg">
</div>
<div class="our_yuan">
<img src="../assets/img/brand/shi_min.jpg">
</div>
</div><!--brand_our_box  -->
<!-- 全球realme -->
<div class="brand_g">
<div>
    <br>
    <span style="font-size: 2rem;">全球realme</span>
    <br><br>
    作为年轻品牌，realme在成立后迅速开拓全球市场，与年轻人共同成长，并鼓励年轻人打破束缚，以”敢越级”的态度，创造出更多惊喜和可能。目前，realme已经覆盖中国、印度、印度尼西亚、西班牙、法国、意大利、英国、俄罗斯、越南、泰国、马来西亚、巴基斯坦、埃及等全球61个市场。
</div>
</div><!-- brand_g -->

</div>
<!-- 最佳创新公司 -->
<div class="brand_zuijia">
<img src="../assets/img/brand/图2.jpg" alt="">
</div>
    </div>

    </div>
</template>

<script>
import foot from '../components/foot'
export default {
    components:{
        foot
    },
activated() {
        let v_box = document.querySelector('.vid');
        // 当前状态如果为暂停 就开启播放
        if(v_box.paused == true)
        {
            v_box.play()
        }
    },
    methods: {
         play_over(){
            this.$router.push("/video")
        }
    },
}
</script>

<style>

@import url("../assets/css/brand.css");
</style>