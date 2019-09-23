<template>
<div class="container-fluid">
    
    <div class="row">
        <div class="col-xl-6 col-lg-6">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Bar Chart</h6>
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
                    <h6 class="m-0 font-weight-bold text-primary">Pie Chart</h6>
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
                    <h6 class="m-0 font-weight-bold text-primary">Line Chart</h6>
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
                    <h6 class="m-0 font-weight-bold text-primary">All Quote Requests</h6>
                </div>
                <div class="card-body">
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover">
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
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/estimating'

export default {
    components: {
        newQuoteRequestBar,
        newQuoteRequestPie,
        newQuoteRequestLine
    },
    data() {
        return {
            newQuoteRequests: {},
        }
    },
    mounted() {
        this.getQuoteRequests()
    },
    methods: {
        getQuoteRequests(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.access_token
            return new Promise((resolve, reject) => {
                axios.get('/nat/new-quote-requests/all')
                    .then(response => {
                        this.newQuoteRequests = response
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                        console.log(error)
                    })
            })
        },
    }
}
</script>
