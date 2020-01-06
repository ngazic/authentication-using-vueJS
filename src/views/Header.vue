<template>
  <div id="nav">
    <router-link
      tag="li"
      active-class="active"
      exact
      v-if="!this.$store.getters.email"
      to="/"
      ><a>Sign Up</a>
    </router-link>
    <router-link
      tag="li"
      v-if="!this.$store.getters.email"
      active-class="active"
      to="/login"
    >
      <a>Log In</a></router-link
    >
    <router-link
      tag="li"
      v-if="this.$store.getters.email"
      active-class="active"
      to="/about"
    >
      <a>About</a></router-link
    >
  </div>
</template>
<style scoped>
li {
  list-style: none;
  display: inline-block;
  background-color: rgba(223, 100, 90, 0.2);
  padding: 0 5px;
}
li:not(:first-child) {
  border-left: 1px solid black;
}
li a:hover {
  background: white;
  text-decoration: none;
}
.active {
  background: red;
}
</style>
