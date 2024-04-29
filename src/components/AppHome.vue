<template>
  <main class="main-class">
    <div class="loading" v-if="status === 'Loading'">
      <h3>Hey!</h3>
      <h5>We are fetching Donors ... Please wait !!!</h5>
    </div>

    <div class="donor-container" v-if="status === 'Loaded'">
      <h1 style="display: inline">List of Donors</h1>
      <button class="donor-button" @click="showDonationForm()">
        Become Donor
      </button>
      <hr />
      <div class="search-details-container">
        <form class="search-donor-details">
          <div class="select-group">
            <label for="search-blood-group" class="label-class">
              Blood Group</label
            >
            <select
              id="search-blood-group"
              class="select-blood-group"
              v-model="group"
            >
              <option value=""></option>
              <option
                v-for="bloodGroup in allBloodGroups"
                :value="bloodGroup"
                :key="bloodGroup"
              >
                {{ bloodGroup }}
              </option>
            </select>
          </div>
          <div class="select-city">
            <label for="search-by-city" class="label-class">City</label>
            <select
              id="search-by-city"
              class="select-city-name"
              v-model="parameters.city"
            >
              <option value=""></option>
              <option v-for="city in cities" :key="city" :value="city">
                {{ city }}
              </option>
            </select>
          </div>
          <button class="btn" @click="findDonors()">Search</button>
        </form>
      </div>

      <div class="donor-info">
        <table class="donor-table">
          <thead>
            <tr>
              <th class="table-headings">S.No.</th>
              <th class="table-headings">Name</th>
              <th class="table-headings">Age</th>
              <th class="table-headings">Blood Group</th>
              <th class="table-headings">Location</th>
              <th class="table-headings">Email</th>
              <th class="table-headings">Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(donor, index) in allDonors" :key="donor._id">
              <th class="donor-data">{{ index + 1 }}</th>
              <td class="donor-data">{{ donor.name }}</td>
              <td class="donor-data">{{ donor.age }}</td>
              <td class="donor-data">{{ donor.bloodGroup }}</td>
              <td class="donor-data">
                {{ donor.location.city }} ({{ donor.location.state }})
              </td>
              <td class="donor-data">{{ donor.email }}</td>
              <td class="donor-data">{{ donor.contactNumber }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="loading" v-if="resultStatus">
      <h5>No Donor is present in this City...try to find in another city</h5>
    </div>

    <div class="add-donor-container" v-if="showForm">
      <div class="form-heading">
        <h2>Blood Donation Form</h2>
        <hr />
      </div>
      <div class="donor-form-container">
        <form class="donor-form" @submit.prevent="becomeDonor">
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="donorForm.name"
                placeholder="Enter Name"
                @blur="$v.donorForm.name.$touch()"
                :class="{
                  'is-invalid': shouldAppendErrorClass($v.donorForm.name),
                  'is-valid': shouldAppendValidClass($v.donorForm.name),
                }"
              />
              <div class="form-text text-muted" v-if="$v.donorForm.name.$error">
                <small>Name is required</small>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="age">Age</label>
              <input
                type="text"
                class="form-control"
                id="age"
                v-model="donorForm.age"
                placeholder="Enter the Age"
                @blur="$v.donorForm.age.$touch()"
                :class="{
                  'is-invalid': shouldAppendErrorClass($v.donorForm.age),
                  'is-valid': shouldAppendValidClass($v.donorForm.age),
                }"
              />
              <div class="form-text text-muted" v-if="$v.donorForm.age.$error">
                <small>Age is required</small>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="bloodGroup">Blood Group</label>
              <select
                id="bloodGroup"
                class="form-control"
                v-model="donorForm.bloodGroup"
                @blur="$v.donorForm.bloodGroup.$touch()"
                :class="{
                  'is-invalid': shouldAppendErrorClass($v.donorForm.bloodGroup),
                  'is-valid': shouldAppendValidClass($v.donorForm.bloodGroup),
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
                v-if="$v.donorForm.bloodGroup.$error"
              >
                <small>Blood Group is required</small>
              </div>
            </div>

            <div class="form-group col-md-12">
              <label for="email">Email Address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter the Email"
                v-model="donorForm.email"
                :class="{
                  'is-invalid': shouldAppendErrorClass($v.donorForm.email),
                  'is-valid': shouldAppendValidClass($v.donorForm.email),
                }"
              />
              <div
                class="form-text text-muted"
                v-if="$v.donorForm.email.$error"
              >
                <small>email is required</small>
              </div>
            </div>

            <div class="form-group col-md-12">
              <label for="contact">Contact Number</label>
              <input
                type="number"
                class="form-control"
                id="contactNumber"
                placeholder="Enter the Contact Number"
                v-model="donorForm.contactNumber"
                :class="{
                  'is-invalid': shouldAppendErrorClass(
                    $v.donorForm.contactNumber
                  ),
                  'is-valid': shouldAppendValidClass(
                    $v.donorForm.contactNumber
                  ),
                }"
              />
              <div
                class="form-text text-muted"
                v-if="$v.donorForm.contactNumber.$error"
              >
                <small>contact is required</small>
              </div>
            </div>

            <div class="form-group col-md-6">
              <label for="city">City</label>
              <select
                id="city"
                class="form-control"
                v-model="donorForm.city"
                @blur="$v.donorForm.city.$touch()"
                :class="{
                  'is-invalid': shouldAppendErrorClass($v.donorForm.city),
                  'is-valid': shouldAppendValidClass($v.donorForm.city),
                }"
              >
                <option selected>Choose City</option>
                <option v-for="city in cities" :key="city">{{ city }}</option>
              </select>
              <div class="form-text text-muted" v-if="$v.donorForm.city.$error">
                <small>city is required</small>
              </div>
            </div>

            <div class="form-group col-md-6">
              <label for="state">State</label>
              <select
                id="state"
                class="form-control"
                v-model="donorForm.state"
                @blur="$v.donorForm.state.$touch()"
                :class="{
                  'is-invalid': shouldAppendErrorClass($v.donorForm.state),
                  'is-valid': shouldAppendValidClass($v.donorForm.state),
                }"
              >
                <option selected>Choose State</option>
                <option>Rajasthan</option>
              </select>
              <div
                class="form-text text-muted"
                v-if="$v.donorForm.state.$error"
              >
                <small>state is required</small>
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-secondary px-5 submit-button my-btn"
            >
              Submit
            </button>
            <button
              type="submit"
              class="btn btn-secondary px-5 submit-button my-btn"
              @click="hideForm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>


