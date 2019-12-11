import Vue from 'vue';

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