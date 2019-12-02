<template>
  <div class="container-fluid">
    <transition name="fade">
      <bar-chart v-if="!loading" :chart-data="datacollection" :options="options"></bar-chart>
    </transition>
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
      siteData1: [],
      siteData2: [],
      siteData3: [],
      loading: true,
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

  props: {
    site: String
  },

  mounted() {
    this.fetchData();
  },

  computed: {
    ...mapGetters({
      startDate: "getStartDate",
      endDate: "getEndDate"
    })
  },

  methods: {
    async fetchData() {
      this.loading = true;
      await axios
        .all([
          axios.post("/estimating/kpis", {
            end: this.endDate,
            start: this.startDate,
            site: this.site,
            grouped: 0
          }),

          axios.post("/estimating/kpis", {
            end: moment(this.endDate)
              .subtract(4, "days")
              .format("YYYYMMDD"),
            start: moment(this.startDate)
              .subtract(4, "days")
              .format("YYYYMMDD"),
            site: this.site,
            grouped: 0
          }),

          axios.post("/estimating/kpis", {
            end: moment(this.endDate)
              .subtract(5, "days")
              .format("YYYYMMDD"),
            start: moment(this.startDate)
              .subtract(5, "days")
              .format("YYYYMMDD"),
            site: this.site,
            grouped: 0
          })
        ])
        .then(responseArr => {
          this.siteData1 = responseArr[0].data;
          this.siteData2 = responseArr[1].data;
          this.siteData3 = responseArr[2].data;

          console.log(responseArr[0].data);
          console.log(responseArr[1].data);
          console.log(responseArr[2].data);

          console.log(this.siteData1);
          console.log(this.siteData2);
          console.log(this.siteData3);

          this.fillData();
          this.loading = false;
        });
    },

    fillData() {
      let day1 = this.siteData1;
      let day2 = this.siteData2;
      let day3 = this.siteData3;
      this.datacollection = {
        labels: [moment(day3[0].DATE_TO).format('MMMM Do YYYY'), moment(day2[0].DATE_TO).format('MMMM Do YYYY'), moment(day1[0].DATE_TO).format('MMMM Do YYYY')],
        datasets: [
          {
            label: "Quotes",
            backgroundColor: "rgba(75, 192, 192, 0.7)",
            data: [
              day3[0].QUOTES_NO,
              day2[0].QUOTES_NO,
              day1[0].QUOTES_NO
            ]
          },
          {
            label: "Revisions",
            backgroundColor: "rgba(75, 192, 192, 0.7)",
            data: [
              day3[0].REVISION_NO,
              day2[0].REVISION_NO,
              day1[0].REVISION_NO
            ]
          },
          {
            label: "Orders",
            backgroundColor: "rgba(75, 192, 192, 0.7)",
            data: [
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
