import Vue from 'vue'
import App from './App.vue';
import router from './router';
import store from './store'; 

import './init';

new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app')
