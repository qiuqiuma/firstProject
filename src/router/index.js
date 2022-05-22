import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//解决vue路由重复导航错误
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [{
  path: '/',
  redirect: '/index'
},
{
  path: '/index',
  component: () => import("@/views/indexMain.vue")
},
{
  path: '/product',
  component: () => import('@/views/product.vue')
},
{
  path: '/brand',
  component: () => import('@/views/brand.vue')
},
{
  path: '/shop',
  component: () => import('@/components/shopping.vue')
},
{
  path: '/servies',
  component: () => import('@/views/service.vue')
},
{
  path: '/video',
  component: () => import('@/components/video.vue')
},
{
  name: 'personManage',
  path: '/person',
  component: () => import('@/views/personManage.vue')
},
{
  path: '/car',
  component: () => import('@/views/myCar.vue')
},
{
  path: '/adress',
  component: () => import('@/views/adress.vue')
},
{
  path: '/order',
  component: () => import('@/views/order.vue')
},
{
  path: '/login',
  component: () => import('@/views/login.vue')
}, {
  path: '/register',
  component: () => import('@/views/register.vue')
}, {
  path: '/setPerson',
  component: () => import('@/views/setPerson.vue')
}, {
  path: '/subOrder',
  name:"subOrder",
  component: () => import('@/views/subOrder.vue')
}
, {
  path: '/result',
  name:"result",
  component: () => import('@/views/result.vue')
}
]
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
