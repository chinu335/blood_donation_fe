<template>
  <main class="main-class">
    <div class="page-heading">
      <h1>Request</h1>
      <hr />
    </div>

    <div class="request-menu">
      <div class="menu-add-request">
        <router-link
          :to="{ name: 'user-request' }"
          class="request-menu-add-request"
          style="text-decoration: none"
          >Make Request</router-link
        >
      </div>
      <div class="menu-find-request">
        <router-link
          :to="{ name: 'search-request' }"
          class="request-menu-search"
          style="text-decoration: none"
          >Find Request</router-link
        >
      </div>
    </div>

    <div class="add-request">
      <div class="form-heading">
        <h2>Request Form</h2>
        <hr />
      </div>
      <div class="request-form-container">
        <form class="request-form" @submit.prevent="addThisRequest">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name">Patient Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="requestForm.patientName"
                placeholder="Enter Patient Name"
                @blur="$v.requestForm.patientName.$touch()"
                :class="{
                  'is-invalid': shouldAppendErrorClass(
                    $v.requestForm.patientName
                  ),
                  'is-valid': shouldAppendValidClass(
                    $v.requestForm.patientName
                  ),
                }"
              />
              <div
                class="form-text text-muted"
                v-if="$v.requestForm.patientName.$error"
              >
                <small>Name is required</small>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="age">Age</label>
              <input
                type="text"
                class="form-control"
                id="age"
                v-model="requestForm.age"
                placeholder="Enter the Age"
                @blur="$v.requestForm.age.$touch()"
                :class="{
                  'is-invalid': shouldAppendErrorClass($v.requestForm.age),
                  'is-valid': shouldAppendValidClass($v.requestForm.age),
                }"
              />
              <div
                class="form-text text-muted"
                v-if="$v.requestForm.age.$error"
              >
                <small>Age is required</small>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="gender">Gender</label>
              <input
                type="text"
                class="form-control"
                id="gender"
                v-model="requestForm.gender"
                placeholder="Enter the Gender"
                @blur="$v.requestForm.gender.$touch()"
                :class="{
                  'is-invalid': shouldAppendErrorClass($v.requestForm.gender),
                  'is-valid': shouldAppendValidClass($v.requestForm.gender),
                }"
              />
              <div
                class="form-text text-muted"
                v-if="$v.requestForm.gender.$error"
              >
                <small>Gender is required</small>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="bloodGroup">Blood Group</label>
              <select
                id="bloodGroup"
                class="form-control"
                v-model="requestForm.bloodGroup"
                @blur="$v.requestForm.bloodGroup.$touch()"
                :class="{
                  'is-invalid': shouldAppendErrorClass(
                    $v.requestForm.bloodGroup
                  ),
                  'is-valid': shouldAppendValidClass($v.requestForm.bloodGroup),
                }"
              >
                <option selected>Choose Blood Group</option>
                <option
                  v-for="bloodGroup in allBloodGroups"
                  :key="bloodGroup"
                  :value="bloodGroup"
                >
                  {{ bloodGroup }}
                </option>
              </select>
              <div
                class="form-text text-muted"
                v-if="$v.requestForm.bloodGroup.$error"
              >
                <small>Blood Group is required</small>
              </div>
            </div>

            <div class="form-group col-md-6">
              <label for="units">Required Units</label>
              <input
                type="number"
                class="form-control"
                id="units"
                v-model="requestForm.units"
                placeholder="Enter the Require Blood Units"
                min="1"
                max="20"
                @blur="$v.requestForm.units.$touch()"
                :class="{
                  'is-invalid': shouldAppendErrorClass($v.requestForm.units),
                  'is-valid': shouldAppendValidClass($v.requestForm.units),
                }"
              />
              <div
                class="form-text text-muted"
                v-if="$v.requestForm.units.$error"
              >
                <small>units is required</small>
              </div>
            </div>

            <div class="form-group col-md-6">
              <label for="date">Required Date</label>
              <input
                type="date"
                class="form-control"
                id="date"
                v-model="requestForm.date"
                @blur="$v.requestForm.date.$touch()"
                :class="{
                  'is-invalid': shouldAppendErrorClass($v.requestForm.date),
                  'is-valid': shouldAppendValidClass($v.requestForm.date),
                }"
              />
              <div
                class="form-text text-muted"
                v-if="$v.requestForm.date.$error"
              >
                <small>date is required</small>
              </div>
            </div>

            <div class="form-group col-md-12">
              <label for="hospital-name">Hospital Name</label>
              <input
                type="text"
                class="form-control"
                id="hospital-name"
                placeholder="Enter the Hospital Name"
                v-model="requestForm.hospitalName"
                @blur="$v.requestForm.hospitalName.$touch()"
                :class="{
                  'is-invalid': shouldAppendErrorClass(
                    $v.requestForm.hospitalName
                  ),
                  'is-valid': shouldAppendValidClass(
                    $v.requestForm.hospitalName
                  ),
                }"
              />
              <div
                class="form-text text-muted"
                v-if="$v.requestForm.hospitalName.$error"
              >
                <small>Hospital name is required</small>
              </div>
            </div>

            <div class="form-group col-md-6">
              <label for="city">City</label>
              <select
                id="city"
                class="form-control"
                v-model="requestForm.location.city"
                @blur="$v.requestForm.location.city.$touch()"
                :class="{
                  'is-invalid': shouldAppendErrorClass(
                    $v.requestForm.location.city
                  ),
                  'is-valid': shouldAppendValidClass(
                    $v.requestForm.location.city
                  ),
                }"
              >
                <option selected>Choose City</option>
                <option v-for="city in cities" :key="city">{{ city }}</option>
              </select>
              <div
                class="form-text text-muted"
                v-if="$v.requestForm.location.city.$error"
              >
                <small>city is required</small>
              </div>
            </div>

            <div class="form-group col-md-6">
              <label for="state">State</label>
              <select
                id="state"
                class="form-control"
                v-model="requestForm.location.state"
                @blur="$v.requestForm.location.state.$touch()"
                :class="{
                  'is-invalid': shouldAppendErrorClass(
                    $v.requestForm.location.state
                  ),
                  'is-valid': shouldAppendValidClass(
                    $v.requestForm.location.state
                  ),
                }"
              >
                <option selected>Choose State</option>
                <option>Rajasthan</option>
              </select>
              <div
                class="form-text text-muted"
                v-if="$v.requestForm.location.state.$error"
              >
                <small>state is required</small>
              </div>
            </div>

            <div class="form-group col-md-6">
              <label for="email">Email Address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter the Email"
                v-model="requestForm.email"
                :class="{
                  'is-invalid': shouldAppendErrorClass($v.requestForm.email),
                  'is-valid': shouldAppendValidClass($v.requestForm.email),
                }"
              />
              <div
                class="form-text text-muted"
                v-if="$v.requestForm.email.$error"
              >
                <small>email is required</small>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="contact">Contact Number</label>
              <input
                type="number"
                class="form-control"
                id="contact"
                placeholder="Enter the Contact Number"
                v-model="requestForm.contact"
                :class="{
                  'is-invalid': shouldAppendErrorClass($v.requestForm.contact),
                  'is-valid': shouldAppendValidClass($v.requestForm.contact),
                }"
              />
              <div
                class="form-text text-muted"
                v-if="$v.requestForm.contact.$error"
              >
                <small>contact is required</small>
              </div>
            </div>

            <div class="form-group col-md-12">
              <label for="urgent-requirment">Urgent Requirment</label>
              <select
                id="state"
                class="form-control"
                v-model="requestForm.urgerntRequirment"
                :class="{
                  'is-invalid': shouldAppendErrorClass(
                    $v.requestForm.urgerntRequirment
                  ),
                  'is-valid': shouldAppendValidClass(
                    $v.requestForm.urgerntRequirment
                  ),
                }"
              >
                <option selected>Choose Requirment</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <div
                class="form-text text-muted"
                v-if="$v.requestForm.urgerntRequirment.$error"
              >
                <small>urgent requirment is required</small>
              </div>
            </div>
            <button type="submit" class="btn btn-secondary px-5 submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { addRequest } from "@/services/addRequest";
