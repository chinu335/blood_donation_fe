<template>
  <div class="form-container">
    <form
      class="container col-3 py-2 rounded form-class"
      @submit.prevent="login"
    >
      <h1>Login</h1>
      <hr />
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control form-control-md"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="form.email"
          @blur="$v.form.email.$touch()"
          :class="{
            'is-invalid': shouldAppendErrorClass($v.form.email),
            'is-valid': shouldAppendValidClass($v.form.email),
          }"
        />
        <div class="form-text text-muted mx-1" v-if="$v.form.email.$error">
          <div v-if="!$v.form.email.required">
            <small>The email field is required </small>
          </div>
          <div v-else-if="!$v.form.email.email">
            <small>Invalid Email address</small>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control form-control-md"
          id="password"
          placeholder="Password"
          v-model="form.password"
          @blur="$v.form.password.$touch()"
          :class="{
            'is-invalid': shouldAppendErrorClass($v.form.password),
            'is-valid': shouldAppendValidClass($v.form.password),
          }"
        />
        <div class="form-text text-muted mx-1" v-if="$v.form.password.$error">
          <div v-if="!$v.form.password.required">
            <small>The password field is required</small>
          </div>
          <div v-if="!$v.form.password.minLength">
            <small>The Password MUST contain 8 characters</small>
          </div>
          <div v-if="!$v.form.password.containsUppercase">
            <small
              >The password must have atleast 1 uppercase character [A-Z]</small
            >
          </div>
          <div v-if="!$v.form.password.containsLowercase">
            <small>The password must have 1 lowercase letter [a-z]</small>
          </div>
          <div v-if="!$v.form.password.containsNumber">
            <small>The password must have atleast 1 number [0-9]</small>
          </div>
          <div v-if="!$v.form.password.containsSpecial">
            <small
              >The password must have atleast 1 special character form {
              #?!@$%^&*- }</small
            >
          </div>
        </div>
      </div>
      <p class="text-class">
        Do not have an account already?
        <router-link :to="{ name: 'registration-page' }"
          >Register here</router-link
        >
      </p>
      <button type="submit" class="btn btn-dark btn-sm btn-block">
        Submit
      </button>
    </form>
  </div>
</template>


<script>
import Vue from "vue";
import { email, required, minLength } from "vuelidate/lib/validators";
// import { authLogin } from '@/services/authLogin';

export default {
  name: "AppLogin",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  validations: {
    form: {
      email: {
        email,
        required,
      },
      password: {
        required,
        minLength: minLength(6),

        containsUppercase: function (value) {
          return /[A-Z]/.test(value);
        },
        containsLowercase: function (value) {
          return /[a-z]/.test(value);
        },
        containsNumber: function (value) {
          return /[0-9]/.test(value);
        },
        containsSpecial: function (value) {
          return /[!@#$%^&*?]/.test(value);
        },
      },
    },
  },

  methods: {
    shouldAppendErrorClass(field) {
      return field.$error;
    },

    shouldAppendValidClass(field) {
      return !field.invalid && field.$model && field.$dirty;
    },

    login() {
      this.$v.form.$touch();

      if (!this.$v.form.$invalid) {
        this.$store
          .dispatch("login", this.form)
          .then(() => this.$router.push({ name: "home" }))
          .catch((error) => {
            Vue.$toast.open({
              message: error.message,
              duration: 5000,
              type: "error",
            });
          });
      } else {
        console.log("Invalid input values");
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Baloo Bhai 2", cursive;
}

a {
  color: rgb(77, 99, 196);
}
a:hover {
  text-decoration: none;
  color: rgb(233, 98, 98);
}

.form-container {
  background-image: url("../assets/img18.jpg");
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 8em 0em;
}

hr {
  color: rgb(10, 10, 10);
}

.form-class {
  margin: auto;
  margin-left: 60em;
  font-family: ui-monospace;
}

button {
  font-family: Georgia, serif;
  margin: 0 0.1em;
}

button:hover {
  background-color: rgb(54, 43, 43);
  cursor: -moz-grab;
  color: rgb(204, 22, 22);
}

.text-class {
  font-weight: 500;
  margin: 1em 0.3em;
}
</style>