import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import register from "./modules/register"

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  strict: debug,
  base: process.env.NODE_ENV,
  mode: "history",
  modules: {
    user,
    register
  }
});
