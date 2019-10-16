<template>
<div class="container-fluid">
    <div v-if="loading" class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
    <transition name="fade">
        <bar-chart v-if="!loading" :chart-data="datacollection" :options="options"></bar-chart>
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
            let quantity = [];
            axios.get("/estimating/qld/kpi/gbg-total")
                .then(response => {
                    quantity = response.data;           
                })
                .finally(() => {
                    this.datacollection = {
                        labels: ['Sales', 'Quotes', 'Revisons', 'Orders'],
                        datasets: [{
                            label: "Value in AUD",
                            backgroundColor: "rgba(75, 192, 192, 0.7)",
                            data: [quantity[0].SVALUE, quantity[0].QVALUE, quantity[0].RVALUE, quantity[0].DLVALUE]
                        }]
                    }
                    this.loading = false
                })
        }
    }
};
</script>

