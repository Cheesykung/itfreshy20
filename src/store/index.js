import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";
// import mongoose from "mongoose";
// import Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
  base: process.env.NODE_ENV,
  mode: "history",
  state: {
    profile: {},
    firstTime: false,
  },
  getters: {
    getProfile: (state) => {
      return state.profile;
    },
    getUser: (state) => {
      return state.profile.user;
    },
    getPhotoURL: (state) => {
      return state.profile.photoURL;
    },
    getEmail: (state) => {
      return state.profile.email;
    },
    getFirstTime: (state) => {
      return state.firstTime;
    },
    signInCheck: (state) => {
      let loggedin = false;
      if (state.profile !== null)
        loggedin = Object.keys(state.profile).length > 2;
      return loggedin;
    },
  },
  mutations: {
    setProfile: (state, profile) => {
      state.profile = profile;
    },
    setUser: (state, user) => {
      state.profile.user = user;
    },
    setPhotoURL: (state, url) => {
      state.profile.photoURL = url;
    },
    setEmail: (state, email) => {
      state.profile.email = email;
    },
    setFirstTime: (state, bool) => {
      state.firstTime = bool;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
  },
  actions: {},
});
