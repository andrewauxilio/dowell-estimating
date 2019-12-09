import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

//Bootstrap, Admin, Fontawesome CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/sb-admin-2.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/custom.css";
import "animate.css"

//Bootstrap, Jquery, Popper.js, Filters
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
require ('./filters');

//MomentJS
import moment from 'moment';
window.moment = moment;

// SweetAlert
import swal from 'sweetalert2';
window.swal = swal
const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
window.toast = toast;
window.Fire = new Vue();

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_API_URL

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
