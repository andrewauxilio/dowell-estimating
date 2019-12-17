import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

//CSS Imports
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/sb-admin-2.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/custom.css";
import "animate.css"

//JS Imports
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

require ('./filters');
require ('./plugins')

//Axios base URL
axios.defaults.baseURL = process.env.VUE_APP_API_URL

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
