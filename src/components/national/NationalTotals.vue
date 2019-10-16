<template>
<div v-if="loggedIn && isNAT" class="container-fluid">
    
    <div class="row">
        <div class="col-xl-3 col-lg-6">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">New Quote Rquests (Bar Chart)</h6>
                </div>
                <div class="card-body">
                    <div class="card-body table-responsive p-0">
                        <newQuoteRequestBar />
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-lg-6">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">New Quote Rquests (Pie Chart)</h6>
                </div>
                <div class="card-body">
                    <div class="card-body table-responsive p-0">
                        <newQuoteRequestPie />
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-lg-6">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">New Quote Rquests (Line Chart)</h6>
                </div>
                <div class="card-body">
                    <div class="card-body table-responsive p-0">
                        <newQuoteRequestLine />
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-lg-6">
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
//axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

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
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        },
        isNAT() {
            return this.$store.getters.isNAT
        },
    },
    mounted() {
        this.getQuoteRequests()
        this.permissionCheck()
    },
    methods: {
        permissionCheck() {
            if(!this.isNAT || !this.loggedIn) {
                this.$router.push('/404')
            }
        },

        getQuoteRequests(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.access_token

            if(this.isNAT) {
                return new Promise((resolve, reject) => {
                axios.get('/estimating/nat/new-quote-requests/all')
                    .then(response => {
                        this.newQuoteRequests = response
                        console.log(response)
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
            }
        },
    }
}
</script>
