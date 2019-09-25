<template>
<div class="container-fluid">
    <div v-if="loading" class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
    <transition name="fade">
        <line-chart v-if="!loading" :chart-data="datacollection" :options="options"></line-chart>
    </transition>
</div>
</template>

<script>
import LineChart from '../../../chart-js/line-chart'

import axios from 'axios'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.access_token

export default {
    components: {
        LineChart
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
                        time: {
                        unit: 'date'
                        },
                        gridLines: {
                        display: false,
                        drawBorder: false
                        },
                        ticks: {
                        maxTicksLimit: 7
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            maxTicksLimit: 5,
                            padding: 10,
                        },
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
            let location = new Array();
            let quantity = new Array();
            axios.get("/estimating/nat/new-quote-requests/all")
                .then(response => {
                    let data = response.data;
                    if (data) {
                        data.forEach(element => {
                            location.push(element.location);
                            quantity.push(element.Quantity);
                        })
                    } else {
                        console.log("No data");
                    }
                })
                .finally(() => {
                    this.datacollection = {
                        labels: location,
                        datasets: [{
                            label: "Quote Requests",
                            lineTension: 0.3,
                            backgroundColor: "rgba(75, 192, 192, 0.5)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            pointRadius: 3,
                            pointBackgroundColor: "rgba(75, 192, 192, 1)",
                            pointBorderColor: "rgba(75, 192, 192, 1)",
                            pointHoverRadius: 3,
                            pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
                            pointHoverBorderColor: "rgba(75, 192, 192, 1)",
                            pointHitRadius: 10,
                            pointBorderWidth: 2,
                            data: quantity
                        }]
                    }
                    this.loading = false
                })
        }
    }
};
</script>

<style scoped>
.spinner {
    margin: 50px auto 0;
    margin-bottom: 50px ;
    width: 70px;
    text-align: center;
}

.spinner>div {
    width: 18px;
    height: 18px;
    background-color: #17A471;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
}

.spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {

    0%,
    80%,
    100% {
        -webkit-transform: scale(0)
    }

    40% {
        -webkit-transform: scale(1.0)
    }
}

@keyframes sk-bouncedelay {

    0%,
    80%,
    100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    40% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
    }
}
</style>
