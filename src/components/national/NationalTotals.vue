<template>
<div class="container-fluid">
    
    <div class="row">
        <div class="col-xl-6 col-lg-6">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Bar Chart</h6>
                </div>
                <div class="card-body">
                    <div class="card-body table-responsive p-0">
                        <newQuoteRequestBar />
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-6 col-lg-6">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Pie Chart</h6>
                </div>
                <div class="card-body">
                    <div class="card-body table-responsive p-0">
                        <newQuoteRequestPie />
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-6 col-lg-6">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Line Chart</h6>
                </div>
                <div class="card-body">
                    <div class="card-body table-responsive p-0">
                        <newQuoteRequestLine />
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-6 col-lg-6">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">All Quote Requests</h6>
                </div>
                <div class="card-body">
                    <div class="card-body table-responsive p-0">
                        <div v-if="loading" class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                        <table v-if="!loading" class="table table-hover">
                            <tbody>
                                <tr>
                                    <th class="text-center">Site</th>
                                    <th class="text-center">Requests</th>
                                </tr>
                                <tr v-for="newQuoteRequest in newQuoteRequests.data" :key="newQuoteRequest.id">
                                    <td class="text-center">{{ newQuoteRequest.location }}</td>
                                    <td class="text-center">{{ newQuoteRequest.Quantity }}</td>
                                </tr>
                                <!-- <tr v-for="newQuoteRequestsTotals in newQuoteRequestsTotal" :key="newQuoteRequestsTotals.id">
                            <th class="site">Total</th>
                            <td class="number">{{ newQuoteRequestsTotals.Quantity }}</td>
                        </tr> -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import newQuoteRequestBar from '../chart-data/national/newQuoteRequestsBar';
import newQuoteRequestPie from '../chart-data/national/newQuoteRequestsPie';
import newQuoteRequestLine from '../chart-data/national/newQuoteRequestsLine';
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export default {
    name: 'national-totals',
    components: {
        newQuoteRequestBar,
        newQuoteRequestPie,
        newQuoteRequestLine
    },
    data() {
        return {
            newQuoteRequests: {},
            loading: true
        }
    },
    mounted() {
        this.getQuoteRequests()
    },
    methods: {
        getQuoteRequests(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.access_token
            return new Promise((resolve, reject) => {
                axios.get('/estimating/nat/new-quote-requests/all')
                    .then(response => {
                        this.newQuoteRequests = response
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                        console.log(error)
                    })
                    .finally(() => {
                        this.loading = false
                    })
            })
        },
    }
}
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