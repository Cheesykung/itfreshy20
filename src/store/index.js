import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// import { reject } from "core-js/fn/promise";

Vue.use(Vuex);

export default new Vuex.Store({
  base: process.env.NODE_ENV,
  mode: "history",
  state: {
    profile: {},
    firstTime: false,
    broMock: [
      {
        id: 1,
        name: "Ratchapol Thaworn",
        nickName: "Peet",
        year: 2,
        age: 20,
        branch: "IT",
        gender: "Male",
        img:
          "https://inuktech.it/wp-content/uploads/2019/01/staff-placeholder-male.jpg",
      },
      {
        id: 2,
        name: "โซระ ยาโยอิ",
        nickName: "นาโตมิ",
        year: 2,
        age: 20,
        branch: "IT",
        gender: "Female",
        img:
          "https://www.bracestoday.com/wp-content/uploads/2018/04/member-placeholder-female.jpg",
      },
      {
        id: 3,
        name: "Urara Natomi",
        nickName: "Ohayo",
        year: 2,
        age: 20,
        branch: "IT",
        gender: "Female",
        img:
          "https://www.bracestoday.com/wp-content/uploads/2018/04/member-placeholder-female.jpg",
      },
      {
        id: 4,
        name: "ฟรังซ์ ซี่",
        nickName: "ใครฟะ",
        year: 2,
        age: 19,
        branch: "IT",
        gender: "Female",
        img:
          "https://www.bracestoday.com/wp-content/uploads/2018/04/member-placeholder-female.jpg",
      },
      {
        id: 5,
        name: "Bunny Pokemon",
        nickName: "Oil",
        year: 3,
        age: 19,
        branch: "DSBA",
        gender: "Female",
        img:
          "https://www.bracestoday.com/wp-content/uploads/2018/04/member-placeholder-female.jpg",
      },
      {
        id: 6,
        name: "Jennis Uhara",
        nickName: "Jane",
        year: 4,
        age: 24,
        branch: "IT",
        gender: "Female",
        img:
          "https://www.bracestoday.com/wp-content/uploads/2018/04/member-placeholder-female.jpg",
      },
    ],
  },
  getters: {
    getBro: (state) => {
      return state.broMock;
    },
    getProfileById: (state) => (proId) => {
      return state.broMock.find(({ id }) => id === proId);
    },
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
  actions: {
    setEmail({ commit }, email) {
      setTimeout(() => {
        commit("setEmail", email);
      }, 600);
    },
    async getFacebookAuth({ commit }) {
      return new Promise((resolve, reject) => {
        //let headers = { header: {"Content-Type": "application/json"} };
        axios
          .get("/api/user")
          .then((res) => {
            commit("setProfile", res.data);
            resolve(res);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  },
});
