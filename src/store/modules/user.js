//import axios from "axios";
//import AuthController from "../services/auth.service";
//import Cookies from "js-cookie";
// import router from "../../main";
//import passport from "passport"

const state = () => ({
  profile: {},
  status: Boolean,
  link: null,
  firstTime: null
});

const getters = {
  getLink: (state) => {
    return state.link;
  },
  getProfileById: (state) => (proId) => {
    return state.broMock.find(({ id }) => id === proId);
  },
  getProfile: (state) => {
    return state.profile;
  },
  getHuntedCount: (state) => {
    return state.profile.count;
  },
  getYear: (state) => {
    return state.profile.year;
  },
  getUser: (state) => {
    return state.profile.user;
  },
  getPhotoURL: (state) => {
    return state.profile.photoURL;
  },
  getFirstTime: (state) => {
    return state.profile.newuser;
  }
};

const mutations = {
  setProfile: (state, profile) => {
    state.profile = profile;
    state.status = Object.keys(profile.token).length > 2 ? true : false;
  },
  setFirstTime: (state, status) => {
    state.firstTime = status;
  },
  setLink: (state, payloadLink) => {
    state.link = payloadLink;
  }
};

const actions = {
  linkActions({ commit }, payload) {
    commit("setLink", payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
