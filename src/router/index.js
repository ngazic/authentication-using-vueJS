import Vue from "vue";
import VueRouter from "vue-router";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
// import VueAxios from "vue-axios";
import vuex from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "signup",
    component: Signup
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    // Adding protection to the route using beforeEnter method
    // only authenticated users can access this route
    beforeEnter: (to, from, next) => {
      if (!vuex.getters.email) {
        next("/login");
      } else {
        next();
      }
    }
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
