<template>
  <div>
      <!-- 底部 -->
  <footer class="phone_foot_box">
  <!-- 顶部 -->
  <div class="phone_foot_top">
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
  <!--中心  -->
  <div class="phone_foot_center">
  <!-- 推荐产品 -->
  <ul>
  <li>推荐产品</li>
  <li v-for="(item,index) in tui_jian" :key="index">{{(item)}}</li>
  </ul>
  <!-- 服务支持 -->
  <ul>
  <li>服务支持</li>
  <li v-for="(item,index) in serv_msg" :key="index">{{item}}</li>
  </ul>
  <!-- 关于我们 -->
  <ul>
  <li>关于我们</li>
  <li v-for="(item,index) in about_us" :key="index">{{item}}</li>
  </ul>
  <!-- 联系我们 -->
  <ul>
  <li>联系我们</li>
  <li>servies.cn@realme.com</li>
  </ul>
  <!-- 最右边 在线客服 联系电话 -->
  <ul class="foot_center_right">
  <li>
  <span>400-628-0066</span>
  <span style="color: #d4cdd4;">8:00-20:00,周一至周日</span>
  </li>
  <li>
  <span class="iconfont icon-kefu">&nbsp;&nbsp;在线客服</span>
  <span style="color: #d4cdd4;">9:00-22:00,周一至周日</span>
  </li>
  <li>
  <span class="iconfont icon-weixin"></span>
  <span class="iconfont icon-weibo"></span>
  </li>
  </ul>
  </div>
  <!-- 底部 -->
  <div class="phone_foot_bottom">
  
  </div>
  </footer>
      </div>
</template>

<script>
export default {
  data() {
          return {
               // 底部推荐信息
   tui_jian:[
    '真我GT Neo2T',
    '真我Q3s',
    '真我GT Neo2 5G',
    '真我GT 大师探索版 5G',
    '真我GT Neo 闪速版 5G',
    '真我GT 5G',
    '真我 Q3 Pro 5G'
  ],
  // 服务支持
  serv_msg:[
    '配送方式',
    '服务政策',
    '常见问题',
    '故障排除',
    '预装应用公示',
    'R码通道'
  ],
  // 关于我们
  about_us:[
    '关于realme',
    'realme UI 3.0',
    'realme社区',
    '加入我们',
    'realme隐私政策'
  ],
          }
      },
}
</script>

<style>

</style>