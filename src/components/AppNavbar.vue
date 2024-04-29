<template>
  <nav
    class="navbar navbar-expand-md navbar-light px-5 py-3"
    v-if="isAuthenticated"
  >
    <div class="mobile">
      <h2 class="nav-meeting-heading">Helping Hand</h2>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>

    <div class="my-container">
      <div
        class="collapse navbar-collapse space-between"
        id="collapsibleNavbar"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="links[0]">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="links[1]">Requests</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="links[2]"
              >Make Request</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <span class="nav-link">
              <span class="hello-text">Hello</span>
              <span class="user-name"> {{ email }}</span>
            </span>
          </li>
          <li class="nav-item">
            <span class="nav-link" style="cursor: pointer" @click="logout()"
              ><span class="logout-text">Log Out</span></span
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
  data() {
    return {
      links: [
        { name: "home" },
        { name: "all-request-list" },
        { name: "user-request" },
        { name: "login-page" },
        { name: "registration-page" },
      ],
    };
  },

  computed: {
    email() {
      return this.$store.state.auth.email;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },

  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => this.$router.push({ name: "login-page" }));
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Baloo Bhai 2", cursive;
}

.hello-text,
.logout-text,
a {
  font-weight: 500;
}

a:hover {
  text-decoration: none;
  color: rgb(0, 0, 0);
}

nav {
  background: rgba(241, 232, 233, 0.503);
}

.navbar {
  padding-left: 0;
  padding-right: 0;
}

.user-name {
  color: rgb(209, 138, 138);
  font-weight: bold;
  display: inline-block;
}

.nav-button {
  margin: 0 0 0 87%;
}

.space-between {
  justify-content: space-between;
}

.my-container {
  margin: 0 8.5em;
}

@media (min-width: 768px) {
  .my-container {
    width: 92%;
  }
}

@media (min-width: 992px) {
  .my-container {
    padding-right: 0;
    padding-left: 0;
    width: 92%;
  }
}

@media (min-width: 1200px) {
  .my-container {
    padding-right: 0;
    padding-left: 0;
    width: 92%;
  }
}

.mobile {
  align-items: center;
  margin: 0 auto;
  display: none;
}

@media screen and (max-width: 568px) {
  .mobile {
    width: 90%;
  }
}

@media screen and (max-width: 767px) {
  .mobile {
    display: inline-flex;
    width: 90%;
    justify-content: space-between;
  }

  .my-container {
    padding-right: 0;
    padding-left: 0;
    margin: 0 auto;
    width: 92%;
  }
}
</style>