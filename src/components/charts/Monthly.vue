<template>
  <div class="container-fluid">
    <!-- <div v-if="loading" class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>-->
    <!-- <transition name="fade"> -->
    <bar-chart :height="250" :chart-data="datacollection" :options="options"></bar-chart>
    <!-- </transition> -->
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import BarChart from "../../chart-js/bar-chart";

import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + sessionStorage.access_token;

export default {
  components: {
    BarChart
  },
  data() {
    return {
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
              maxBarThickness: 40,
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

  props: {
    site: String
  },

  mounted() {
    //this.fetchData();
    this.testData();
  },

  computed: {
    ...mapGetters({
      startDate: "getStartDate",
      endDate: "getEndDate"
    })
  },

  methods: {
    testData() {
      this.datacollection = {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
        datasets: [
          {
            label: "No. Quotes",
            backgroundColor: "rgba(75, 192, 192, 0.7)",
            data: [10, 20, 15, 23, 5, 46, 33]
          },
        {
            type: "line",
            label: "No. Quotes",
            backgroundColor: "rgba(75, 192, 192, 0)",
            borderColor: "rgba(81, 156, 111, 0.7)",
            borderWidth: 1,
            data: [10, 20, 15, 23, 5, 46, 33]
          }
        ]
      };
    }
  }
};
</script>
