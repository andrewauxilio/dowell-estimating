<template>
  <div v-if="isLoggedIn && isGBG" class="container-fluid">
    <div class="row">
      <!-- QUANTITY-->
      <!-- <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Quotes</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ GBGKPITotal[0].QUOTES_NO }} Quotes</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800"> Value: ${{ GBGKPITotal[0].QUOTES_$ }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-book fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Revisions</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ GBGKPITotal[0].REVISION_NO }} Revisions</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">Value: ${{ GBGKPITotal[0].REVISION_$ }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-redo fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
      </div>-->

      <div class="col-xl-4 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <!-- <div v-if="!isGBGLoaded" class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
              </div>-->
              <div v-if="!loading" class="col mr-2">
                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Orders</div>
                <div
                  class="h5 mb-0 font-weight-bold text-gray-800"
                >{{ GBGKPITotal[0].ORDERS_IN_NO }} Orders</div>
                <div
                  class="h5 mb-0 font-weight-bold text-gray-800"
                >Value: ${{ GBGKPITotal[0].ORDERS_IN_$ }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-truck fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="row">
        <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">3 Month Comparison</h6>
                </div>
                <div class="card-body">
                    <div class="card-body table-responsive p-0">
                        <div v-if="!isGBGLoaded" class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                        <weeklyQuantity v-if="show && !loading" />
                    </div>
                </div>
            </div>
        </div>
      </div>-->
    </div>

    <div class="fab-container">
      <button
        class="buttons"
        @click="getReportData"
        tooltip="Download Reports"
        data-toggle="modal"
        data-target=".report-modal"
      >
        <i class="fab fas fa-download"></i>
      </button>
      <button class="buttons" tooltip="Actions" href="#">
        <i class="fab fas fa-cogs"></i>
      </button>
    </div>

    <!-- Report modal -->
    <div
      class="modal fade report-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark font-weight-bold">Download Reports</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Link</th>
                  <th>Download Report</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>KPI Report</th>
                  <td>
                    <a
                      :href="'http://dweqxsql04/reports/report/Quoting/KPIEstimator?' + reportSite + reportDateStart + reportDateEnd"
                      target="_blank"
                    >View Report</a>
                  </td>
                  <td>
                    <a
                      style="color:red; margin:2px;"
                      :href="'http://dweqxsql04/Reportserver?%2fQuoting%2fKPIEstimator&rs:Command=Render&rs:Format=PDF&' + reportSite + reportDateStart + reportDateEnd"
                      target="_blank"
                    >
                      <i class="fas fa-file-pdf fa-3x"></i>
                    </a>
                    <a
                      style="color:green; margin:2px;"
                      :href="'http://dweqxsql04/Reportserver?%2fQuoting%2fKPIEstimator&rs:Command=Render&rs:Format=EXCEL&' + reportSite + reportDateStart + reportDateEnd"
                      target="_blank"
                    >
                      <i class="fas fa-file-excel fa-3x"></i>
                    </a>
                    <a
                      style="color:blue; margin:2px;"
                      :href="'http://dweqxsql04/Reportserver?%2fQuoting%2fKPIEstimator&rs:Command=Render&rs:Format=CSV&' + reportSite + reportDateStart + reportDateEnd"
                      target="_blank"
                    >
                      <i class="fas fa-file-csv fa-3x"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <p class="mr-auto">
              IMPORTANT: Please make sure you are logged in to Dowell's citrix desktop.
              The reports are only accessible inside the Dowell's citrix desktop.
            </p>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import weeklyQuantity from "../chart-data/qld/gbg/weeklyQuantity";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "geebung",
  components: {
    weeklyQuantity
  },

  data() {
    return {
      loading: false,
      show: true,
      gbgKPITotal: [],
      loading: true,
      reportSite: "",
      reportDateStart: "",
      reportDateEnd: ""
    };
  },

  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
      isGBG: "isGBG",
      isGBGLoaded: "isGBGLoaded",
      GBGKPI: "getGBGKPI",
      GBGKPITotal: "getGBGKPITotal"
    })
  },
  mounted() {
    this.permissionCheck();
    this.getGBGKPITotalMonth();
  },

  methods: {
    /**-------------------------------------------------------------------
     ***                   Double Check User Permission
     ***-------------------------------------------------------------------
     *** Function: Check if the user is both logged in and a Geebung user
     ***-------------------------------------------------------------------
     **/
    permissionCheck() {
      if (!this.isGBG || !this.isLoggedIn) {
        //if the user is not a geebung or not logged in
        this.$router.push("/404"); //redirect to 404 page
      }
    },

    getReportData() {
      let reportDateStart = moment(this.GBGKPITotal[0].DATE_FROM);
      let reportDateEnd = moment(this.GBGKPITotal[0].DATE_TO);
      this.reportSite = "POO=" + this.GBGKPITotal[0].POO;
      this.reportDateStart = "&DateStart=" + reportDateStart.format("YYYYMMDD");
      this.reportDateEnd = "&DateEnd=" + reportDateEnd.format("YYYYMMDD");
    },

    getGBGKPITotalMonth(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + sessionStorage.getItem("access_token");

      let endDate = moment();
      let startDate = moment()
        .subtract(30, "days")
        .calendar();

      return new Promise((resolve, reject) => {
        axios
          .post("/estimating/qld/kpi", {
            end: endDate,
            start: startDate,
            site: "GBG",
            grouped: 0
          })
          .then(response => {
            this.gbgKPITotal = response.data;
            resolve(response);
          })
          .finally(() => {
            this.loading = false;
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    }
  }
};
</script>

