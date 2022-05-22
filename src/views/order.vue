<template>
  <div class="box">
      
        <div class="box-cart">
             <tit txt="订单管理">{{orderMsg}}</tit>
              <el-empty
          v-show="orderMsg.length == 0 ? true : false"
          description="暂时没有任何订单信息"
        >
          <el-button class="gou_btn" @click="$router.push('/product')">马上去购物</el-button>
        </el-empty>
             <div  v-for="(item,index) in orderMsg" :key="index">
            <div class="shop1">
                <div class="shop1_top">
                    <span>订单编号：<a href="#">{{item.orderNumber}}</a></span><br>
                    <span>下单日期：{{item.orderTime}}</span>
                </div>
                <img class="img_src" :src="item.goodsImg" alt="">
                <div class="shop-content1">
                    <a href="#" class="shop-content-font">{{item.goodsName}}</a><br>
                    <span class="shop-content-font" style="color: #6a6a6a;">{{item.color[0]}}</span><br>
                    <span class="shop-content-font" style="color: #6a6a6a;">{{item.parameter[0]}}</span><br>
                </div>
                <div class="shop-content1-right">
                    <div class="shop-content-font">
                        <ul>
                            <li>
                                <span>${{item.price}}</span><br>
                                <span style="color: #6a6a6a;text-decoration: line-through;">${{ Number(item.price)+200}}</span>
                            </li>
                            <li>
                                <span>x{{item.number}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> 
            <div class="shop2">
                <div class="shop2_right">
                    <div class="one">
                        <span class="right1" style="color:  #696969;">商品总数：</span>
                        <span class="left1" style="color:  #696969;">x{{item.number}}</span>
                    </div>
                    <div class="two">
                        <span class="right2" style="color:  #696969;">总价：</span>
                        <span class="left2">${{item.number * Number(item.price)}}</span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>  
</template>
<script>
import tit from "./titile";
import foot from '@/components/foot'
export default {
    created(){
        this.http.get({
            url:"/common/disOrder",
            params:{
                username:window.localStorage.getItem('username'),
            }
        }).then(res=>{
            console.log("购物车",res)
            if(res.data.resMsg != "notFound")
            {
                    res.data.data.forEach(e=>{
                        this.orderMsg.push(e)
                    })
            }
           
        })
    },
    data() {
        return {
            orderMsg:[]
        }
    },
        
    
components:{
    tit,
    foot
}
}
</script>

<style scoped>
.box{
    width: 100vw;
  padding-bottom: 20px;
 
    background-color: rgb(233, 238, 243);
}

.box-cart{
    margin: 0 auto;
    width: 55%;
    /* padding: 2rem 0; */
    background-color: #ffffff;
    /* border: #000 solid 2px; */
}
.cart{
    position: relative;
    height: 50px;
    line-height: 80px;
    font-size: 15px;
    color: #000;
    padding-left: 50px;
}
.shop1{
    /* border: #000 solid 3px; */
    border-top:  #fbfbfb solid 10px;
   padding: 1rem 0;
    height: 200px;
    border-bottom: solid 1px #b8b7b7;
}
.shop1_top{
    color: #b8b7b7;
    font-size: 14px;
    margin-left: 40px;
}
.shop1_top a{
    color: #f2752d;
}
.img_src{
    width: 80px;
    height: 80px;
    margin-left: 20px;
    margin-top: 50px;
    float: left;
    /* border: #000 solid 2px; */
}
.shop-content1{
    height: 100px;
    width:300px;
    /* border: #000 solid 2px; */
    margin-left:50px;
    margin-top: 50px;
    float: left;
}
a{
    color: #000;
    text-decoration:none;
}
a:hover{
    color: yellow;
}
.shop-content-font{
    line-height: 20px;
    height: 20px;
}
.shop-content1-right{
    height: 100px;
    width:400px;
    /* border: solid 2px red; */
    float: right;
    margin-top: 60px;
    font-size: 14px;
    /* margin-right: 0px; */
    line-height: 100px;
}
.shop-content-font li{
    /* border: #000 solid 2px; */
    list-style-type: none;
    float: left;
    margin-left: 100px;
    padding-right: 50px;
}
.shop2{
    position: relative;;
    width: 1200px;
    height: 115px;
    /* border: #000 solid 2px; */
}
.shop2_right{
    font-size: 14px;
    height: 100px;
    width: 250px;
    margin-top: 50px;
   position: absolute;
   right: 17rem;
   
    /* border: solid 2px rebeccapurple; */
}
.left1{
    float: right;
}
.left2{
    float: right;
}
.one{
    margin-bottom: 10px;
}

</style>