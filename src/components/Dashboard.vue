<template>
  <div v-if="isLoggedIn" class="container-fluid">
    <div v-if="!loading" class="row">
      <div class="col-xl-4 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Quotes</div>
                <div
                  class="h5 mb-0 font-weight-bold text-gray-800"
                >{{ siteData[0].QUOTES_NO }} Quotes</div>
                <div
                  class="h5 mb-0 font-weight-bold text-gray-800"
                >Value: ${{ siteData[0].QUOTES_$ }}</div>
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
                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Orders</div>
                <div
                  class="h5 mb-0 font-weight-bold text-gray-800"
                >{{ siteData[0].ORDERS_IN_NO }} Orders</div>
                <div
                  class="h5 mb-0 font-weight-bold text-gray-800"
                >Value: ${{ siteData[0].ORDERS_IN_$ }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-truck fa-2x text-gray-300"></i>
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
                <div
                  class="h5 mb-0 font-weight-bold text-gray-800"
                >{{ siteData[0].REVISION_NO }} Revisions</div>
                <div
                  class="h5 mb-0 font-weight-bold text-gray-800"
                >Value: ${{ siteData[0].REVISION_$ }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-redo fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-12 col-lg-12">
        <div class="card shadow mb-4">
          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-success">Past 3 Days Statistics</h6>
          </div>
          <div class="card-body">
            <div class="card-body table-responsive p-0">
              <dailyChart :site="site"  />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fab-container">
      <button
        class="buttons"
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
                      :href="report_url + 'POO=' + site + '&DateStart=' + startDate + '&DateEnd=' + endDate"
                      target="_blank"
                    >View Report</a>
                  </td>
                  <td>
                    <a
                      style="color:red; margin:2px;"
                      :href="report_pdf + 'POO=' + site + '&DateStart=' + startDate + '&DateEnd=' + endDate"
                      target="_blank"
                    >
                      <i class="fas fa-file-pdf fa-3x"></i>
                    </a>
                    <a
                      style="color:green; margin:2px;"
                      :href=" report_excel + 'POO=' + site + '&DateStart=' + startDate + '&DateEnd=' + endDate"
                      target="_blank"
                    >
                      <i class="fas fa-file-excel fa-3x"></i>
                    </a>
                    <a
                      style="color:blue; margin:2px;"
                      :href="report_csv + 'POO=' + site + '&DateStart=' + startDate + '&DateEnd=' + endDate"
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
import axios from "axios";
import { mapGetters } from "vuex";
import dailyChart from './chart-data/7days';

export default {
  name: "dashboard",
  components: {
    dailyChart,
  },

  props: {
    site: String
  },

  data() {
    return {
      siteData: [],
      loading: true,
      report_url: "http://dweqxsql04/reports/report/Quoting/KPIEstimator?",
      report_pdf:
        "http://dweqxsql04/Reportserver?%2fQuoting%2fKPIEstimator&rs:Command=Render&rs:Format=PDF&",
      report_excel:
        "http://dweqxsql04/Reportserver?%2fQuoting%2fKPIEstimator&rs:Command=Render&rs:Format=EXCEL&",
      report_csv:
        "http://dweqxsql04/Reportserver?%2fQuoting%2fKPIEstimator&rs:Command=Render&rs:Format=CSV&"
    };
  },

  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
      startDate: "getStartDate",
      endDate: "getEndDate"
    })
  },
  mounted() {
    this.permissionCheck();
    this.fetchData();
  },

  methods: {
    permissionCheck() {
      if (!this.isLoggedIn) {
        this.$router.push("/404");
      }
    },

    async fetchData() {
      this.loading = true;
      try {
        await axios
          .post("/estimating/kpis", {
            end: this.endDate,
            start: this.startDate,
            site: this.site,
            grouped: 0
          })
          .then(response => {
            this.siteData = response.data;
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
