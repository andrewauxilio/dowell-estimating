<template>
  <div class="container-fluid">
    <Spinner v-if="loading" />
    <bar-chart v-if="!loading" :height="250" :chart-data="datacollection" :options="options"></bar-chart>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import BarChart from "../../chart-js/bar-chart-horiz";
import Spinner from "../../components/plugins/Spinner";

import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + sessionStorage.access_token;

export default {
  components: {
    BarChart,
    Spinner
  },
  data() {
    return {
      loading: true,
      ql_data: [],
      datacollection: {},
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 5,
            right: 15,
            top: 15,
            bottom: 0
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: false
              },
              maxBarThickness: 25,
              ticks: {
                beginAtZero: true
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
              },
              maxBarThickness: 15,
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: "#6e707e",
          titleFontSize: 14,
          borderColor: "#dddfeb",
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: "index",
          caretPadding: 10
        }
      }
    };
  },

  computed: {
    ...mapGetters({
      startDate: "getStartDate",
      endDate: "getEndDate"
    })
  },

  props: {
    site: String
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.loading = true;
      axios
        .post("/estimating/kpis", {
          end: this.endDate,
          start: this.startDate,
          site: this.site,
          grouped: 0
        })
        .then(response => {
          this.ql_data = response.data;
          this.fillData();
          this.loading = false;
          toast.fire({
            type: "success",
            title: "Quote Lead Times Chart Loaded"
          });
        });
    },

    fillData() {
      let ql_data = this.ql_data;

      this.datacollection = {
        labels: ["1 Day", "2 Days", "3 Days", "4 Days", "5 Days", "6+ Days"],
        datasets: [
          {
            label: "No. Quotes",
            backgroundColor: [
              "rgba(94, 255, 126, 0.7)",
              "rgba(204, 255, 94, 0.7)",
              "rgba(255, 239, 94, 0.7)",
              "rgba(255, 164, 94, 0.7)",
              "rgba(255, 94, 94, 0.7)",
              "rgba(247, 57, 57, 0.7)"
            ],
            data: [
              ql_data[0].QL1DAY,
              ql_data[0].QL2DAY,
              ql_data[0].QL3DAY,
              ql_data[0].QL4DAY,
              ql_data[0].QL5DAY,
              ql_data[0].QL5PDAY
            ]
          }
        ]
      };
    }
  }
};
</script>
