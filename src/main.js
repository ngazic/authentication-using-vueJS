import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

// axios.defaults.baseURL = "https://authentification-using-vue.firebaseio.com";

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
