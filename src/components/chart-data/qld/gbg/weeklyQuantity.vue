<template>
  <div class="container-fluid">
    <transition name="fade">
      <bar-chart :chart-data="datacollection" :options="options"></bar-chart>
    </transition>
  </div>
</template>

<script>
import BarChart from "../../../../chart-js/bar-chart";

import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + sessionStorage.access_token;

export default {
  components: {
    BarChart
  },
  data() {
    return {
      one: [],
      two: [],
      three: [],
      loaded: false,
      datacollection: {},
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
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
    checkLoad() {
      if (
        this.day1 &&
        day1.length &&
        this.day2 &&
        day2.length &&
        this.day3 &&
        day3.length
      ) {
        return (this.loaded = true);
      } else {
        return (this.loaded = false);
      }
    }
  },

  mounted() {
    //this.fillData();
    this.makeRequests();
  },

  methods: {
    makeRequests() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + sessionStorage.access_token;
      axios
        .all([this.requestOne(), this.requestTwo(), this.requestThree()])
        .then(
          axios.spread((...responses) => {
            this.one = one.data;
            this.two = two.data;
            this.three = three.data;
          })
        );
    },

    requestOne() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + sessionStorage.access_token;
      axios.post("/estimating/qld/kpi", {
        end: "20191125",
        start: "20191125",
        site: "GBG",
        grouped: 0
      });
    },

    requestTwo() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + sessionStorage.access_token;
      axios.post("/estimating/qld/kpi", {
        end: "20191126",
        start: "20191126",
        site: "GBG",
        grouped: 0
      });
    },

    requestThree() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + sessionStorage.access_token;
      axios.post("/estimating/qld/kpi", {
        end: "20191127",
        start: "20191127",
        site: "GBG",
        grouped: 0
      });
    },

    fillData() {
      day1 = this.day1;
      day2 = this.day2;
      day3 - this.day3;
      this.datacollection = {
        labels: ["Day 1", "Day 2", "Day 3"],
        datasets: [
          {
            label: "Quantity",
            backgroundColor: "rgba(75, 192, 192, 0.7)",
            data: [day1[0].QUOTES_NO, day1[0].REVISION_NO, day1[0].ORDERS_IN_NO]
          },
          {
            label: "Quantity",
            backgroundColor: "rgba(75, 192, 192, 0.7)",
            data: [day2[0].QUOTES_NO, day2[0].REVISION_NO, day2[0].ORDERS_IN_NO]
          },
          {
            label: "Quantity",
            backgroundColor: "rgba(75, 192, 192, 0.7)",
            data: [day3[0].QUOTES_NO, day3[0].REVISION_NO, day3[0].ORDERS_IN_NO]
          }
        ]
      };
    }
  }
};
</script>
