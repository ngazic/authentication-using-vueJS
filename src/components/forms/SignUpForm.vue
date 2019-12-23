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

        <b-form-group label="Gender:" label-for="input-3">
          <b-form-select
            v-model="form.gender"
            :options="genders"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group>
          <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
            <b-form-checkbox value="accept_the_agreement"
              >I agree to submit my data</b-form-checkbox
            >
          </b-form-checkbox-group>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
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
        gender: null,
        checked: []
      },
      genders: [{ text: "Select Gender", value: null }, "Male", "Female"],
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      // alert(JSON.stringify(this.form));
      // eslint-disable-next-line no-console
      axios.post('/users.json',this.form).then(res => {console.log('im requesting the data');console.log(res)}).catch(err => {console.log('this is message from the error of get request');console.log(err)});
      setTimeout(()=>{
      // eslint-disable-next-line no-console
      axios.get('/node1.json').then(res=>this.form=res.data).catch(err=>console.log(err));

      },3000)
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
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
