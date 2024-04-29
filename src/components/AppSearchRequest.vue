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

    <section class="search-form">
      <h2>Search Request</h2>
      <hr class="hr" />
      <form class="search-form-details" @submit.prevent="searchRequestbyTime">
        <label class="label-class" for="search-by-period">Time Zone</label>
        <select
          class="select-class"
          id="search-by-period"
          v-model="parameters.timeZone"
        >
          <option value="all" selected>All</option>
          <option value="present">Present</option>
          <option value="past">Past</option>
          <option value="future">Future</option>
        </select>
        <button class="search-button">Search</button>
      </form>
    </section>

    <div class="loading" v-if="status === 'Loading'">
      <h4>Wait</h4>
      <h5>We are fetching your requests... Please wait a while!!!</h5>
    </div>

    <div class="loading" v-else-if="status === 'notFound'">
      <h5>You didn't have any request in this time zone...</h5>
    </div>

    <div v-else-if="status === 'Loaded'" class="search-results">
      <div class="card-template" v-if="foundRequests.length > 0">
        <div class="request-card-container">
          <div
            class="request-card"
            v-for="request in foundRequests"
            :key="request._id"
            :value="request._id"
          >
            <div class="card-img-container">
              <img
                src="../assets/blood-drop.png"
                alt="requester-logo"
                class="card-image"
                height="150px"
                width="200px"
              />
            </div>
            <div class="request-card-details">
              <p class="name"><span>Name: </span>{{ request.patientName }}</p>
              <p class="blood-group">
                <span>Blood Group: </span>{{ request.bloodGroup }}
              </p>
              <p class="required-units">
                <span>Required Units: </span> {{ request.units }}
              </p>
              <p class="required-date">
                <span>Required Date: </span>{{ formateDate(request.date) }}
              </p>
              <p class="required-condition">
                <span>Urgent Requirment: </span>{{ request.urgerntRequirment }}
              </p>
              <button class="more-details" @click="searchRequestById(request)">
                More Details
              </button>
              <button class="delete-details" @click="removeRequest(request)">
                Delete
              </button>
            </div>
          </div>
          <div class="request-card dummy-class"></div>
        </div>
      </div>
      <div v-else>
        <div class="not-found" v-if="status === 'notFound'">
          <h5>No Request Found!</h5>
        </div>
      </div>
    </div>

    <div class="error" v-if="status === 'Error'">
      <h5>Something went wrong...</h5>
      <h5>Please try after Some Time.</h5>
    </div>

    <div class="full-details-container" v-if="showFullDetails">
      <div class="full-details">
        <div class="about-patient">
          <h3>Patient Details</h3>
          <hr />
        </div>
        <p>
          <span class="details-tag">Name: </span>
          {{ requestDetails.patientName }}
        </p>
        <p><span class="details-tag">Age: </span> {{ requestDetails.age }}</p>
        <p>
          <span class="details-tag">Gender: </span> {{ requestDetails.gender }}
        </p>
        <p>
          <span class="details-tag">Blood Group: </span
          >{{ requestDetails.bloodGroup }}
        </p>
        <p>
          <span class="details-tag">Required Units: </span
          >{{ requestDetails.units }}
        </p>
        <p>
          <span class="details-tag">Required Date: </span>
          {{ formateDate(requestDetails.date) }}
        </p>
        <p class="details-tag">
          <span>Urgent Requirment: </span>
          {{ requestDetails.urgerntRequirment }}
        </p>
        <p>
          <span class="details-tag">City: </span>
          {{ requestDetails.location.city }}
        </p>
        <p>
          <span class="details-tag">State </span>
          {{ requestDetails.location.state }}
        </p>
        <p>
          <span class="details-tag">Email: </span> {{ requestDetails.email }}
        </p>
        <p>
          <span class="details-tag">Contact: </span>
          {{ requestDetails.contact }}
        </p>
        <div class="btn-container">
          <button class="back-button" @click="backToPage()">
            Back to Page
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { searchRequest, deleteRequest, requestById } from "@/services/request";
import Vue from "vue";

