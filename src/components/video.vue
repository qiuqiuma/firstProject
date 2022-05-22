<template>
     <!-- 视频播放 -->
<div class="video_box">
    <span class="close_box" @click="go_left">x</span>
    <div class="video_msg">
    <video class="vv" src="../assets/video/realme_over.mp4" autoplay loop></video>
</div>
</div>
</template>

<script>
export default {
 activated() {
        let v_box = document.querySelector('.vv');
        v_box.currentTime = 0;
        // 当前状态如果为暂停 就开启播放
        if(v_box.paused == true)
        {
            v_box.play()
        }
    },
     methods: {
        go_left(){
            this.$router.go(-1)
        }
    },
}
</script>

<style>
@import url("../assets/css/video.css");
</style>