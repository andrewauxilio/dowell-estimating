import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Bootstrap, Admin, Fontawesome CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/sb-admin-2.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"

//Bootstrap, Jquery, Popper.js JS
import 'jquery/dist/jquery.min.js'
import 'popper.js/dist/umd/popper.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

// SweetAlert
import swal from 'sweetalert2'
window.swal = swal
const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})
window.toast = toast
window.Fire = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
