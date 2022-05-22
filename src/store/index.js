import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息
    nickname:"",
    head_img:"",
    user_account:"",
    loginFlag:false,
    // 商品信息
    goodsId: "",
    goodsName: "",
    price: "",
    goodsImg: "",
    color: [],
   parameter:[] 
  },
  mutations: {
    // 用户信息操作
     setUserMsg(state,playload)
     {
      state.nickname = playload.nickname == undefined ? state.nickname :playload.nickname
      state.head_img = playload.head_img == undefined ? state.head_img:playload.head_img
      state.user_account = playload.user_account == undefined ? state.user_account:playload.user_account
      state.loginFlag = playload.loginFlag == undefined ? state.loginFlag:playload.loginFlag
     },
    //  商品信息操作
    setGoodsMsg(state,playload)
    {
        state.goodsId = playload.goodsId
        state.goodsName = playload.goodsName
        state.price = playload.price
        state.color = playload.color
        state.parameter = playload.parameter
    }
  },
  actions: {
  },
  modules: {
  }
})
