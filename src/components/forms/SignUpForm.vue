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

        <b-form-group label="Your Name:" label-for="input-2">
          <b-form-input
            v-model="form.name"
            required
            placeholder="Enter name"
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

        <b-form-group label="Confirm Password:" label-for="input-4">
          <b-form-input
            ref="confirmPassword"
            v-model="confirmPassword"
            required
            placeholder="Confirm password"
            type="password"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Gender:" label-for="input-5">
          <b-form-select
            v-model="form.gender"
            :options="genders"
            required
          ></b-form-select>
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
import axios from "axios";

export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        password: "",
        gender: null,
        agreement: null
      },
      error: false,
      success: false,
      genders: [{ text: "Select Gender", value: null }, "Male", "Female"],
      show: true,
      confirmPassword: ""
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.$refs["confirmPassword"].value !== this.form.password) {
        alert("Please confirm correct password!!!");
        this.$refs["confirmPassword"].focus();
        return;
      }
      // alert(JSON.stringify(this.form));
      this.error = false;
      axios
        .post("/users.json", this.form)
        .then(res => {
          this.success = true;
          // eslint-disable-next-line no-console
          console.log("im requesting the data");
          // eslint-disable-next-line no-console
          console.log(res);
        })
        .catch(err => {
          this.error = true;
          // eslint-disable-next-line no-console
          console.log(err);
        });
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
      this.form.gender = null;
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
