/* eslint-disable */
import firebase from "firebase/app";
import "firebase/auth";
import Cookies from "js-cookie";
import axios from "axios";
import router from "../../router";

const API = "https://us-central1-itfreshy2020.cloudfunctions.net/";

const actions = {
  linkActions({ commit }, payload) {
    commit("user/setLink", payload, { root: true });
  },

  signInWithFB({ dispatch }) {
    let provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope("public_profile");
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          Cookies.set("user", token, {
            sameSite: "none",
            secure: true,
          });
          if (result.credential.accessToken) {
          dispatch("setAuth", result.user.providerData[0]);
          dispatch("sendToken").then((res) => {
            if (res.data.data === 'newuser') {
              router.push('/continue')
            } else {
              router.push('/profile')
            }}
          );
          }
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

  setNewUser({ state, commit }, payload) {
    commit("setFirstTime", payload, {
      root: false,
    });
  },

  sendToken(context) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .currentUser.getIdToken()
        .then((res) => {
          axios
            .get(API + "test/fire", {
              headers: {
                "FIREBASE_AUTH_TOKEN": res,
              },
            })
            .then((result) => {
              localStorage.setItem(
                "firstTime",
                result.data.data === "newuser" ? true : false
              );

              context.dispatch(
                "setNewUser",
                result.data.data === "newuser" ? "true" : "false",
                { root: false }
              );

              resolve(result);
            })
            .catch((e) => {
              reject(e);
            })
        });
    });
  },

  async signOut(context) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then((res) => {
          Cookies.remove("user");
          localStorage.removeItem("firstTime");
          context.commit("clearProfile", { root: false });
          router.push({ path: "/signin" }).then(router.go());
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};

export default actions;
