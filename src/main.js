import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import firebase from "./middleware/services/AuthHeaders";

import "@/assets/css/main.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import layzyLoad from "./directives/layzyLoad";
import VueLazyLoad from "vue-lazyload";

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/^ion-/];

Vue.directive("lazyload", layzyLoad);
Vue.use(VueLazyLoad, {
  observer: true,

  observerOptions: {
    rootMargin: "0px",
    threshold: 0.1,
  },
});

let app;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch("user/sendToken");
    store.dispatch("user/setAuth", user.providerData[0]);
  }

  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
