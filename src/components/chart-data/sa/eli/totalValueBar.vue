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
                        }
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
               this.$store.dispatch('getELIKPITotalMonth2')
        this.$store.dispatch('getELIKPITotalMonth3')
            let quantity_m1 = this.$store.getters.getELIKPITotal;
            let quantity_m2 = this.$store.getters.getELIKPITotalMonth2;
            let quantity_m3 = this.$store.getters.getELIKPITotalMonth3;

            this.datacollection = {
                labels: ['Sales', 'Quotes', 'Revisons', 'Orders'],
                datasets: [
                    {
                        label: "Month 3",
                        backgroundColor: "rgba(75, 192, 192, 0.25)",
                        data: [quantity_m3[0].SALES_$, quantity_m3[0].QUOTES_$, quantity_m3[0].REVISIONS_$, quantity_m3[0].ORDERS_IN_$]
                    },
                    {
                        label: "Month 2",
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                        data: [quantity_m2[0].SALES_$, quantity_m2[0].QUOTES_$, quantity_m2[0].REVISIONS_$, quantity_m2[0].ORDERS_IN_$]
                    },
                    {
                        label: "Month 1",
                        backgroundColor: "rgba(75, 192, 192, 1)",
                        data: [quantity_m1[0].SALES_$, quantity_m1[0].QUOTES_$, quantity_m1[0].REVISIONS_$, quantity_m1[0].ORDERS_IN_$]
                    },
                      
                ]
            }
        }
    }
};
</script>
