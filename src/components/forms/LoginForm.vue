<template>
  <b-row align-h="center">
    <b-col md="8" lg="6">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group label="Email address:" label-for="input-1">
          <b-form-input
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Password:" label-for="input-3">
          <b-form-input
            v-model="form.password"
            required
            type="password"
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      <b-card
        class="mt-3 text-danger"
        header="Login Information:"
        v-if="error || success"
      >
        <p class="text-danger" v-if="error">
          An error occurred during login process. Please try later or see the
          console for detailed error msg.
        </p>
        <p class="text-success" v-if="success">
          You have successfully logged in!!!
        </p>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: false,
      success: false,
      show: true
    };
  },
  methods: {
    ...mapActions(["login"]),
    onSubmit(evt) {
      evt.preventDefault();
      // alert(JSON.stringify(this.form));
      this.login(this.form)
        .then(() => alert("Login success!!!"))
        .catch(() => alert("Login error!!"));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.error = false;
      this.success = false;
      this.form.email = "";
      this.form.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style scoped></style>
