const state = () => ({
  profileField: {
    name: null,
    nickname: null,
    age: null,
    gender: null,
    branch: null,
  },
});

const getters = {
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
