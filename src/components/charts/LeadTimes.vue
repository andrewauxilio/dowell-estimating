<template>
  <div class="container-fluid">
    <!-- <transition name="fade"> -->
    <bar-chart :height="250" :chart-data="datacollection" :options="options"></bar-chart>
    <!-- </transition> -->
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import BarChart from "../../chart-js/bar-chart-horiz";

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

  props: {
    site: String
  },

  mounted() {
    this.fillData();
  },

  methods: {
    fillData() {
      this.datacollection = {
        labels: ["1 Day", "2 Days", "3 Days", "4 Days", "5+ Days"],
        datasets: [
          {
            label: "No. Quotes",
            backgroundColor: ["rgba(94, 255, 126, 0.7)", "rgba(204, 255, 94, 0.7)", "rgba(255, 239, 94, 0.7)", "rgba(255, 164, 94, 0.7)", "rgba(255, 94, 94, 0.7)" ] ,
            data: [5, 3, 3, 4, 2]
          }
        ]
      };
    }
  }
};
</script>
