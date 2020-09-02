//import axios from "axios";
//import AuthController from "../services/auth.service";
//import Cookies from "js-cookie";
// import router from "../../main";
//import passport from "passport"

import actions from "./AuthController";

const state = () => ({
  profile: {},
  status: Boolean,
  link: null,
  firstTime: localStorage.getItem("firstTime")
    ? localStorage.getItem("firstTime")
    : null,
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
  getFirstTime: (state) => {
    return state.firstTime;
  },
};

const mutations = {
  setProfile: (state, payloadProfile) => {
    state.profile = payloadProfile;
    state.status = true;
  },
  setFirstTime: (state, status) => {
    state.firstTime = status;
  },
  setLink: (state, payloadLink) => {
    state.link = payloadLink;
  },
  clearProfile: (state) => {
    state.profile = null;
    state.status = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