<script>
import { getAllDonors, searchDonors, addDonor } from "@/services/donor";
import { required, minLength } from "vuelidate/lib/validators";
import Vue from "vue";

export default {
  name: "AppHome",
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

      allDonors: [],
      status: "Loading",
      resultStatus: false,
      showForm: false,
      donorForm: {
        name: "",
        age: null,
        bloodGroup: "",
        email: "",
        contactNumber: null,
        city: "",
        state: "",
      },
      group: "",
      parameters: {
        bloodGroup: "",
        city: "",
      },
    };
  },

  validations: {
    donorForm: {
      name: {
        required,
      },
      age: {
        required,
      },
      bloodGroup: {
        required,
      },
      email: {
        required,
      },
      contactNumber: {
        required,
      },
      city: {
        required,
        minLength: minLength(3),
      },
      state: {
        required,
        minLength: minLength(3),
      },
    },
  },

  created() {
    getAllDonors()
      .then((data) => {
        this.allDonors = data;
        this.status = "Loaded";
      })
      .catch((error) => console.log(error.message));
  },

  methods: {
    showDonationForm() {
      this.showForm = true;
    },

    hideForm() {
      this.showForm = false;
    },

    findDonors() {
      // giving search form value to the parameter ( bloodGroup )
      this.parameters.bloodGroup = this.group;
      this.status = "Loading";
      // getting encoded blood group
      this.parameters.bloodGroup = this.encodeBloodGrouop(
        this.parameters.bloodGroup
      );
      // console.log( this.parameters )
      searchDonors(this.parameters)
        .then((searchedDonors) => {
          this.allDonors = searchedDonors;
          this.status = "Loaded";
          this.resultStatus = false;
          if (searchedDonors.length === 0) {
            this.resultStatus = true;
          }
        })
        .catch((error) => {
          this.status = "Error";
          console.log(error);
        });
    },

    becomeDonor() {
      let donorDetails = {
        name: this.donorForm.name,
        age: this.donorForm.age,
        bloodGroup: this.donorForm.bloodGroup,
        email: this.donorForm.email,
        contactNumber: this.donorForm.contactNumber,
        location: {
          city: this.donorForm.city,
          state: this.donorForm.state,
        },
      };

      this.$v.donorForm.$touch();

      if (!this.$v.donorForm.$invalid) {
        addDonor(donorDetails)
          .then(() => {
            Vue.$toast.open({
              message: "Donor Registration Done",
              duration: 3000,
              type: "success",
            });
          })
          .catch(() => {
            Vue.$toast.open({
              message: "User not register OR Already Donor",
              duration: 3000,
              type: "error",
            });
          });

        this.donorForm.name = "";
        this.donorForm.age = "";
        this.donorForm.bloodGroup = "";
        this.donorForm.email = "";
        this.donorForm.contactNumber = "";
        this.donorForm.city = "";
        this.donorForm.state = "";
      }
    },

    encodeBloodGrouop(bloodGroup) {
      if (this.allBloodGroups.includes(bloodGroup)) {
        if (bloodGroup === "O+") {
          bloodGroup = "O%2b";
        } else if (bloodGroup === "O-") {
          bloodGroup = "O-";
        } else if (bloodGroup === "A+") {
          bloodGroup = "A%2b";
        } else if (bloodGroup === "A-") {
          bloodGroup = "A-";
        } else if (bloodGroup === "B+") {
          bloodGroup = "B%2b";
        } else if (bloodGroup === "B-") {
          bloodGroup = "B-";
        } else if (bloodGroup === "AB+") {
          bloodGroup = "AB%2b";
        } else if (bloodGroup === "AB-") {
          bloodGroup = "AB-";
        }
      }
      return bloodGroup;
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

.loading {
  background-color: rgba(247, 116, 116, 0.6);
  border-radius: 0.5em;
  padding: 2em;
  text-align: center;
  width: 75%;
  margin: auto;
  margin-top: 2em;
}

.donor-container {
  width: 75%;
  margin: auto;
  margin-top: 1.5em;
}

.donor-button {
  margin: 0em 0em 0em 48em;
  padding: 0 0.6em;
  color: black;
  text-align: center;
  background: linear-gradient(to right, #ffd4de, #f1dcd8);
  text-decoration: none;
  border-radius: 0.3em;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid black;
}

.table-headings {
  padding: 14px 20px;
  text-align: center;
  font-weight: 700;
  background: rgba(255, 162, 174, 0.4);
}

tr:hover {
  background: rgb(233, 226, 226);
}

.donor-data {
  text-align: center;
  padding: 25px;
}

.search-details-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
  justify-content: center;
}

.select-group,
.select-city {
  display: inline-block;
  margin: 0 25px;
}

.select-blood-group {
  border: 2px solid black;
  width: 70px;
  margin: 0 4px;
  border: 1px solid rgba(255, 162, 174);
  border-radius: 4px;
}

.select-city-name {
  border: 2px solid black;
  width: 180px;
  margin: 0 4px;
  border: 1px solid rgba(255, 162, 174);
  border-radius: 4px;
}

.btn {
  color: black;
  text-align: center;
  background: linear-gradient(to right, #f8c5d1, #f1dcd8);
  text-decoration: none;
  border: 1.5px solid black;
  border-radius: 0.3em;
  margin: 0px 0px 5px 35px;
  padding: 0px 45px;
  font-weight: 400;
}

.btn:hover,
.donor-button:hover {
  cursor: -moz-grab;
  color: rgb(133, 190, 216);
  background: linear-gradient(to right, #ee6988, #f19585);
}

/* 
========================
Donation Form CSS 
========================
*/

.form-heading {
  text-align: center;
  width: 60%;
  margin: auto;
}

.add-donor-container {
  position: fixed;
  background: rgba(231, 226, 227, 0.925);
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 100;
  opacity: 1;
  border: 1px solid rgb(250, 245, 245);
  margin: auto;
}

.donor-form-container {
  border: 1px solid rgb(214, 203, 213);
  border-radius: 0.5em;
  width: 60vw;
  margin: auto;
  position: relative;
  top: 0;
  background: rgb(53, 53, 53);
  padding: 0 1.5em;
}

.about-patient {
  text-align: center;
}

.form-heading hr {
  border: 0.05px solid rgb(8, 8, 8);
}

.donor-form p {
  margin: 1em;
  padding: 0 1.5em;
}

.donor-form label {
  color: rgb(253, 253, 253);
  padding: 0.2em;
}

.my-btn {
  color: black;
  text-align: center;
  background: linear-gradient(to right, #f8c5d1, #f1dcd8);
  text-decoration: none;
  border: 1.5px solid black;
  border-radius: 0.3em;
  font-weight: 400;
  width: 17%;
  margin: auto;
  margin-bottom: 0.7em;
}

small {
  color: rgb(238, 228, 228);
}
</style>


