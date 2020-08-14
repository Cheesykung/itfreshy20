const state = () => ({
  profileField: {
    name: String,
    nickname: String,
    age: Number,
    gender: null,
    branch: String,
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
};

const actions = {
  setGender({ commit }, gender) {
    commit("setGender", gender);
  },
};

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions,
};
