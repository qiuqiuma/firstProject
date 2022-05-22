import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { myAxios } from '@/util/request'
import Vue3dMenu from 'vue-3d-menu';
import ElementUI from 'element-ui';
import vueDrag from 'vue-drag-verify-img-chip';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
import plugin from '@/plugin/plugin'
import 'animate.css';
import VueAreaLinkage from 'vue-area-linkage'
Vue.use(VueAreaLinkage)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('./assets/img/loadding.gif'),
  attempt: 1
  })
Vue.use(VueLazyload)
Vue.use(plugin)
Vue.prototype.$axios = myAxios;
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(vueDrag);
Vue.use(Vue3dMenu);
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store,
  render: h => h(App),
  
}).$mount('#app')
