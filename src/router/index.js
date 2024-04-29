import Router from "vue-router";
import AppHome from "@/components/AppHome";
import AppRequesters from "@/components/AppRequesters";
import AppPageNotFound from "@/components/AppPageNotFound";
import AppRegistration from "@/components/AppRegistration";
import AppLogin from "@/components/AppLogin";
import AppMakeRequest from "@/components/AppMakeRequest";
import AppSearchRequest from "@/components/AppSearchRequest";

import store from "../store";

const meta = {
  authorize: [],
};

const router = new Router({
  mode: "history",
  routes: [
    {
      name: "registration-page",
      path: "/",
      component: AppRegistration,
    },
    {
      name: "login-page",
      path: "/login",
      component: AppLogin,
    },
    {
      name: "home",
      path: "/home",
      component: AppHome,
      meta,
    },
    {
      name: "all-request-list",
      path: "/requesters",
      component: AppRequesters,
      meta,
    },
    {
      name: "user-request",
      path: "/request",
      component: AppMakeRequest,
      meta,
    },
    {
      name: "search-request",
      path: "/search",
      component: AppSearchRequest,
      meta,
    },
    {
      name: "page-not-found",
      path: "*",
      component: AppPageNotFound,
      meta,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.authorize && !store.getters.isAuthenticated) {
    next({
      name: "login-page",
    });
  } else {
    next();
  }
});

export default router;
