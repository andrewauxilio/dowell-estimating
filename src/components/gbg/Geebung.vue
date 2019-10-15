<template>
<div v-if="loggedIn && isGBG" class="container-fluid">
    <div class="row">
        <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Estimating KPIs (Last 30 Days)</h6>
                </div>
                <div class="card-body">
                    <div v-if="loading" class="spinner">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
                    <div v-if="!loading" class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Estimator</th>
                                    <th scope="col" class="bg-success text-light">Sales</th>
                                    <th scope="col" class="bg-secondary text-light">Quotes Value </th>
                                    <th scope="col" class="bg-secondary text-light">No. of Quotes</th>
                                    <th scope="col" class="bg-secondary text-light">Revisions Value</th>
                                    <th scope="col" class="bg-secondary text-light">No. of Revision</th>
                                    <th scope="col" class="bg-secondary text-light">Orders Value</th>
                                    <th scope="col" class="bg-secondary text-light">No. of Orders</th>
                                </tr>
                            </thead>
                            <tbody v-for="estimatorKPI in estimatorKPI.data" :key="estimatorKPI.id">
                               <td>{{ estimatorKPI.USER_NAME }}</td>
                               <td>{{ estimatorKPI.SVALUE }}</td>
                               <td>{{ estimatorKPI.QVALUE }}</td>
                               <td>{{ estimatorKPI.QTEQTY }}</td>
                               <td>{{ estimatorKPI.RVALUE }}</td>
                               <td>{{ estimatorKPI.RQTY }}</td>
                               <td>{{ estimatorKPI.DLVALUE }}</td>
                               <td>{{ estimatorKPI.DLQTY }}</td>
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
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export default {
    name: 'national-totals',
    components: {},
    data() {
        return {
            estimatorKPI: {},
            loading: true
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        },
        isGBG() {
            return this.$store.getters.isGBG
        },
    },
    mounted() {
        this.permissionCheck();
        this.getGBGKPI();
    },
    methods: {
        permissionCheck() {
            if(!this.isGBG || !this.loggedIn) {
                this.$router.push('/404')
            }
        },

        getGBGKPI(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.access_token

            if(this.isGBG) {
                return new Promise((resolve, reject) => {
                axios.get('/estimating/qld/kpi/gbg')
                    .then(response => {
                        this.estimatorKPI = response
                        console.log(response);
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

