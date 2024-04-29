import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';

// Load Vuex
Vue.use( Vuex )

// Create Store
export default new Vuex.Store({
    modules: {
        auth: auth
    }
});
 