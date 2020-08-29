import axios from "axios";
//import AuthController from "../services/auth.service";
import Cookies from "js-cookie";
// import router from "../../main";

const state = () => ({
  profile: {},
  status: Boolean,
  link: null,
  firstTime: null,
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

const getters = {
  getBro: (state) => {
    return state.broMock;
  },
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
  },
  signInCheck: (state) => {
    let loggedin = state.status;

    return loggedin;
  },
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
  },
  clearProfile: (state) => {
    Cookies.remove("session");
    state.profile = null;
    state.status = false;
  },
};

const actions = {
  linkActions({ commit }, payload) {
    commit("setLink", payload);
  },
  async resetProfile({ commit }) {
    return new Promise((resolve, reject) => {
      const token = Cookies.get("session");
      axios
        .get(
          "https://us-central1-itfreshy2020.cloudfunctions.net/test/logout",
          {
            withCredentials: true,
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Authorization": "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setTimeout(() => {
              window.location.replace("/signin");
            }, 50);
            resolve(res);
            commit("clearProfile");
          } else {
            reject("Something went wrong!");
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  async getFacebookAuth({ commit }) {
    return new Promise((resolve, reject) => {
      const token = Cookies.get("session");
      axios
        .get(
          "https://us-central1-itfreshy2020.cloudfunctions.net/test/checka",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            if (res.data.session !== "") {
              commit("setProfile", res.data.data);
              commit("setFirstTime", res.data.data.newuser);
              Cookies.set("session", res.data.session.passport.user);
              resolve("Succesfully!");
            }
          }
        })
        .catch((e) => {
          reject(e);
        });
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
