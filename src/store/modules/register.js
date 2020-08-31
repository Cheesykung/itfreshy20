const state = () => ({
  profileField: {
    stdId: null,
    firstName: null,
    surname: null,
    nickname: null,
    age: null,
    gender: null,
    branch: null,
    year: null,
    contact: null,
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
  getFirstStep: (state) => {
    return (
      state.profileField.branch,
      state.profileField.year,
      state.profileField.contact
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
  },
  setSecondStep: (state, payload) => {
    state.profileField.firstName = payload.firstName;
    state.profileField.surname = payload.Surname;
    state.profileField.nickname = payload.Nickname;
    state.profileField.stdId = payload.id;
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
  setSecond({ commit }, payload) {
    commit("setSecondStep", payload);
  },
  sendForm(context) {
    context.commit("setProfile");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
