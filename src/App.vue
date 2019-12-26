<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="!this.$store.getters.email" to="/"
        >Signup |
      </router-link>
      <router-link v-if="!this.$store.getters.email" to="/login"
        >Login</router-link
      >
      <router-link v-if="this.$store.getters.email" to="/about"
        >About</router-link
      >
    </div>
    <router-view />
    <button class="absolute" v-if="this.$store.getters.email" @click="store">
      Logout
    </button>
  </div>
</template>

<script>
import store from "./store/index.js";
import router from "./router/index.js";

export default {
  methods: {
    store: () => {
      store.dispatch("logout");
      router.replace("/login");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.absolute {
  position: absolute;
}
</style>