export default {
  name: "AppSearchRequest",
  data() {
    return {
      status: "",
      foundRequests: [],
      showFoundCards: false,
      showFullDetails: false,
      requestDetails: {
        patientName: "",
        age: "",
        gender: "",
        bloodGroup: "",
        units: "",
        date: "",
        hospitalName: "",
        location: {
          city: "",
          state: "",
        },
        email: "",
        contact: "",
        urgerntRequirment: "",
      },
      parameters: {
        timeZone: "",
      },
    };
  },
  methods: {
    backToPage() {
      this.showFullDetails = false;
    },

    removeRequest(request) {
      deleteRequest(request._id)
        .then(() => {
          let allRequests = this.foundRequests;
          this.foundRequests = allRequests.filter(
            (onereq) => onereq._id !== request._id
          );
          Vue.$toast.open({
            message: "Request Deleted Successfully",
            duration: 3000,
            type: "success",
          });
        })
        .catch((error) => {
          Vue.$toast.open({
            message: error.message,
            duration: 3000,
            type: "error",
          });
        });
    },

    searchRequestbyTime() {
      this.status = "Loading";
      // console.log("para :", this.parameters)
      searchRequest(this.parameters)
        .then((requests) => {
          // console.log("getrequest :", requests)
          this.foundRequests = requests;
          this.status = "Loaded";
          if (this.foundRequests.length === 0) {
            this.status = "notFound";
          }
        })
        .catch((error) => {
          this.status = "Error";
          console.log(error.message);
        });
    },

    searchRequestById(request) {
      const id = request._id;
      this.showFullDetails = false;
      requestById(id)
        .then((requestInfo) => {
          this.requestDetails = requestInfo;
          this.showFullDetails = true;
        })
        .catch((error) => {
          this.status = "Error";
          console.log(error.message);
        });
    },

    formateDate(date) {
      let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
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
  padding: 0.5em;
  text-align: center;
  width: 75%;
  margin: auto;
  margin-top: 2em;
}

.error {
  background-color: rgba(247, 116, 116, 0.6);
  color: rgb(124, 65, 65);
  border-radius: 1em;
  padding: 0.5em;
  text-align: center;
  width: 75%;
  margin: auto;
  margin-top: 2em;
}
.not-found {
  background-color: rgba(247, 116, 116, 0.6);
  color: rgb(44, 32, 32);
  border-radius: 0.3em;
  padding: 0.5em;
  width: 75%;
  margin: auto;
  margin-top: 2em;
}

a {
  text-decoration: none;
}

a:hover {
  color: rgb(255, 173, 190);
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

.request-menu {
  margin: 1.5em 12em 2em 12em;
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

.search-form {
  padding: 1em;
  width: 75%;
  margin: auto;
  border-radius: 0.3em;
  background: rgba(255, 211, 217, 0.3);
}

.select-class {
  border-radius: 0.2em;
  width: 100%;
}

.search-button {
  display: block;
  color: black;
  text-align: center;
  background: linear-gradient(to right, #f7b6c5, #f19585);
  margin: 0.7em 4em 0em 0em;
  text-decoration: none;
  padding: 0.1em 2.4em;
  border-radius: 3px;
  width: max-content;
}

.search-button:hover {
  background-color: rgb(201, 48, 66);
  cursor: -moz-grab;
  color: rgb(133, 190, 216);
}

.request-card-container {
  display: flex;
  width: 75%;
  flex-direction: row;
  justify-content: space-between;
  flex-flow: wrap;
  margin: auto;
}

.request-card {
  width: 28%;
  border-radius: 1em;
  margin-top: 1.5em;
}

.request-card:hover {
  box-shadow: 2px 2px 8px 5px rgba(0, 0, 0, 0.25);
}

.dummy-class:hover {
  transform: scale(1);
  box-shadow: none;
}

.request-card-details {
  padding: 14px 20px 14px 20px;
  background: rgba(240, 244, 247, 0.911);
  border-radius: 0 0 1em 1em;
}

.card-img-container {
  border: 1px solid #efece9;
  border-radius: 1em 1em 0 0;
  background: rgba(255, 162, 174, 0.3);
}

.card-image {
  width: 100%;
}

.request-card-details button {
  display: inline-block;
  color: black;
  text-align: center;
  background: linear-gradient(to right, #f7b6c5, #f19585);
  margin-left: 1em;
  margin-top: 0.5em;
  text-decoration: none;
  border-radius: 3px;
  width: 40%;
}

.request-card-details button:hover {
  color: rgb(133, 190, 216);
  background: linear-gradient(to right, #ee6988, #f19585);
}

.request-card-details p {
  margin: 0;
}

.request-card-details span {
  font-weight: 600;
}

/* 
=================
Full Details css
===============
*/

.full-details-container {
  position: fixed;
  background: #ebe2e6;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 100;
  opacity: 0.9;
}

.full-details {
  border: 2px solid rgb(214, 203, 213);
  border-radius: 1.5em;
  width: 32vw;
  margin: auto;
  /* text-align: center; */
  position: relative;
  top: 15vh;
  background: rgb(20, 16, 16, 1);
}

.about-patient {
  text-align: center;
}

.full-details hr {
  border: 0.05px solid white;
}

.full-details div {
  margin: 0.5em 2em;
  color: rgb(255, 255, 255);
}

.full-details p {
  margin: 1em;
  padding: 0 1.5em;
  color: rgb(255, 255, 255);
}

.back-button {
  display: block;
  color: black;
  text-align: center;
  background: linear-gradient(to right, #f7b6c5, #f19585);
  margin: 0.4em 8.5em 1em 8.5em;
  text-decoration: none;
  padding: 2px 27px;
  border-radius: 3px;
  width: max-content;
}

.back-button:hover {
  cursor: -moz-grab;
  color: rgb(133, 190, 216);
  background: linear-gradient(to right, #ee6988, #f19585);
}

@media screen and (max-width: 1000px) {
  .request-card {
    width: 40%;
  }
}

@media screen and (max-width: 620px) {
  .request-container {
    width: 100%;
  }

  .card-image-container {
    padding: 20px;
    font-size: 20px;
  }

  .request-card {
    width: 80%;
  }
}
</style>