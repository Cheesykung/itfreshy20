const state = () => ({
  profileField: {
    name: null,
    nickname: null,
    age: null,
    gender: null,
    branch: null,
    year: null,
    tel: null,
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
  getGender: (state) => {
    return state.profileField.gender;
  },
};

const mutations = {
  setGender: (state, gender) => {
    state.profileField.gender = gender;
  },
  setProfile: (state, profile) => {
    state.profileField = profile;
  },
};

const actions = {
  setGender({ commit }, gender) {
    commit("setGender", gender);
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
