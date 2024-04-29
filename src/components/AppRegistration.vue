<template>
  <div class="container-class">
    <div class="registration-container">
      <form class="registration-form" @submit.prevent="userRegister()">
        <div class="form-heading">
          <h1>Sign Up For Donation Camp</h1>
          <hr />
        </div>
        <div class="user-name">
          <label for="name" class="input-label">Name</label>
          <input
            type="text"
            class="user-details"
            id="name"
            placeholder="Enter Your Name"
            v-model="form.name"
            @blur="$v.form.name.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.form.name),
              'is-valid': shouldAppendValidClass($v.form.name),
            }"
          />
        </div>

        <div class="user-email">
          <label for="email" class="input-label">Email Address</label>
          <input
            type="email"
            class="user-details"
            id="email"
            placeholder="Enter Your Email"
            v-model="form.email"
            @blur="$v.form.email.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.form.email),
              'is-valid': shouldAppendValidClass($v.form.email),
            }"
          />
          <div class="form-text text-muted" v-if="$v.form.email.$error">
            <div v-if="!$v.form.email.required">
              <small>Please enter Email ID</small>
            </div>
            <div v-else-if="!$v.form.email.email">
              <small>Enter Valid Email ID</small>
            </div>
          </div>
          <div class="email-info">
            <small id="emailHelp" class="email-help"
              >We'll never share your email with anyone else.</small
            >
          </div>
        </div>

        <div class="user-password">
          <label for="password" class="input-label">Password</label>
          <input
            type="password"
            class="user-details"
            id="password"
            placeholder="Enter Your Password"
            v-model="form.password"
            @blur="$v.form.password.$touch()"
            :class="{
              'is-valid': shouldAppendValidClass($v.form.password),
              'is-invalid': shouldAppendErrorClass($v.form.password),
            }"
          />
          <div class="form-text text-muted" v-if="$v.form.password.$error">
            <div v-if="!$v.form.password.required">
              <small>The password field is required</small>
            </div>
            <div v-else-if="!$v.form.password.containsUppercase">
              <small
                >The password must have atleast 1 uppercase character</small
              >
            </div>
            <div v-else-if="!$v.form.password.containsLowercase">
              <small
                >The password must have atleast 1 lowercase character</small
              >
            </div>
            <div v-else-if="!$v.form.password.containsNumber">
              <small>The password must have atleast 1 number</small>
            </div>
            <div v-else-if="!$v.form.password.containsSpecial">
              <small>The password must have a special character</small>
            </div>
            <div v-else-if="!$v.form.password.minLength">
              <small>The password MUST have atleast 8 characters</small>
            </div>
          </div>
        </div>

        <div class="login-page-link">
          <p>
            Already have an account?
            <router-link :to="{ name: 'login-page' }" class="router-link"
              >login here</router-link
            >
          </p>
        </div>
        <button type="submit" class="btn">Submit</button>
      </form>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import { required, email, minLength } from "vuelidate/lib/validators";
import { register } from "@/services/register";

export default {
  name: "AppRegistration",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
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
    userRegister() {
      this.$v.form.$touch();

      if (!this.$v.form.$invalid) {
        register(this.form)
          .then(() => {
            Vue.$toast.open({
              message: "Your account has been created! Please Login",
              duration: 5000,
              type: "success",
            });
            this.$router.push({ name: "login-page" });
          })
          .catch(() => {
            Vue.$toast.open({
              message: "Already Registered User",
              duration: 5000,
              type: "error",
            });
          });
      } else {
        console.log("invalid input values");
      }
    },

    shouldAppendErrorClass(field) {
      return field.$error;
    },
    shouldAppendValidClass(field) {
      return !field.invalid && field.$model && field.$dirty;
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Baloo Bhai 2", cursive;
}

.container-class {
  width: 100%;
  height: 100vh;
}

.container-class {
  background: url("../assets/img20.jpg");
  background-size: cover;
}

.registration-container {
  font-family: ui-monospace;
  width: 25%;
  margin: auto 60%;
  padding: 10% 0;
}

.user-details {
  border-radius: 0.2em;
  width: 100%;
  padding: 0.2em 0.5em;
  border: none;
}

.user-name {
  margin: 10px 0;
}
.user-email {
  margin: 10px 0;
}

.email-help {
  margin: 0.2em;
  font-weight: 500;
}

.user-password {
  margin-bottom: 2px;
}

.btn {
  border: 1px solid black;
  background: rgb(37, 2, 2, 0.9);
  color: rgb(253, 252, 252);
  /* margin: 0px 0px 5px 5px;*/
  padding: 2px 43px;
  width: 100%;
  font-family: Georgia, serif;
  border-radius: 0.2em;
}

.btn:hover {
  background-color: rgb(22, 13, 13);
  cursor: -moz-grab;
  color: rgb(204, 22, 22);
}

.login-page-link {
  margin: 3px 0px -7px 6px;
  padding-top: 3px;
  padding-bottom: 0;
  font-family: Georgia, serif;
  color: rgb(26, 14, 14);
}

.router-link {
  text-decoration: none;
  color: rgb(77, 99, 196);
}

.router-link:hover {
  color: rgb(233, 98, 98);
}

small {
  margin: 0 0.6em;
}
</style>