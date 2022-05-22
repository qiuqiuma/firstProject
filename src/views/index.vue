/* eslint-disable eqeqeq */
<template>
  <div class="home">
    <!-- 页面顶部 -->
    <header class="top_box" v-show="head_h">
      <div class="head_top">
        <!-- logo -->
        <div class="logo">
          <img src="../assets/img/realme.png" alt="" />
        </div>

        <!-- 客服 -->
        <div class="head_kf">
          <span class="iconfont">&#xe625;</span>
          <span>&nbsp;&nbsp;400-628-0066</span>
        </div>
        <div
          class="login_after"
          v-show="$store.state.loginFlag"
          @mouseover="list_d('in')"
          @mouseleave="list_d('out')"
        >
          <el-avatar
            shape="circle"
            :size="45"
            fit="fill"
            :src="$store.state.head_img"
          ></el-avatar>
           <vue-3d-menu
              style="z-index: 999;margin:0 1.5rem;margin-right:-100px;"
              :title="$store.state.nickname"
              :items="items"
            ></vue-3d-menu>
        </div>
        <!--login_after -->

        <!-- 登录 -->
        <div class="head_right" v-show="!$store.state.loginFlag">
          <span
            class="iconfont icon-denglu"
            style="color: red; font-weight: 900"
            >&nbsp;&nbsp;</span
          >
          <router-link to="/login">
            <span @click="to_login_a">登录</span> &nbsp;/&nbsp;注册</router-link
          >
        </div>
        <!-- 登录图标 -->
        <div class="head_icon" v-show="!$store.state.loginFlag">
          <span class="iconfont icon-qq"></span>
          <span class="iconfont icon-facebook"></span>
          <span class="iconfont icon-weixin"></span>
          <span class="iconfont icon-weibo"></span>
        </div>
      </div>
      <!-- top_box -->
    </header>
    <!-- --------------------- -->
    <!-- 中心部分 -->
    <div class="center_box" v-show="head_h">
      <div :class="bian==1?'main_change' : 'main_top'">
        <div :class="bian==1?'center_main_change' : 'center_main'">
          <!-- 导航菜单 -->
          <ul :class="bian==1?'head_left_change' : 'head_left'">
            <li
              style="cursor: pointer"
              class="cuso"
              v-for="(item, index) in menu_list"
              :key="index"
              @click="changeRoute(index)"
            >
              <span :class="pathFlag == index?'active':''">{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- main_top -->
    </div>
    <keep-alive> </keep-alive>
  </div>
</template>

<script>
import Main from "./indexMain";
export default {
    props:['changeFlag'],
      beforeMount() {
        this.$axios({
            url: "/common/index",
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }).then(val => {
            let resObj = val.data.data;
            console.log(val)
            if (val.data.single == "error") {
                this.$store.commit({
                    type: "setUserMsg",
                    nickname: "",
                    head_img: "",
                    user_account: "",
                    loginFlag: false,
                });
                 this.$message({
                    message: val.data.data,
                    type: "warning",
                });
            } else {
              window.localStorage.setItem('username',resObj.userName)
                this.$store.commit({
                    type: "setUserMsg",
                    nickname: resObj.nickName,
                    head_img: resObj.headImg,
                    user_account: resObj.userName,
                    loginFlag: true,
                });
            }

        });
  
},
  mounted() {
    console.log(this.$store);
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Main,
  },
  name: "Home",
  data() {
    let _this = this;
    return {
      items: [
        {
          title: "账户信息",
          click:()=> _this.tui_login("person"),
        },
        {
          title: "我的购物车",
          click: () => _this.tui_login("car"),
        },
        {
          title: "地址管理",
          click: () => _this.tui_login("adress"),
        },{
          title: "订单信息",
          click: () => _this.tui_login("order"),
        },{
          title: "退出登录",
          click: () => _this.tui_login("login"),
        }
      ],
      after_list: "height:0",
      // 导航菜单
      menu_list: [
        {
          name: "主页",
          class: "active",
        },
        {
          name: "产品",
          class: "",
        },
        {
          name: "品牌",
          class: "",
        },
        {
          name: "服务",
          class: "",
        },
      ],
      // 导航样式样式
      // 主页样式    main_top  center_main  head_left
      // 非主页样式   main_change   center_main_change  head_left_change
      main: "main_top",
      center_main: "center_main",
      head_left: "head_left",
      // 商品信息
      //  路由信息
      rout_flag: null,
      // 导航栏是否显示
      head_h: true,
      //  登录是否显示
      login_tu: false,
      // 登录后个人菜单是否显示
      login_after: true,
      // 登录信息
      user_name: "",
      // 登录信号
      login_f: 0,
    };
  },

  computed:{
    bian(){
       if(this.changeFlag) return 1;
       else return 0;
    },
     head_url() {
      return this.$store.state.head_img;
    },
   pathFlag(){
     let flag;
     if(this.$route.path == "/index") flag = 0
     else if(this.$route.path == "/product") flag = 1
     else if(this.$route.path == "/brand" ||this.$route.path == "/video") flag = 2
     else flag = 3
      return flag;
   }
  },
  watch: {
    "$route.path": function (val) {
      if (val != "/shop") {
        window.addEventListener("scroll", this.menu);
      }

      // this.rout_flag = val;
      // 监听路由变化 对导航菜单做出变化
      // if (val == "/register") {
      //   this.head_h = false;
      // }
      // if (val != "/index") {
      //   this.main = "main_change";
      //   this.center_main = "center_main_change";
      //   this.head_left = "head_left_change";
      // } else {
      //   this.main = "main_top";
      //   this.center_main = "center_main";
      //   this.head_left = "head_left";
      //   this.head_h = true;
      // }
    },
  },

  methods: {
    list_d(flag) {
      if (flag == "in") this.after_list = "height:260px";
      else this.after_list = "height:0";
    },
    changeRoute(index) {
      // for (let i = 0; i < this.menu_list.length; i++)
      //   this.menu_list[i].class = "";
      // this.menu_list[index].class = "active";
      switch (index) {
        case 0:
          this.$router.push("/index");
          break;
        case 1:
          this.$router.push("/product");
          break;
        case 2:
          this.$router.push("/brand");
          break;
        case 3:
          this.$router.push("/servies");
          break;
      }
    },
    // 滚动过长 导航菜单固定
    menu() {
      if (document.documentElement.scrollTop > 50) {
        // eslint-disable-next-line eqeqeq
        if (this.rout_flag != "/index") {
          this.main = "fix";
        } else {
          this.main = "main_top";
        }
      } else {
        // eslint-disable-next-line eqeqeq
        if (this.rout_flag != "/index") {
          this.main = "main_change";
        } else {
          this.main = "main_top";
        }
      }
    },
    // 点击登录后隐藏头部
    to_login_a() {
      this.head_h = false;
    },
    // 退出登录
    tui_login(flag) {
      switch (flag) {
        case "order":
          this.$router.push("/order");
          break;
        case "car":
          this.$router.push("/car");
          break;
        case "adress":
          this.$router.push("/adress");
          break;
        case "person":
          this.$router.push("/person");
          break;
        case "login":
          window.localStorage.removeItem('token')
          this.$router.push("/login");
          this.$store.commit({
            type: "setUserMsg",
            nickname: "",
            head_img: "",
            user_account: "",
            loginFlag: false,
          });
          break;
      }
      //  const bb = document.querySelector(".after_list");
      //   bb.style.height = 0;
      this.after_list = "height:0";
      console.log(flag);
    },
  },
};
</script>

<style scoped>
@import url("../assets/css/header.css");
</style>
