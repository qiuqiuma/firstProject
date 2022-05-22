<template>
  <div class="title_box">
        <span>{{txt}}</span>
  </div>
</template>

<script>
export default {
    props:['txt']
}
</script>

<style>
.title_box{
    width: 100%;
    padding: 2rem 0;
    box-sizing: border-box;
    background-color: #fff;
    padding-left: 7%;
   
}
</style>