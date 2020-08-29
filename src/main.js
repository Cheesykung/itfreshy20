import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "@/assets/css/main.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

var QRCode = require("qrcode");
var alertify = require("alertifyjs");

Vue.config.productionTip = false;

Vue.config.ignoredElements = [/^ion-/];

Vue.use(QRCode);
Vue.use(alertify);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
