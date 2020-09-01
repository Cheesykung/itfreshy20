/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "../middleware/services/AuthHeaders";
import Cookies from "js-cookie";
import store from "../store";

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

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    redirect: firebase.auth().currentUser ? "/dashboard" : "/signin",
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
      requiresFirstTime: true,
      hideNavigation: true,
    },
    redirect: "continue/gender",
    children: [
      {
        path: "gender",
        component: gender,
        name: "Your Gender",
        meta: {
          requiresAuth: true,
          requiresFirstTime: true,
          hideNavigation: true,
        },
      },
      {
        path: "step1",
        component: step1,
        name: "Step 1",
        meta: {
          requiresAuth: true,
          requiresFirstTime: true,
          hideNavigation: true,
        },
      },
      {
        path: "step2",
        component: step2,
        name: "Step 2",
        meta: {
          requiresAuth: true,
          requiresFirstTime: true,
          hideNavigation: true,
        },
      },
      {
        path: "step3",
        component: step3,
        name: "Step 3",
        meta: {
          requiresAuth: true,
          requiresFirstTime: true,
          hideNavigation: true,
        },
      },
      {
        path: "step4",
        component: step4,
        name: "What you likes?",
        meta: {
          requiresAuth: true,
          requiresFirstTime: true,
          hideNavigation: true,
        },
      },
      {
        path: "step5",
        component: step5,
        name: "Your Gate",
        meta: {
          requiresAuth: true,
          requiresFirstTime: true,
          hideNavigation: true,
        },
      },
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
    beforeEnter: (to, from, next) => {
      if (
        localStorage.getItem("firstTime") === "true" &&
        firebase.auth().currentUser &&
        !to.matched.some(({ path }) => path === "/continue")
      ) {
        next({ path: "/continue" });
      } else {
        next();
      }
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
    beforeEnter: (to, from, next) => {
      if (
        firebase.auth().currentUser &&
        localStorage.getItem("firstTime") === "true" &&
        to.matched.some(({ path }) => path !== "/continue")
      ) {
        next({ path: "/continue" });
      } else {
        next();
      }
    },
    meta: {
      title: "Sign in | IT@KMITL FRESHY 2020",
      requiresAuth: false,
      hideNavigation: true,
      metaTags: [
        {
          name: "description",
          content: "Sign in page for IT KMITL Freshy 17th only",
        },
      ],
    },
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const firstTime = localStorage.getItem("firstTime");
  //const firstTime = store.getters["user/getFirstTime"];
  const token = Cookies.get("user");
  const user = firebase.auth().currentUser;

  if (to.matched.some((item) => item.meta.requiresAuth)) {
    if (!user && !token && to.matched.some(({ path }) => path !== "/signin")) {
      next({ path: "/signin" });
    } else if (
      !to.matched.some((item) => item.meta.requiresFirstTime) &&
      firstTime == "true"
    ) {
      next({ path: "/continue" });
    } else if (
      to.matched.some((item) => item.meta.requiresFirstTime) &&
      firstTime == "true"
    ) {
      next();
    } else if (
      to.matched.some((item) => item.meta.requiresFirstTime) &&
      firstTime == "false"
    ) {
      next({ path: '/profile' });
    } else {
      next();
    }
  } else {
    if (user && token) {
      if (
        to.matched.some((item) => item.meta.requiresFirstTime) &&
        firstTime == "true"
      )
        next();
      else next({ path: "/profile" });
    } else next();
  }

  const nearestTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  const nearestMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

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
