<template>
  <b-container>
    <signup-form></signup-form>
  </b-container>
</template>

<script>
// @ is an alias to /src
import SignupForm from "@/components/forms/SignupForm.vue";

export default {
  components: {
    SignupForm
  }
};
</script>
