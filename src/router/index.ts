import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import loginVue from "@/views/login.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "login",
    component: loginVue,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/register.vue"),
  },
  {
    path: "/forgetpassword",
    name: "forgetpassword",
    component: () => import("@/views/forgetPassword.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/indexPage.vue"),
    children: [
      {
        path: "homepage",
        name: "homepage",
        component: () => import("@/views/home/homePage.vue"),
      },
      {
        path: "showpage",
        name: "showpage",
        component: () => import("@/views/home/showPage.vue"),
      },
      {
        path: "transmarket",
        name: "transmarket",
        component: () => import("@/views/home/transMarket.vue"),
      },
      {
        path: "todaynews",
        name: "todaynews",
        component: () => import("@/views/home/todayNews.vue"),
      },
      {
        path: "recordstrans",
        name: "recordstrans",
        component: () => import("@/views/home/recordsTrans.vue"),
      },
      {
        path: "about",
        name: "about",
        component: () => import("@/views/home/aboutPage.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/FirstPage.vue"),
    children: [
      {
        path: "controllermanage",
        name: "controllermanage",
        component: () => import("@/views/admin/controllerManage.vue"),
      },
      {
        path: "usermanage",
        name: "usermanage",
        component: () => import("@/views/admin/userManage.vue"),
      },
      {
        path: "producesmanage",
        name: "producesmanage",
        component: () => import("@/views/admin/producesManage.vue"),
      },
      {
        path: "recordsmanage",
        name: "recordsmanage",
        component: () => import("@/views/admin/recordsManage.vue"),
      },
      {
        path: "categorymanage",
        name: "categorymanage",
        component: () => import("@/views/admin/categoryManage.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
