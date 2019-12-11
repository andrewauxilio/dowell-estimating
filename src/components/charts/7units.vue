<template>
<div class="container-fluid">
    <div v-if="loading" class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
    <!-- <transition name="fade"> -->
    <bar-chart v-if="!loading" :chart-data="datacollection" :options="options"></bar-chart>
    <!-- </transition> -->
</div>
</template>

<script>
import moment from "moment";
import {
    mapGetters
} from "vuex";
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
            siteData4: [],
            siteData5: [],
            siteData6: [],
            siteData7: [],
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
                    xAxes: [{
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        maxBarThickness: 25,
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    yAxes: [{
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
                    }]
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
        site: String,
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

            let dateDifference = this.endDate - this.startDate

            let endDate2 = moment(this.startDate).subtract(1, "days").format("YYYYMMDD")
            let startDate2 = moment(endDate2).subtract(dateDifference, "days").format("YYYYMMDD")

            let endDate3 = moment(startDate2).subtract(1, "days").format("YYYYMMDD")
            let startDate3 = moment(endDate3).subtract(dateDifference, "days").format("YYYYMMDD")

            let endDate4 = moment(startDate3).subtract(1, "days").format("YYYYMMDD")
            let startDate4 = moment(endDate4).subtract(dateDifference, "days").format("YYYYMMDD")

            let endDate5 = moment(startDate4).subtract(1, "days").format("YYYYMMDD")
            let startDate5 = moment(endDate5).subtract(dateDifference, "days").format("YYYYMMDD")

            let endDate6 = moment(startDate5).subtract(1, "days").format("YYYYMMDD")
            let startDate6 = moment(endDate6).subtract(dateDifference, "days").format("YYYYMMDD")

            let endDate7 = moment(startDate6).subtract(1, "days").format("YYYYMMDD")
            let startDate7 = moment(endDate7).subtract(dateDifference, "days").format("YYYYMMDD")

            console.log(dateDifference)
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
                    this.siteData1 = responseArr[0].data;
                    this.siteData2 = responseArr[1].data;
                    this.siteData3 = responseArr[2].data;
                    this.siteData4 = responseArr[3].data;
                    this.siteData5 = responseArr[4].data;
                    this.siteData6 = responseArr[5].data;
                    this.siteData7 = responseArr[6].data;

                    console.log(this.siteData1);
                    console.log(this.siteData2);
                    console.log(this.siteData3);

                    this.fillData();
                    this.loading = false;
                    toast.fire({
                        type: "success",
                        title: "Chart data loaded"
                    })

                });

        },

        fillData() {
            let day1 = this.siteData1;
            let day2 = this.siteData2;
            let day3 = this.siteData3;
            let day4 = this.siteData4;
            let day5 = this.siteData5;
            let day6 = this.siteData6;
            let day7 = this.siteData7;

            this.datacollection = {
                labels: [
                    moment(day7[0].DATE_FROM).format('MMM DD YY') + " - " + moment(day7[0].DATE_TO).format('MMM DD YY'),
                    moment(day6[0].DATE_FROM).format('MMM DD YY') + " - " + moment(day6[0].DATE_TO).format('MMM DD YY'),
                    moment(day5[0].DATE_FROM).format('MMM DD YY') + " - " + moment(day5[0].DATE_TO).format('MMM DD YY'),
                    moment(day4[0].DATE_FROM).format('MMM DD YY') + " - " + moment(day4[0].DATE_TO).format('MMM DD YY'),
                    moment(day3[0].DATE_FROM).format('MMM DD YY') + " - " + moment(day3[0].DATE_TO).format('MMM DD YY'),
                    moment(day2[0].DATE_FROM).format('MMM DD YY') + " - " + moment(day2[0].DATE_TO).format('MMM DD YY'),
                    moment(day1[0].DATE_FROM).format('MMM DD YY') + " - " + moment(day1[0].DATE_TO).format('MMM DD YY'),
                ],
                datasets: [{
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
