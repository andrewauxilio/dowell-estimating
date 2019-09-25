<template>
<div class="container-fluid">
    <div v-if="loading" class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
    <transition name="fade">
        <pie-chart v-if="!loading" :chart-data="datacollection" :options="options"></pie-chart>
    </transition>
</div>
</template>

<script>
import PieChart from '../../../chart-js/pie-chart'

import axios from 'axios'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.access_token

export default {
    components: {
        PieChart
    },
    data() {
        return {
            loading: true,
            datacollection: {},
            options: {
                responsive: true,
                maintainAspectRatio: false
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
                            backgroundColor: [
                              "#B1E6C8",
                              "#83DBA9",
                              "#C3F4E4",
                              "#63E5A9",
                              "#69DFB5",
                              "#42E4B3",
                              "#52A36B",
                              "#27B46F",
                              "#38A97D",
                              "#01AC78"
                             
                            ],
                            // borderColor: [
                            //   "rgba(54, 162, 235, 1)",
                            //   "rgba(255, 206, 86, 1)",
                            //   "rgba(75, 192, 192, 1)",
                            //   "rgba(153, 102, 255, 1)",
                            //   "rgba(255, 159, 64, 1)",
                            //   "rgba(255, 99, 132, 1)"
                            // ],
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


