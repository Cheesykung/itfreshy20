import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import firebase from "./middleware/services/AuthHeaders";

import "@/assets/css/main.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

Vue.config.productionTip = false;

Vue.config.ignoredElements = [/^ion-/];

let app;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch("user/sendToken");
    store.dispatch("user/setAuth", user.providerData[0]);
    store.dispatch("user/setNewUser", localStorage.getItem("firstTime"));
  }

  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
