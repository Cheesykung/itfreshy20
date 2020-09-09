/* eslint-disable */
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
//import { reject } from "core-js/fn/promise";
//import { reject } from "core-js/fn/promise";

const API = "https://us-central1-itfreshy2020.cloudfunctions.net";

const state = () => ({
  profileField: {
    stdId: null,
    firstName: null,
    surname: null,
    nickname: null,
    age: null,
    religion: null,
    gender: null,
    branch: null,
    year: null,
    contact: null,
    player: null,
    status: null,
    gate: null,
    likes: null,
  },
});

const getters = {
  getProfile: (state) => {
    return state.profileField;
  },
  getYear: (state) => {
    return parseInt(state.profileField.year);
  },
  getGate: (state) => {
    return state.profileField.gate;
  },
  getFirstStep: (state) => {
    return (
      state.profileField.branch,
      state.profileField.year,
      state.profileField.contact,
      state.profileField.age,
      state.profileField.religion
    );
  },

  getSecondStep: (state) => {
    return (
      state.profileField.firstName,
      state.profileField.surname,
      state.profileField.nickname,
      state.profileField.stdId
    );
  },
  getGender: (state) => {
    return state.profileField.gender;
  },
  getLikes: (state) => {
    return state.profileField.likes;
  }
};

const mutations = {
  setGender: (state, gender) => {
    state.profileField.gender = gender;
  },

  setFirstStep: (state, payload) => {
    state.profileField.branch = payload.branch;
    state.profileField.year = payload.year;
    state.profileField.contact = payload.contact;
    state.profileField.age = payload.age;
    state.profileField.religion = payload.religion;
  },

  setSecondStep: (state, payload) => {
    state.profileField.firstName = payload.firstName;
    state.profileField.surname = payload.Surname;
    state.profileField.nickname = payload.Nickname;
    state.profileField.stdId = payload.id;
    state.profileField.player = payload.player;
  },

  setProfile: (state, profile) => {
    state.profileField = profile;
  },

  setLikes: (state, likesPayload) => {
    state.profileField.likes = likesPayload;
  },

  setGate: (state, gatePayload) => {
    state.profileField.gate = gatePayload
  }
};

const actions = {
  setGender({ commit }, gender) {
    commit("setGender", gender);
  },

  setFirstStep({ commit }, payload) {
    commit("setFirstStep", payload);
  },

  setSecond({ commit }, payload) {
    commit("setSecondStep", payload);
  },

  setProfile({ commit }, payload) {
    commit("setProfile", payload);
  },

  setLikes({ commit }, payload) {
    commit("setLikes", payload); 
  },

  setGate({ commit }, payload) {
    commit("setGate", payload);
  },

  getGate({ getters, dispatch }) {
    return new Promise((resolve, reject) => {
      try {
        firebase.auth().currentUser.getIdToken().then((res) => {
          axios.post(API + "/test/gate", { stdid: getters.getProfile.stdId } , { headers: {
            "FIREBASE_AUTH_TOKEN": res
          } }).then((gate) => {
            if(gate.data.data.length > 0) {
              dispatch("setGate", gate.data.data);
            }
            resolve(gate.data)
          })
        })
      } catch(e) {
        reject(e)
      }
    })
  },

  sendForm({ commit, getters, dispatch }) {
    let data = new Array();

    let year = getters.getYear;

    if (year === 1 || year === 2) {
      data = {
        id: getters.getProfile.stdId,
        fname: getters.getProfile.firstName,
        surname: getters.getProfile.surname,
        nickname: getters.getProfile.nickname,
        age: getters.getProfile.age,
        sex: getters.getProfile.gender,
        religion: getters.getProfile.religion,
        branch: getters.getProfile.branch,
        year: getters.getProfile.year,
        contact: getters.getProfile.contact,
        player: year === 2 ? getters.getProfile.player : 1,
        gate: year === 2 ? null : getters.getGate,
        like: getters.getLikes,
      };
    } else {
      data = {
        id: getters.getProfile.stdId,
        fname: getters.getProfile.firstName,
        surname: getters.getProfile.surname,
        nickname: getters.getProfile.nickname,
        age: getters.getProfile.age,
        sex: getters.getProfile.gender,
        religion: getters.getProfile.religion,
        branch: getters.getProfile.branch,
        year: getters.getProfile.year,
        contact: getters.getProfile.contact,
        player: 0,
        gate: null,
        like: null,
      };
    }

    return new Promise((resolve, reject) => {
      try {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((res) => {
            axios
              .post(API + "/profile/create", data, {
                headers: {
                  'FIREBASE_AUTH_TOKEN': res,
                },
              })
              .then((result) => {
                if (result) {
                  //dispatch("user/setAuth", result, { root: true });
                  resolve(result);
                }
              })
              .catch((e) => {
                console.log(e);
                reject(e);
              });
          });
      } catch (e) {
        console.log(e);
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
