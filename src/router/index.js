/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
//import { urlencoded } from "express";

/* Declare and import routes */
const Dashboard = () => import("../views/Dashboard.vue");
const Signin = () => import("../views/Login.vue");
const Profile = () => import("../views/Profile.vue");
const Hunted = () => import("../views/Hunted.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    redirect: "/signin",

    meta: {
      title: "IT@KMITL FRESHY 2020",
      metaTags: [
        {
          name: "description",
          content: "For IT KMITL Freshy 17th only",
        },
      ],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Your profile | IT@KMITL FRESHY 2020",
    },
    children: [{ path: ":id", component: Profile, name: "Profile" }],
  },
  {
    path: "/hunted",
    name: "hunted",
    component: Hunted,
    meta: {
      title: "Hunted | IT@KMITL FRESHY 2020",
    }
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
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
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
