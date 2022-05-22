<template>
  <div>
	<!-- 服务区 -->
	    <div class="serv_top">
	        <img src="../assets/img/serv_bg.jpg" alt="">
	        <div class="ser_top_msg">
	            <span>欢迎使用realme服务</span>
				<input type="text" @focus = "tip_dis" @blur= "tip_yin">
				<ul class="tip_box">
				<li>热门搜索:</li>
				<li>如何查询realme手机真伪</li>
				<li>输入密码无法解锁、忘记锁屏密码怎么办？</li>
				<li>手机截屏方式</li>
				<li>realmeUl 2.0 使用手册</li>
				<li>realmeUl 3.0 使用手册</li>
				</ul>
	        </div>
	    </div>
	    <!-- 在线服务区 -->
	    <div class="serv_center_box">
	    <div class="serv_center">
	        <span style="font-size: 2rem;">在线服务</span>
	        <!--  -->
	        <ul class="serv_center_list">
	            <li>
	                <span class="iconfont3 icon-yunduanxiazai"></span>
	                <span>系统驱动下载与更新</span>
	            </li>
	            <li>
	                <span class="iconfont3 icon-jihuobanben
	                "></span>
	                <span>激活时间查询</span>
	            </li>
	            <li>
	                <span class="iconfont icon-sousuo"></span>
	                <span>备件价格查询</span>
	            </li>
	            <li>
	                <span class="iconfont3 icon-wangdianchaxun"></span>
	                <span>网点查询</span>
	            </li>
	            <li>
	                <span class="iconfont3 icon-thinline107-18"></span>
	                <span>寄修服务</span>
	            </li>
	            <li>
	                <span class="iconfont3 icon-weixiu"></span>
	                <span>上门维修</span>
	            </li>
	            <li>
	                <span class="iconfont3 icon-baohu"></span>
	                <span>保障服务查询</span>
	            </li>
	            <li>
	                <span class="iconfont3 icon-16jiaohuan"></span>
	                <span>以旧换新</span>
	            </li>
	        </ul>
	    </div>
	</div>
	<!-- 常见问题 -->
	<div class="serv_pro">
	<span style="font-size: 2rem;">常见问题</span>
	<ul class="serv_pro_list">
	    <li>
	        <span>隐私提升功能介绍</span>
	        <span>></span>
	    </li>
	    <li>
	        <span>远程守护下架说明</span>
	        <span>></span>
	    </li>
	    <li>
	        <span>私密保险箱功能介绍以及备份和查看备份方法</span>
	        <span>></span>
	    </li>
	    <li>
	        <span>如何查询realme手机真伪</span>
	        <span>></span>
	    </li>
	    <li>
	        <span>手机屏幕破裂怎么办</span>
	        <span>></span>
	    </li>
	</ul>
	<span style="cursor: pointer;">查看更多></span>
	<!-- 精选推荐 -->
	<div class="serv_tui">
		<span style="font-size: 2rem;">精选推荐</span>
		<div class="tui_box">
			<div class="tui_img">
				<img src="../assets/img/tui_img.png" >
			</div>
			<div class="tui_txt">
				<span style="font-size: 1.7rem;">里程碑！realme手机销量突破1亿台！</span><br>
				<span style="text-align: left;color: #666;line-height: 1.3rem;">
					  新纪录！据Strategy Analytics 2021第二季度智能手机出货数据跟踪表明，
					  realme创造了全球最快达到1亿台手机销量的记录！感谢100000000份的认可与支持，
					  感谢100000000真粉的陪伴与鼓励。 
					  越级成长！据市场调研机构Strategy Analytics最新报告显示，
					  今年上半年，realme成为国内市场增速第一手机品牌。realme一直坚持敢越级的使命，
					  为消费者打造价位段内更具惊喜感的产品。“全球一亿台、国内增速第一”的越级成绩，
					  离不开每一位选择realme的你，“亿”路有你感谢同行！
				</span><br>
				<span style="display: inline-block;width: 100%;text-align: center;margin-top: 3%;cursor: pointer;">更多资讯></span>
			</div>
		</div>
	</div>
	</div><!-- serv_tui -->
	<!-- realme客户服务网点 -->
	<div class="serv_wang_box">
		<span style="font-size: 2rem;">realme客户服务网点</span>
		<ul class="wang_list">
			<li>
				<span class="iconfont3 icon-weixiu"></span>
				<span>硬件维修</span>
			</li>
			<li>
				<span class="iconfont3 icon-yingjianshebeigengxin"></span>
	
				<span>软件升级</span>
			</li>
			<li>
				<span class="iconfont3 icon-wenda"></span>
				<span>咨询解答</span>
			</li>
			<li>
				<span class="iconfont3 icon-jiance"></span>
				<span>设备检测</span>
			</li>
		</ul>
	</div><!-- serv_wang_box -->
	<div class="serv_con">
	<span class="iconfont" style="color:white;font-size:1.3rem;">&#xe625;</span>
	</div>
	</div>
</template>

<script>
import foot from '../components/foot'
export default {
    components:{
        foot
    },
methods: {
		// 搜索提示框
		tip_dis(){
		let box = document.querySelector(".tip_box");
		box.style.display = "block"
		},
		tip_yin(){
			let box = document.querySelector(".tip_box");
		box.style.display = "none"
		}
	},
}
</script>

<style>
@import url("../assets/css/serv.css");
</style>