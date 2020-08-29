/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";
import Cookies from "js-cookie";

//import { urlencoded } from "express";

/* Declare and import routes */
const Dashboard = () => import("../views/Dashboard.vue");
const Signin = () => import("../views/Login.vue");
const Profile = () => import("../views/Profile.vue");
const Hunted = () => import("../views/Hunted.vue");
const Bounty = () => import("../views/Bounty.vue");
const Leaderboard = () => import("../views/Leaderboard.vue");

const callback = () => import("../views/Callback.vue");
const gender = () => import("../components/pages/callBackForm/gender.vue");
const step1 = () => import("../components/pages/callBackForm/firstStep.vue");
const step2 = () => import("../components/pages/callBackForm/secondStep.vue");
const step3 = () => import("../components/pages/callBackForm/thStep.vue");
const step4 = () => import("../components/pages/callBackForm/likesStep.vue");
const step5 = () => import("../components/pages/callBackForm/lastStep.vue");

Vue.use(VueRouter);

const token = Cookies.get("session");
const firstTime = store.getters["user/getFirstTime"];
const signedIn = store.getters["user/signInCheck"];

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    redirect: "/signin",
    meta: {
      title: "IT@KMITL FRESHY 2020",
      requiresAuth: true,
      metaTags: [
        {
          name: "description",
          content: "For IT KMITL Freshy 17th only",
        },
      ],
    },
  },
  {
    path: "/continue",
    name: "Start",
    component: callback,
    meta: {
      title: "To be a freshy | IT@KMITL FRESHY 2020",
      requiresAuth: true,
      firstTimeAuth: null,
    },
    redirect: "continue/gender",
    beforeEnter: (to, from, next) => {
      if (to.matched.some((item) => item.path === "/continue")) {
        if (token && firstTime === 0) {
          next();
        } else if (token && firstTime === 1) {
          next({ path: "/profile" });
        } else {
          next({ path: "/signin" });
        }
      } else {
        next();
      }
    },
    children: [
      { path: "gender", component: gender, name: "Your Gender" },
      { path: "step1", component: step1, name: "Step 1" },
      { path: "step2", component: step2, name: "Step 2" },
      { path: "step3", component: step3, name: "Step 3" },
      { path: "step4", component: step4, name: "What you likes?" },
      { path: "step5", component: step5, name: "Your Gate" },
    ],
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    component: Leaderboard,
    meta: {
      title: "Leaderboard | IT@KMITL FRESHY 2020",
      requiresAuth: true,
    },
  },
  {
    path: "/bounty",
    name: "Bounty",
    component: Bounty,
    meta: {
      title: "Bounty | IT@KMITL FRESHY 2020",
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Your profile | IT@KMITL FRESHY 2020",
      requiresAuth: true,
    },
    children: [{ path: ":id", component: Profile, name: "Profile" }],
  },
  {
    path: "/hunted",
    name: "hunted",
    component: Hunted,
    meta: {
      title: "Hunted | IT@KMITL FRESHY 2020",
      requiresAuth: true,
    },
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
    meta: {
      title: "Sign in | IT@KMITL FRESHY 2020",
      metaTags: [
        {
          name: "description",
          content: "Sign in page for IT KMITL Freshy 17th only",
        },
      ],
    },
    beforeEnter: (to, from, next) => {
      if (token) {
        next({ path: "/profile" });
      } else {
        next();
      }
    },
  },
  {
    path: "*",
    redirect: "/signin",
    beforeEnter: (to, from, next) => {
      if (to.matched.some((item) => item.meta.requiresAuth)) {
        if (!token) {
          next({ path: "/signin" });
        } else {
          next();
        }
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeResolve((to, from, next) => {
  if (to.matched.some((item) => item.meta.requiresAuth)) {
    if (!signedIn && !token) {
      next({ path: "/signin", query: { from: to.path } });
    } else if (signedIn === true && token && to.name !== "Signin") {
      if (firstTime === 0 && to.fullPath) {
        next({ path: "/continue", query: { from: to.path } });
      } else if (firstTime === 1) {
        if (
          to.matched.some(
            (item) => item.path === "/continue" && item.path === "/signin"
          )
        ) {
          next({ path: "/profile", query: { from: to.path } });
        } else {
          next();
        }
      }
    }
  } else {
    next();
  }

  const nearestTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  const nearestMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // const prevNearestMeta = from.matched
  //   .slice()
  //   .reverse()
  //   .find((r) => r.meta && r.meta.metaTags);

  nearestTitle
    ? (document.title = nearestTitle.meta.title)
    : (document.title = "IT@KMITL FRESHY 2020");

  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map((el) => el.parentNode.removeChild(el));

  if (!nearestMeta) return next();

  nearestMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })

    .forEach((tag) => document.head.appendChild(tag));

  next();
});

export default router;
