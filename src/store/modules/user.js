import axios from "axios";

const state = () => ({
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
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    },
    {
      id: 2,
      name: "Jennie Kim",
      nickName: "เกี๊ยว",
      year: 2,
      age: 20,
      branch: "IT",
      gender: "Female",
      img: "https://image.kpopmap.com/2019/09/jenniekim.jpg",
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
        "https://secure.gravatar.com/avatar/7104e34ac61866fc2d45b652f82a03bd?s=400&d=mm&r=g",
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
        "https://netstorage-kami.akamaized.net/images/e40e37e590cbed31.jpg?&imwidth=1200",
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
        "https://www.filmfare.com/awards/filmfare-awards-2020/images/nominations/best_debut_female_ananya_panday.jpg",
    },
    {
      id: 6,
      name: "Uvuvwevwevwe onyetenyevwe ugwebvenwen osas",
      nickName: "Osas",
      year: 4,
      age: 24,
      branch: "IT",
      gender: "Male",
      img:
        "https://i.pinimg.com/originals/db/28/b8/db28b8b825931035869f103d99c98ee6.jpg",
    },
  ],
});

const mutations = {
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
};

const actions = {
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
};

const getters = {
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
