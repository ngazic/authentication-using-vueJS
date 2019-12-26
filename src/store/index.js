/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import axiosDatabase from "../axios-database.js";

let apiKeyForSignup = "AIzaSyCHKRges3G-vbAlsrjyg6CyPzmQ-zAmJIo";
let apiKeyForLogin = "AIzaSyCHKRges3G-vbAlsrjyg6CyPzmQ-zAmJIo";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: null,
    idToken: null,
    idUser: null,
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
    },
    users(state, data) {
      state.users = data;
    },
    logout(state) {
      state.email = null;
    }
  },
  actions: {
    signup({ commit, state }, form) {
      return new Promise((resolve, reject) => {
        axios
          .post("/accounts:signUp?key=" + apiKeyForSignup, {
            email: form.email,
            password: form.password,
            returnSecureToken: form.returnSecureToken
          }).then(res => {
            console.log('THIS IS THEN FUNCION!!!')
            let authData = {};
            authData.idToken = res.data.idToken;
            authData.email = res.data.email;
            authData.idUser = res.data.localId;
            commit("login", authData);
            resolve(true);
          }
          )
          .catch(err => {
            console.log('im in the cathch function')
            // eslint-disable-next-line no-console
            console.log(err)
            state.error = err;
            console.log(typeof err)
            console.log(JSON.stringify(err));
            for (let o in err)
              console.log(o)
            reject(true);
          });
      });
    },
    login({ commit }, form) {
      return axios
          .post("/accounts:signInWithPassword?key=" + apiKeyForLogin, {
            email: form.email,
            password: form.password,
            returnSecureToken: true
          })
          .then(res => {
            let authData = {};
            authData.idToken = res.data.idToken;
            authData.email = res.data.email;
            authData.idUser = res.data.localId;
            commit("login", authData);
            this.dispatch("getUsers");
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
        .catch(err => { console.log('this is error function of database'); console.log(err)})
    },
    logout({ commit }) {
      console.log('logout action')
      commit('logout');
    }
  },
  modules: {}
});
