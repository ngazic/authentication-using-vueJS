/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import axiosDatabase from "../axios-database.js";
import router from "../router/index.js";

let apiKeyForSignup = "AIzaSyCHKRges3G-vbAlsrjyg6CyPzmQ-zAmJIo";
let apiKeyForLogin = "AIzaSyCHKRges3G-vbAlsrjyg6CyPzmQ-zAmJIo";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: null,
    idToken: null,
    idUser: null,
    expiresIn: null,
    error: null,
    users: null
  },
  getters: {
    email(state) {
      return state.email;
    }
  },
  mutations: {
    login(state, authData) {
      state.email = authData.email;
      state.idToken = authData.idToken;
      state.idUser = authData.idUser;
      state.expiresIn = authData.expiresIn;
      console.log("this is login mutation")
      console.log(state);
    },
    users(state, data) {
      state.users = data;
    },
    logout(state) {
      state.email = null;
    },
    autoLogout(state) {
      state.email = null;
      state.idToken = null;
      state.users = null;
      state.expiresIn = null;
    }
  },
  actions: {
    signup({ commit, state, dispatch }, form) {
      return axios
        .post("/accounts:signUp?key=" + apiKeyForSignup, {
          email: form.email,
          password: form.password,
          returnSecureToken: form.returnSecureToken
        }).then(res => {
          dispatch('getLoginData', res).then(res => {
            commit("login", res);
            dispatch("autoLogout");
          });
        }
        )
        .catch(err => {
          console.log(err)
          state.error = err;
          console.log(typeof err)
          console.log(JSON.stringify(err));
          for (let o in err)
            console.log(o)
        });
    },
    login({ commit, dispatch }, form) {
      return axios
        .post("/accounts:signInWithPassword?key=" + apiKeyForLogin, {
          email: form.email,
          password: form.password,
          returnSecureToken: true
        })
        .then(res => {
          dispatch('getLoginData', res).then(res => {
            commit("login", res);
            dispatch("getUsers");
            dispatch("autoLogout");
          });
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err.response.data.error);
          // alert(err.response.data.error.message);
          throw new Error(err.response.data.error.message);
        });

    },
    getUsers({ commit, state }) {
      axiosDatabase
        .get("/users.json?auth=" + state.idToken)
        .then(
          res => { console.log(res.data); commit("users", res.data) }
        )
        .catch(err => { console.log('this is error function of database'); console.log(err) })
    },
    logout({ commit }) {
      console.log('logout action')
      commit('logout');
    },
    autoLogout({ commit, state }) {
      setTimeout(() => {
        console.log("LOGIN OUT AUTOMATICALY")
        commit('autoLogout');
        router.replace("/login");
      }, state.expiresIn * 1000);
    },
    getLoginData(context, data) {
      console.log("this is get login data method");
      console.log(data);
      let authData = {};
      authData.idToken = data.data.idToken;
      authData.email = data.data.email;
      authData.idUser = data.data.localId;
      authData.expiresIn = data.data.expiresIn;
      return authData;
    }

  },
  modules: {}
});
