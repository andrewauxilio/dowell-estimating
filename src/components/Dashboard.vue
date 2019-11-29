<template>
  <div v-if="isLoggedIn" class="container-fluid">
    <div class="row">
      {{ site }}
      <!-- <div class="col-xl-4 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-success text-uppercase mb-1"
                >
                  Orders
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ GBGKPITotal[0].ORDERS_IN_NO }} Orders
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  Value: ${{ GBGKPITotal[0].ORDERS_IN_$ }}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-truck fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div> 
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "geebung",
  components: {

  },

  props: {
    site: String
  },

  data() {
    return {
      date_start: '',
      date_end: '',
      site: ''
    };
  },

  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
    })
  },
  mounted() {
    this.permissionCheck();
  },

  methods: {
    permissionCheck() {
      if (!this.isLoggedIn) {
        this.$router.push("/404"); 
      }
    }
  }
};
</script>
