<template>
  <div id="app">
    <AppNavbar />
   <router-view></router-view>
  </div>
</template>

<script>

import AppNavbar from '@/components/AppNavbar';

export default {
  name: 'App',
  components: {
    AppNavbar
  }
  
}
</script>

<style>
body{
  font-family: 'Baloo Bhai 2', cursive;
}

</style>
