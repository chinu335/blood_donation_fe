<template>
  <div class="container">
    <h1>Page Not Found</h1>
    <hr />
    <p>
      This page is not available.Go back to
      <router-link class="home-page" :to="{ name: 'home' }"
        >Home Page</router-link
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "AppPageNotFound",
};
</script>

<style scoped>
body {
  font-family: "Baloo Bhai 2", cursive;
}

.container {
  border: 1px solid black;
  border-radius: 0.5em;
  width: 60%;
  margin: auto;
  margin-top: 5em;
  background-color: rgba(247, 240, 240, 0.5);
}
</style>