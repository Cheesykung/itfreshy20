import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
//import { reject } from "core-js/fn/promise";

const API = "https://us-central1-itfreshy2020.cloudfunctions.net/";

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
    likes: [
      { car: false },
      { song: false },
      { movie: false },
      { coding: false },
    ],
  },
});

const getters = {
  getProfile: (state) => {
    return state.profileField;
  },
  getYear: (state) => {
    return state.profileField.year;
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
};

const actions = {
  setGender({ commit }, gender) {
    commit("setGender", gender);
  },
  setFirstStep({ commit }, payload) {
    commit("setFirstStep", payload);
  },
  setSecond(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit("setSecondStep", payload, { root: false });
       context
      .dispatch("sendForm")
      .then((res) => resolve(res))
      .catch(e => reject(e))
    })
    
  },
  sendForm({ state }) {
    let form = new FormData();

    if (parseInt(state.year) !== 2) {
      form.append("id", state.stdId);
      form.append("fname", state.firstName);
      form.append("surname", state.surname);
      form.append("nickname", state.nickname);
      form.append("age", state.age);
      form.append("sex", state.gender);
      form.append("religion", state.religion);
      form.append("branch", state.branch);
      form.append("year", state.year);
      form.append("contact", state.contact);
      form.append("like", null);
    } else {
      form.append("id", state.stdId);
      form.append("fname", state.firstName);
      form.append("surname", state.surname);
      form.append("nickname", state.nickname);
      form.append("age", state.age);
      form.append("sex", state.gender);
      form.append("religion", state.religion);
      form.append("branch", state.branch);
      form.append("year", state.year);
      form.append("contact", state.contact);
      form.append("player", state.player);
      form.append("like", null);
    }

    return new Promise((resolve, reject) => {
      axios
        .post(API + "profile/create", form, {
          headers: {
            "FIREBASE_AUTH_TOKEN": firebase.auth().currentUser.getIdToken(),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("success");
          }
        })
        .catch((e) => {
          reject(e);
          console.log(e);
        }).finally(
          resolve('success+++')
        )
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
