<template>
<div class="container-fluid">
    <transition name="fade">
        <bar-chart :chart-data="datacollection" :options="options"></bar-chart>
    </transition>
</div>
</template>

<script>
import BarChart from '../../../../chart-js/bar-chart'

import axios from 'axios'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.access_token

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
                            display: true,
                            beginAtZero: true
                        },
                    }],
                },
                legend: {
                    display: true
                },
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    titleMarginBottom: 10,
                    titleFontColor: '#6e707e',
                    titleFontSize: 14,
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    intersect: false,
                    mode: 'index',
                    caretPadding: 10,
                }
            }
        }
    },

    mounted() {
        this.fillData()
    },
    methods: {
        fillData() {
            if (this.$store.getters.getELITotalKPIStatus) {
                let quantity_m1 = this.$store.getters.getELIKPITotal;
                let quantity_m2 = this.$store.getters.getELIKPITotalMonth2;
                let quantity_m3 = this.$store.getters.getELIKPITotalMonth3;
                // let quoteOrder_m1 = parseInt(quantity_m1[0].QUOTES_NO) + parseInt(quantity_m1[0].ORDERS_IN_NO)
                // let quoteOrder_m2 = parseInt(quantity_m2[0].QUOTES_NO) + parseInt(quantity_m2[0].ORDERS_IN_NO)
                // let quoteOrder_m3 = parseInt(quantity_m3[0].QUOTES_NO) + parseInt(quantity_m3[0].ORDERS_IN_NO)

                this.datacollection = {
                    labels: [quantity_m3[0].DATE_FROM + " to " + quantity_m3[0].DATE_TO, quantity_m2[0].DATE_FROM + " to " + quantity_m2[0].DATE_TO, 'Current Month'],
                    datasets: [
                        {
                            label: 'No. of Quotes',
                            backgroundColor: "rgba(75, 192, 192, 0.25)",
                            data: [quantity_m3[0].QUOTES_NO, quantity_m2[0].QUOTES_NO, quantity_m1[0].QUOTES_NO]
                        },
                        {
                            label: 'No. of Orders',
                            backgroundColor: "rgba(75, 192, 192, 0.50)",
                            data: [quantity_m3[0].ORDERS_IN_NO,  quantity_m2[0].ORDERS_IN_NO,  quantity_m1[0].ORDERS_IN_NO]
                        },
                        {
                            label: "No. of Revisions",
                            backgroundColor: "rgba(75, 192, 192, 1)",
                            data: [quantity_m3[0].REVISION_NO, quantity_m2[0].REVISION_NO, quantity_m1[0].REVISION_NO]
                        }
                    ]
                }
            }   
        }
    }
};
</script>
