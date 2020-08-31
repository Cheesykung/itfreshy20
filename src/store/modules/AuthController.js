import firebase from "firebase/app";
import "firebase/auth";
import Cookies from "js-cookie";
import router from "../../router"
//import mutations from "./user";
import axios from "axios";

var provider = new firebase.auth.FacebookAuthProvider();
provider.addScope("email");

const API = "https://us-central1-itfreshy2020.cloudfunctions.net/test/";

const actions = {
  linkActions({ commit }, payload) {
    commit("user/setLink", payload, { root: true });
  },

  async signInWithFB({ dispatch }) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          var token = result.credential.accessToken;
          Cookies.set("user", token, {
            sameSite: "none",
            secure: true,
          });
          //เก็บสถานะ user ว่าเข้าใช้งานครั้งแรกหรือไม่ไว้ใน localStorage
          localStorage.setItem(
            "firstTime",
            result.additionalUserInfo.isNewUser
          );

          dispatch("setAuth", result.user.providerData[0]);

          if (result.additionalUserInfo.isNewUser === true)
            router.replace("/continue");
          else { router.replace("/profile"); }

          resolve(result);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  setAuth({ commit }, payload) {
    commit("user/setProfile", payload, {
      root: true,
    });
  },

  setNewUser({ commit }, payload) {
    commit("user/setFirstTime", payload, {
      root: true,
    });
  },

  async sendToken() {
    try {
      const idToken = await firebase.auth().currentUser.getIdToken();
      await axios
        .get(API + "fire", {
          headers: {
            "FIREBASE_AUTH_TOKEN": idToken,
          },
        })
        .then((res) => {
          console.log(res.status);
        });
    } catch (e) {
      console.log(e);
    }
  },

  async signOut({ commit }) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then((res) => {
          Cookies.remove("user");
          localStorage.removeItem("firstTime");
          commit("user/clearProfile", { root: true });
          window.location.replace("/signin");
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};

export default actions;
