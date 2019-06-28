import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/css/reset.css'
// import "swiper/dist/css/swiper.css"
import "swiper/dist/css/swiper.min.css"
// import "swiper/dist/js/swiper";
import './assets/css/font/iconfont.css'
import './assets/css/font/iconfont'
Vue.config.productionTip = false;
Vue.use(VueAxios, axios)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
