<template>
  <main class="main-class">
    <div class="loading" v-if="status === 'Loading'">
      <h3>Wecome to this Page</h3>
      <p>Please Wait!!!.. we are fetching the all the requests</p>
    </div>
    <div class="request-container" v-if="status === 'Loaded'">
      <h1 style="margin-bottom: 0em">List of Request</h1>
      <hr style="margin: 0; margin-top: 0.5em" />

      <div class="request-card-container">
        <div
          class="request-card"
          v-for="requester in allRequesters"
          :key="requester._id"
        >
          <div class="card-img-container">
            <img
              src="../assets/blood-donation.png"
              alt="requester-logo"
              class="card-image"
              height="150px"
              width="200px"
            />
          </div>
          <div class="request-card-details">
            <p class="name"><span>Name:</span> {{ requester.patientName }}</p>
            <p class="blood-group">
              <span>Blood Group:</span> {{ requester.bloodGroup }}
            </p>
            <p class="required-units">
              <span>Required Units:</span> {{ requester.units }}
            </p>
            <p class="required-date">
              <span>Required Date:</span> {{ formateDate(requester.date) }}
            </p>
            <p class="required-condition">
              <span>Urgent Requirment:</span> {{ requester.urgerntRequirment }}
            </p>
            <button class="more-details" @click="showDetails(requester)">
              More Details
            </button>
          </div>
        </div>
        <div class="request-card dummy-class"></div>
      </div>
    </div>

    <div class="full-details-container" v-if="showFullDetails">
      <div class="full-details">
        <div class="about-patient">
          <h3>Patient Details</h3>
          <hr />
        </div>
        <p><span class="details-tag">Name:</span> {{ request.patientName }}</p>
        <p><span class="details-tag">Age:</span> {{ request.age }}</p>
        <p><span class="details-tag">Gender:</span> {{ request.gender }}</p>
        <p>
          <span class="details-tag">Blood Group:</span> {{ request.bloodGroup }}
        </p>
        <p>
          <span class="details-tag">Required Units:</span> {{ request.units }}
        </p>
        <p>
          <span class="details-tag">Required Date:</span>
          {{ formateDate(request.date) }}
        </p>
        <p class="details-tag">
          <span>Urgent Requirment:</span> {{ request.urgerntRequirment }}
        </p>
        <p>
          <span class="details-tag">City:</span> {{ request.location.city }}
        </p>
        <p>
          <span class="details-tag">State</span> {{ request.location.state }}
        </p>
        <p><span class="details-tag">Email:</span> {{ request.email }}</p>
        <p><span class="details-tag">Contact:</span> {{ request.contact }}</p>
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
import { getAllRequest /*requestById */ } from "@/services/request";

export default {
  name: "AppRequesters",
  data() {
    return {
      allRequesters: [],
      status: "Loading",
      showFullDetails: false,
      request: {
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
    };
  },
  methods: {
    showDetails(requester) {
      this.showFullDetails = true;
      this.request = requester;
    },

    backToPage() {
      this.showFullDetails = false;
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
  created() {
    getAllRequest()
      .then((requesters) => {
        this.allRequesters = requesters;
        this.status = "Loaded";
      })
      .catch((error) => {
        console.log(error.message);
      });
  },
};
</script>

<style scoped>
body {
  font-family: "Baloo Bhai 2", cursive;
}

.main-class {
  width: 90%;
  margin: auto;
}

.heading {
  text-align: center;
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

.request-container {
  width: 84%;
  margin: auto;
  margin-top: 1.5em;
}

.request-card-container {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}

.request-card {
  flex: 0 0 28%;
  border-radius: 1em;
  margin-top: 1.5em;
  /* background: rgb(235, 231, 231); */
  transition: 0.4s;
}

.request-card:hover {
  transform: scale(1.05);
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
  background: rgba(241, 232, 233, 0.603);
}

.card-image {
  width: 100%;
}

.request-card-details button {
  display: block;
  color: black;
  text-align: center;
  background: linear-gradient(to right, #f7b6c5, #f19585);
  margin: 5px 58px 0 40px;
  text-decoration: none;
  padding: 2px 27px;
  border-radius: 3px;
  width: max-content;
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
  color: rgba(48, 49, 54, 0.788);
}

/* 
 ==================
 Full details CSS  
 ==================
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
  background-color: rgb(230, 134, 146);
  cursor: -moz-grab;
  color: rgb(255, 255, 255);
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