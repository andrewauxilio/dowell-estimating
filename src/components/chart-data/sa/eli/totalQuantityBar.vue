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
                    display: false
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
            let quantity_m1 = this.$store.getters.getELIKPITotal;
            let quantity_m2 = this.$store.getters.getELIKPITotalMonth2;
            let quantity_m3 = this.$store.getters.getELIKPITotalMonth3;
            let quoteOrder_m1 = parseInt(quantity_m1[0].QTEQTY) + parseInt(quantity_m1[0].DLQTY)
            let quoteOrder_m2 = parseInt(quantity_m2[0].QTEQTY) + parseInt(quantity_m2[0].DLQTY)
            let quoteOrder_m3 = parseInt(quantity_m3[0].QTEQTY) + parseInt(quantity_m3[0].DLQTY)

            this.datacollection = {
                labels: ['No. of Quotes', 'No. of Orders', 'No. of Revisions', 'Total (Quotes and Orders)'],
                datasets: [
                    {
                        label: "Month 3",
                        backgroundColor: "rgba(75, 192, 192, 0.25)",
                        data: [quantity_m3[0].QTEQTY, quantity_m3[0].DLQTY, quantity_m3[0].RQTY, quoteOrder_m3]
                    },
                                        {
                        label: "Month 2",
                        backgroundColor: "rgba(75, 192, 192, 0.50)",
                        data: [quantity_m2[0].QTEQTY,  quantity_m2[0].DLQTY, quantity_m2[0].RQTY, quoteOrder_m2]
                    },
                                        {
                        label: "Month 1",
                        backgroundColor: "rgba(75, 192, 192, 1)",
                        data: [quantity_m1[0].QTEQTY, quantity_m1[0].DLQTY, quantity_m1[0].RQTY, quoteOrder_m1]
                    }
                ]
            }
        }
    }
};
</script>
