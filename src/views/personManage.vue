<template>
  <div id="message">
        <!-- m_top包含菜单栏和用户显示部分 -->
        <div id="m_top">
            <!-- 菜单栏 -->
            <div id="top">
                <div id="top_m">
                    <table>
                        <tr>
                            <td>帮助中心</td>
                            <td>简体中文 <img src="../assets/img/to_bottom.png"></td>
                            <td @click="login_out">退出</td>
                        </tr>
                    </table>
                </div>
            </div>
            <!-- 用户显示部分 -->
            <div id="middle">
                <!-- 用户信息 -->
                <div id="m_left">
                    <span><img :src="$store.state.head_img" class="m_user_img"></span>
                    <table>
                        <tr>
                            <td class="m_user_text" >{{$store.state.nickname}}</td>
                            <td><img src="../assets/img/wright.png" class="m_wright_img"></td>
                        </tr>
                        <tr>
                            <td colspan="2">{{userPhone}}</td>
                        </tr>
                    </table>
                </div>
                <!-- 积分 -->
                <div id="m_right">
                    <img src="../assets/img/diamand.png">
                    <br>
                    <span>0积分</span>

                </div>
            </div>
        </div>
        <!-- 信息列表 -->
        <div id="bottom">
            <div class="bottom_msg">
                <div class="b_left">
                    <table>
                        <tr>
                            <td rowspan="2"><img src="../assets/img/bottom_img/lock.png"></td>
                            <td class="b_text_big">账号密码</td>
                        </tr>
                        <tr>
                            <td class="b_text_small">用于保护账号安全</td>
                        </tr>
                    </table>
                </div>
                <div class="b_right">
                    修改
                </div>
            </div>
            <!-- 下方线条 -->
            <hr class="b_hr">
            <div class="bottom_msg">
                <div class="b_left">
                    <table>
                        <tr>
                            <td rowspan="2"><img src="../assets/img/bottom_img/phone call.png"></td>
                            <td class="b_text_big">安全手机</td>
                        </tr>
                        <tr>
                            <td class="b_text_small">安全手机可用于登录账号，重置密码或其他安全验证</td>
                        </tr>
                    </table>
                </div>
                <div class="b_right">
                    修改
                </div>
            </div>
            <hr class="b_hr">
            <div class="bottom_msg">
                <div class="b_left">
                    <table>
                        <tr>
                            <td rowspan="2"><img src="../assets/img/bottom_img/chat.png"></td>
                            <td class="b_text_big">安全邮箱</td>
                        </tr>
                        <tr>
                            <td class="b_text_small">安全手机可用于登录账号，重置密码或其他安全验证</td>
                        </tr>
                    </table>
                </div>
                <div class="b_right">
                    修改
                </div>
            </div>
            <hr class="b_hr">
            <div class="bottom_msg">
                <div class="b_left">
                    <table>
                        <tr>
                            <td rowspan="2"><img src="../assets/img/bottom_img/alert.png"></td>
                            <td class="b_text_big">紧急联系人</td>
                        </tr>
                        <tr>
                            <td class="b_text_small">能在找回密码过程中加强验证，让账号更安全</td>
                        </tr>
                    </table>
                </div>
                <div class="b_right">
                    设置
                </div>
            </div>
            <hr class="b_hr">
            <div class="bottom_msg">
                <div class="b_left">
                    <table>
                        <tr>
                            <td rowspan="2"><img src="../assets/img/bottom_img/setting.png"></td>
                            <td class="b_text_big">实名认证</td>
                        </tr>
                        <tr>
                            <td class="b_text_small">实名认证可以完善您的账户信息安全</td>
                        </tr>
                    </table>
                </div>
                <div class="b_right">
                    去认证
                </div>
            </div>
            <hr class="b_hr">
            <div class="bottom_msg">
                <div class="b_left">
                    <table>
                        <tr>
                            <td rowspan="2"><img src="../assets/img/bottom_img/user.png"></td>
                            <td class="b_text_big">我的信息</td>
                        </tr>
                        <tr>
                            <td class="b_text_small">管理修改您的账户信息</td>
                        </tr>
                    </table>
                </div>
                <div class="b_right" @click="setMsg">
                    查看
                </div>
            </div>
            <hr class="b_hr">
            <div class="bottom_msg">
                <div class="b_left">
                    <table>
                        <tr>
                            <td rowspan="2"><img src="../assets/img/bottom_img/transform.png"></td>
                            <td class="b_text_big">授权管理</td>
                        </tr>
                        <tr>
                            <td class="b_text_small">可以查看并管理您的账号的授权情况</td>
                        </tr>
                    </table>
                </div>
                <div class="b_right">
                    查看
                </div>
            </div>
            <hr class="b_hr">
            <div class="bottom_msg">
                <div class="b_left">
                    <table>
                        <tr>
                            <td rowspan="2"><img src="../assets/img/bottom_img/dashboard.png"></td>
                            <td class="b_text_big">三方账户绑定</td>
                        </tr>
                        <tr>
                            <td class="b_text_small">绑定三方账户可以快捷登录</td>
                        </tr>
                    </table>
                </div>
                <div class="b_right">
                    查看
                </div>
            </div>
            <hr class="b_hr">
            <div class="bottom_msg">
                <div class="b_left">
                    <table>
                        <tr>
                            <td rowspan="2"><img src="../assets/img/bottom_img/more.png"></td>
                            <td class="b_text_big">个人数据管理</td>
                        </tr>
                        <tr>
                            <td class="b_text_small">可以查询、删除您的账户相关的个人信息或注销您的账户</td>
                        </tr>
                    </table>
                </div>
                <div class="b_right">
                    查看
                </div>
            </div>
            <hr class="b_hr">
        </div>
        <!-- 底部版权 -->
        <div id="copyright">
            &copy; 2005-2021 广东欢太 版权所有 粤ICP备 14056724 号-2
        </div>
    </div>
</template>

<script>
export default {
   computed:{
       userPhone(){
           let str = this.$store.state.user_account
           return str.slice(0,3) + "*****"+str.slice(str.length-4,11)
       }
   },
methods:{
    login_out(){
        this.$router.push('/login')
    },
    setMsg(){
        this.$router.push("/setPerson")
    }
}
}
</script>

<style>
@import url('../assets/css/message.css');
</style>