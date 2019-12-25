<template>
  <b-row align-h="center">
    <b-col md="8" lg="6">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Password:" label-for="input-3">
          <b-form-input
            ref="passwrd"
            v-model="form.password"
            required
            type="password"
            placeholder="Enter at least 6 characters"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Confirm Password:" label-for="input-4">
          <b-form-input
            ref="confirmPassword"
            v-model="confirmPassword"
            required
            placeholder="Confirm password"
            type="password"
          ></b-form-input>
        </b-form-group>

        <b-form-group>
          <b-form-checkbox
            value="true"
            v-model="form.agreement"
            name="agreement"
            required
            >I agree to submit my data</b-form-checkbox
          >
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
          An error occurred during signup process. Please try later or see the
          console for detailed error msg.
        </p>
        <p class="text-success" v-if="success">
          You have successfully created a signup account!!!
        </p>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
/* eslint-disable */
import { mapActions } from "vuex";


export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        returnSecureToken: true,
        agreement: null
      },
      error: false,
      success: false,
      show: true,
      confirmPassword: ""
    };
  },
  methods: {
    ...mapActions(["signup"]),
    onSubmit(evt) {
      evt.preventDefault();
      if (this.form.password.length < 6) {
        this.$refs.passwrd.focus();
        alert("Enter 6 characters minimum!!!");
      }
      if (this.$refs["confirmPassword"].value !== this.form.password) {
        alert("Please confirm correct password!!!");
        this.$refs["confirmPassword"].focus();
        return;
      }
      // alert(JSON.stringify(this.form));
      this.error = false;
      
        this.signup(this.form).then(res => {
          this.success = res;
        }).catch(err => this.error = err);
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.error = false;
      this.success = false;
      this.form.email = "";
      this.form.password = "";
      this.$refs["confirmPassword"] = "";
      this.form.name = "";
      this.form.checked = [];
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
