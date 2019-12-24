<template>
  <b-container>
    <login-form></login-form>
  </b-container>
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/components/forms/LoginForm.vue";

export default {
  components: {
    LoginForm
  }
};
</script>
