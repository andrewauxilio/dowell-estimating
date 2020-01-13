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
      unitData1: [],
      unitData2: [],
      unitData3: [],
      unitData4: [],
      unitData5: [],
      unitData6: [],
      unitData7: [],
      loading: true,
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
        dataset: {
          maxBarThickness: 30
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: false
              },
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
          xPadding: 10,
          yPadding: 10,
          displayColors: false,
          intersect: false,
          mode: "index",
          caretPadding: 5
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
    //     testData() {
    //         this.datacollection = {
    //             labels: [
    //                 "1 Day",
    //                 "2 Days",
    //                 "3 Days",
    //                 "4 Days",
    //                 "5+ Days"
    //             ],
    //             datasets: [{
    //                 label: "No. Quotes",
    //                 backgroundColor: "rgba(75, 192, 192, 0.7)",
    //                 data: [
    //                     10,
    //                     20,
    //                     15,
    //                     23,
    //                     5
    //                 ]
    //             }, ]
    //         };
    //     }
    // }
    fetchData() {
      let dateDifference = this.endDate - this.startDate;

      let endDate2 = moment(this.startDate)
        .subtract(1, "days")
        .format("YYYYMMDD");
      let startDate2 = moment(endDate2)
        .subtract(dateDifference, "days")
        .format("YYYYMMDD");

      let endDate3 = moment(startDate2)
        .subtract(1, "days")
        .format("YYYYMMDD");
      let startDate3 = moment(endDate3)
        .subtract(dateDifference, "days")
        .format("YYYYMMDD");

      let endDate4 = moment(startDate3)
        .subtract(1, "days")
        .format("YYYYMMDD");
      let startDate4 = moment(endDate4)
        .subtract(dateDifference, "days")
        .format("YYYYMMDD");

      let endDate5 = moment(startDate4)
        .subtract(1, "days")
        .format("YYYYMMDD");
      let startDate5 = moment(endDate5)
        .subtract(dateDifference, "days")
        .format("YYYYMMDD");

      let endDate6 = moment(startDate5)
        .subtract(1, "days")
        .format("YYYYMMDD");
      let startDate6 = moment(endDate6)
        .subtract(dateDifference, "days")
        .format("YYYYMMDD");

      let endDate7 = moment(startDate6)
        .subtract(1, "days")
        .format("YYYYMMDD");
      let startDate7 = moment(endDate7)
        .subtract(dateDifference, "days")
        .format("YYYYMMDD");

      this.loading = true;
      axios
        .all([
          axios.post("/estimating/kpis", {
            end: this.endDate,
            start: this.startDate,
            site: this.site,
            grouped: 0
          }),

          axios.post("/estimating/kpis", {
            end: endDate2,
            start: startDate2,
            site: this.site,
            grouped: 0
          }),

          axios.post("/estimating/kpis", {
            end: endDate3,
            start: startDate3,
            site: this.site,
            grouped: 0
          }),

          axios.post("/estimating/kpis", {
            end: endDate4,
            start: startDate4,
            site: this.site,
            grouped: 0
          }),

          axios.post("/estimating/kpis", {
            end: endDate5,
            start: startDate5,
            site: this.site,
            grouped: 0
          }),

          axios.post("/estimating/kpis", {
            end: endDate6,
            start: startDate6,
            site: this.site,
            grouped: 0
          }),

          axios.post("/estimating/kpis", {
            end: endDate7,
            start: startDate7,
            site: this.site,
            grouped: 0
          })
        ])
        .then(responseArr => {
          this.unitData1 = responseArr[0].data;
          this.unitData2 = responseArr[1].data;
          this.unitData3 = responseArr[2].data;
          this.unitData4 = responseArr[3].data;
          this.unitData5 = responseArr[4].data;
          this.unitData6 = responseArr[5].data;
          this.unitData7 = responseArr[6].data;

          this.fillData();
          this.loading = false;
          toast.fire({
            icon: "success",
            title: "7 Unit Chart Loaded"
          });
        });
    },

    fillData() {
      let day1 = this.unitData1;
      let day2 = this.unitData2;
      let day3 = this.unitData3;
      let day4 = this.unitData4;
      let day5 = this.unitData5;
      let day6 = this.unitData6;
      let day7 = this.unitData7;

      let unit1;
      let unit2;
      let unit3;
      let unit4;
      let unit5;
      let unit6;
      let unit7;

      day7[0].DATE_FROM == day7[0].DATE_TO
        ? (unit7 = moment(day7[0].DATE_FROM).format("MMM DD"))
        : (unit7 =
            moment(day7[0].DATE_FROM).format("MMM DD") +
            " - " +
            moment(day7[0].DATE_TO).format("MMM DD"));
      day6[0].DATE_FROM == day6[0].DATE_TO
        ? (unit6 = moment(day6[0].DATE_FROM).format("MMM DD"))
        : (unit6 =
            moment(day6[0].DATE_FROM).format("MMM DD") +
            " - " +
            moment(day6[0].DATE_TO).format("MMM DD"));
      day5[0].DATE_FROM == day5[0].DATE_TO
        ? (unit5 = moment(day5[0].DATE_FROM).format("MMM DD"))
        : (unit5 =
            moment(day5[0].DATE_FROM).format("MMM DD") +
            " - " +
            moment(day5[0].DATE_TO).format("MMM DD"));
      day4[0].DATE_FROM == day4[0].DATE_TO
        ? (unit4 = moment(day4[0].DATE_FROM).format("MMM DD"))
        : (unit4 =
            moment(day4[0].DATE_FROM).format("MMM DD") +
            " - " +
            moment(day4[0].DATE_TO).format("MMM DD"));
      day3[0].DATE_FROM == day3[0].DATE_TO
        ? (unit3 = moment(day3[0].DATE_FROM).format("MMM DD"))
        : (unit3 =
            moment(day3[0].DATE_FROM).format("MMM DD") +
            " - " +
            moment(day3[0].DATE_TO).format("MMM DD"));
      day2[0].DATE_FROM == day2[0].DATE_TO
        ? (unit2 = moment(day2[0].DATE_FROM).format("MMM DD"))
        : (unit2 =
            moment(day2[0].DATE_FROM).format("MMM DD") +
            " - " +
            moment(day2[0].DATE_TO).format("MMM DD"));
      day1[0].DATE_FROM == day1[0].DATE_TO
        ? (unit1 = moment(day1[0].DATE_FROM).format("MMM DD"))
        : (unit1 =
            moment(day1[0].DATE_FROM).format("MMM DD") +
            " - " +
            moment(day1[0].DATE_TO).format("MMM DD"));

      this.datacollection = {
        labels: [unit7, unit6, unit5, unit4, unit3, unit2, unit1],
        datasets: [
          {
            label: "Quotes",
            backgroundColor: "rgba(75, 192, 192, 0.7)",
            data: [
              day7[0].QUOTES_NO,
              day6[0].QUOTES_NO,
              day5[0].QUOTES_NO,
              day4[0].QUOTES_NO,
              day3[0].QUOTES_NO,
              day2[0].QUOTES_NO,
              day1[0].QUOTES_NO
            ]
          },
          {
            label: "Revisions",
            backgroundColor: "rgba(80, 222, 175, 0.7)",
            data: [
              day7[0].REVISION_NO,
              day6[0].REVISION_NO,
              day5[0].REVISION_NO,
              day4[0].REVISION_NO,
              day3[0].REVISION_NO,
              day2[0].REVISION_NO,
              day1[0].REVISION_NO
            ]
          },
          {
            label: "Orders",
            backgroundColor: "rgba(36, 255, 182, 0.7)",
            data: [
              day7[0].ORDERS_IN_NO,
              day6[0].ORDERS_IN_NO,
              day5[0].ORDERS_IN_NO,
              day4[0].ORDERS_IN_NO,
              day3[0].ORDERS_IN_NO,
              day2[0].ORDERS_IN_NO,
              day1[0].ORDERS_IN_NO
            ]
          }
        ]
      };
    }
  }
};
</script>