import { required, minLength } from "vuelidate/lib/validators";
import Vue from "vue";

export default {
  nmae: "AppMakeRequest",
  data() {
    return {
      allBloodGroups: ["A+", "B+", "AB+", "O+", "O-", "A-", "B-", "AB-"],

      cities: [
        "ajmer",
        "alwar",
        "banswara",
        "baran",
        "barmer",
        "bharatpur",
        "bhilwara",
        "bikaner",
        "bundi",
        "chittorgarh",
        "churu",
        "dausa",
        "dholpur",
        "dungarpur",
        "janumangarh",
        "jaipur",
        "jaisalmer",
        "jalore",
        "jhalawar",
        "jhunjhunu",
        "jodhpur",
        "karauli",
        "kota",
        "nagaur",
        "pali",
        "pratapgarh",
        "rajsamand",
        "sawai madhopur",
        "sikar",
        "sirohi",
        "sri ganganagar",
        "tonk",
        "udaipur",
      ],

      requestForm: {
        patientName: "",
        age: null,
        gender: "",
        bloodGroup: "",
        units: null,
        date: "",
        hospitalName: "",
        location: {
          city: "",
          state: "",
        },
        email: "",
        contact: null,
        urgerntRequirment: "",
      },
    };
  },
  validations: {
    requestForm: {
      patientName: {
        required,
      },
      age: {
        required,
      },
      gender: {
        required,
      },
      bloodGroup: {
        required,
      },
      units: {
        required,
      },
      date: {
        required,
      },
      hospitalName: {
        required,
        minLength: minLength(5),
      },
      location: {
        city: {
          required,
        },
        state: {
          required,
        },
      },
      email: {
        required,
      },
      contact: {
        required,
      },
      urgerntRequirment: {
        required,
      },
    },
  },
  methods: {
    addThisRequest() {
      // @Api Call
      // Argument pass - form data
      this.$v.requestForm.$touch();

      if (!this.$v.requestForm.$invalid) {
        addRequest(this.requestForm)
          .then(() => {
            Vue.$toast.open({
              message: "Request added successfully",
              duration: 3000,
              type: "success",
            });
          })
          .catch(() => {
            Vue.$toast.open({
              message: "Email is not register",
              duration: 3000,
              type: "error",
            });
          });

        this.requestForm.patientName = "";
        this.requestForm.age = "";
        this.requestForm.gender = "";
        this.requestForm.bloodGroup = "";
        this.requestForm.units = "";
        this.requestForm.date = "";
        this.requestForm.hospitalName = "";
        this.requestForm.location.city = "";
        this.requestForm.location.state = "";
        this.requestForm.email = "";
        this.requestForm.contact = "";
        this.requestForm.urgerntRequirment = "";
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

a {
  text-decoration: none;
}

a:hover {
  color: rgb(255, 173, 190);
}

.add-request {
  border-radius: 0.5em;
  width: 74vw;
  margin: auto;
  background: rgba(255, 211, 217, 0.3);
  padding: 0.5em 1.5em;
}

.page-heading {
  margin: 1.2em 12em;
}

.request-menu {
  display: flex;
  margin: 1.5em 12em;
  flex-direction: row;
  flex-wrap: wrap;
}

.request-menu-search,
.request-menu-add-request {
  color: #525456;
  border-radius: 0.1em;
}

.menu-add-request {
  padding: 0.6em 1em 0.5em 1em;
  border-left: 2px solid #dddbdb;
  border-right: 2px solid #dddbdb;
  border-bottom: 2px solid #dddbdb;
  font-weight: 600;
}

.menu-find-request {
  font-weight: 600;
  padding: 0.6em 1em 0.5em 1em;
  border-right: 2px solid #dddbdb;
  border-bottom: 2px solid #dddbdb;
}

.form-heading {
  text-align: center;
}

.form-heading h2 {
  margin: 0.5em 0;
}

.submit-button {
  color: black;
  margin: auto;
  margin-bottom: 0.5em;
  background: linear-gradient(to right, #f7b6c5, #f19585);
  text-decoration: none;
  border-radius: 3px;
}

.btn:hover {
  cursor: -moz-grab;
  color: rgb(133, 190, 216);
  background: linear-gradient(to right, #ee6988, #f19585);
}
</style>