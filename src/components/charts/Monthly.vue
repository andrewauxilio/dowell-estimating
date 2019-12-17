<template>
  <div class="container-fluid">
    <div v-if="loading" class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <!-- <transition name="fade"> -->
    <bar-chart v-if="!loading" :height="250" :chart-data="datacollection" :options="options"></bar-chart>
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
      monthData1: [],
      monthData2: [],
      monthData3: [],
      monthData4: [],
      monthData5: [],
      monthData6: [],
      monthData7: [],
      loading: false,
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
    this.fetchData();
    //this.testData();
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
    },

    fetchData() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let finalDays = [];

      for (month; month >= 0; month--) {
        getDaysInMonth(month, year);
      }

      function getDaysInMonth(month, year) {
        let date = new Date(Date.UTC(year, month, 1));
        let days = [];

        while (date.getMonth() === month) {
          days.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        finalDays.push({
          start: days[0],
          end: days[days.length - 1]
        });
      }

      this.loading = true;
      axios
        .all([
          axios.post("/estimating/kpis", {
            end: moment(finalDays[0].end).format("YYYYMMDD"),
            start: moment(finalDays[0].start).format("YYYYMMDD"),
            site: this.site,
            grouped: 0
          }),

          axios.post("/estimating/kpis", {
            end: moment(finalDays[1].end).format("YYYYMMDD"),
            start: moment(finalDays[1].start).format("YYYYMMDD"),
            site: this.site,
            grouped: 0
          }),
          axios.post("/estimating/kpis", {
            end: moment(finalDays[2].end).format("YYYYMMDD"),
            start: moment(finalDays[2].start).format("YYYYMMDD"),
            site: this.site,
            grouped: 0
          }),
          axios.post("/estimating/kpis", {
            end: moment(finalDays[3].end).format("YYYYMMDD"),
            start: moment(finalDays[3].start).format("YYYYMMDD"),
            site: this.site,
            grouped: 0
          }),
          axios.post("/estimating/kpis", {
            end: moment(finalDays[4].end).format("YYYYMMDD"),
            start: moment(finalDays[4].start).format("YYYYMMDD"),
            site: this.site,
            grouped: 0
          }),
          axios.post("/estimating/kpis", {
            end: moment(finalDays[5].end).format("YYYYMMDD"),
            start: moment(finalDays[5].start).format("YYYYMMDD"),
            site: this.site,
            grouped: 0
          }),
          axios.post("/estimating/kpis", {
            end: moment(finalDays[6].end).format("YYYYMMDD"),
            start: moment(finalDays[6].start).format("YYYYMMDD"),
            site: this.site,
            grouped: 0
          })
        ])
        .then(responseArr => {
          this.monthData1 = responseArr[0].data;
          this.monthData2 = responseArr[1].data;
          this.monthData3 = responseArr[2].data;
          this.monthData4 = responseArr[3].data;
          this.monthData5 = responseArr[4].data;
          this.monthData6 = responseArr[5].data;
          this.monthData7 = responseArr[6].data;

          this.fillData();
          this.loading = false;
          toast.fire({
            type: "success",
            title: "Monthly Chart Loaded"
          });
        });
    },

    fillData() {
      let month1 = this.monthData1;
      let month2 = this.monthData2;
      let month3 = this.monthData3;
      let month4 = this.monthData4;
      let month5 = this.monthData5;
      let month6 = this.monthData6;
      let month7 = this.monthData7;

      this.datacollection = {
        labels: [
          moment(month7[0].DATE_FROM).format("MMM"),
          moment(month6[0].DATE_FROM).format("MMM"),
          moment(month5[0].DATE_FROM).format("MMM"),
          moment(month4[0].DATE_FROM).format("MMM"),
          moment(month3[0].DATE_FROM).format("MMM"),
          moment(month2[0].DATE_FROM).format("MMM"),
          moment(month1[0].DATE_FROM).format("MMM")
        ],
        datasets: [
          {
            label: "Quotes",
            backgroundColor: "rgba(75, 192, 192, 0.7)",
            data: [
              month7[0].QUOTES_NO,
              month6[0].QUOTES_NO,
              month5[0].QUOTES_NO,
              month4[0].QUOTES_NO,
              month3[0].QUOTES_NO,
              month2[0].QUOTES_NO,
              month1[0].QUOTES_NO
            ]
          },
          {
            label: "Revisions",
            backgroundColor: "rgba(80, 222, 175, 0.7)",
            data: [
              month7[0].REVISION_NO,
              month6[0].REVISION_NO,
              month5[0].REVISION_NO,
              month4[0].REVISION_NO,
              month3[0].REVISION_NO,
              month2[0].REVISION_NO,
              month1[0].REVISION_NO
            ]
          },
          {
            label: "Orders",
            backgroundColor: "rgba(36, 255, 182, 0.7)",
            data: [
              month7[0].ORDERS_IN_NO,
              month6[0].ORDERS_IN_NO,
              month5[0].ORDERS_IN_NO,
              month4[0].ORDERS_IN_NO,
              month3[0].ORDERS_IN_NO,
              month2[0].ORDERS_IN_NO,
              month1[0].ORDERS_IN_NO
            ]
          }
        ]
      };
    }
  }
};
</script>
