//import axios from "axios";
//import AuthController from "../services/auth.service";
//import Cookies from "js-cookie";
// import router from "../../main";
//import passport from "passport"

import actions from "./AuthController";
import gate from "../modules/gateModule";

const state = () => ({
  profile: {},
  baseProfile: {},
  status: Boolean,
  link: null,
  firstTime: localStorage.getItem("firstTime")
    ? localStorage.getItem("firstTime")
    : null,
  qrData: null,
});

const getters = {
  getLink: (state) => {
    return state.link;
  },
  getQrData: (state) => {
    return state.qrData;
  },
  getGate: (state) => {
    return state.profile.gate;
  },
  getGateInfo: (state) => {
    return gate.filter((item) => {
      item.name === state.profile.gate;
    });
  },
  getPoints: (state) => {
    return Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(state.profile.point)
  },
  getProfileById: (state) => (proId) => {
    return state.broMock.find(({ id }) => id === proId);
  },
  getProfile: (state) => {
    return state.profile;
  },
  getYear: (state) => {
    return state.profile.year;
  },
  getFirstTime: (state) => {
    return state.firstTime;
  },
};

const mutations = {
  setQrData: (state, payload) => {
    state.qrData = payload;
  },
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
  setFirstname: (state, payload) => {
    state.fname = payload;
  },
  setSurname: (state, payload) => {
    state.surname = payload;
  },
  setNickname: (state, payload) => {
    state.nickname = payload;
  },
  setAge: (state, payload) => {
    state.age = payload;
  },
  setReligion: (state, payload) => {
    state.religion = payload;
  },
  setContact: (state, payload) => {
    state.contact = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
