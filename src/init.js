import Vue from 'vue';
import Router from 'vue-router';
import Vuelidate from 'vuelidate';
import VueToast from 'vue-toast-notification';

import 'bootstrap/dist/css/bootstrap.css';
import 'vue-toast-notification/dist/theme-default.css';


Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use( Router );
Vue.use( VueToast);