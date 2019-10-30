<template>
<div v-if="isLoggedIn && isELI" class="container-fluid">

    <div class="row">

        <!-- QUANTITY-->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div v-if="!totalLoad" class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                        <div v-if="totalLoad" class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">No. of Quotes</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ totalKPI[0].QTEQTY }} Quotes</div>
                        </div>
                        <div v-if="totalLoad" class="col-auto">
                            <i class="fas fa-book fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div v-if="!totalLoad" class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                        <div v-if="totalLoad" class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">No. of Orders</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ totalKPI[0].DLQTY }} Live Jobs</div>
                        </div>
                        <div v-if="totalLoad" class="col-auto">
                            <i class="fas fa-truck fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div v-if="!totalLoad" class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                        <div v-if="totalLoad" class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">No. of Revisions</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ totalKPI[0].RQTY }} Quote Revisions</div>
                        </div>
                        <div v-if="totalLoad" class="col-auto">
                            <i class="fas fa-redo fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div v-if="!totalLoad" class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                        <div v-if="totalLoad" class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Total Quotes and Orders</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ quotes_orders_total }} Quotes and Jobs</div>
                        </div>
                        <div v-if="totalLoad" class="col-auto">
                            <i class="fas fa-equals fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="row">

        <div class="col-xl-6 col-lg-6">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Quantity {{ time }}</h6>
                </div>
                <div class="card-body">
                    <div class="card-body table-responsive p-0">
                        <div v-if="!totalLoad" class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                        <totalQuantityBar v-if="show && totalLoad" />
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-6 col-lg-6">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Estimating KPIs - {{ time }}</h6>
                </div>
                <div class="card-body">
                    <div v-if="!KPILoad" class="spinner">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
                    <div v-if="KPILoad" class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Estimator</th>
                                    <!-- <th scope="col" class="bg-success text-light">Sales</th>
                                    <th scope="col" class="bg-secondary text-light">Quotes Value </th> -->
                                    <th scope="col" class="bg-secondary text-light">No. of Quotes</th>
                                    <!-- <th scope="col" class="bg-secondary text-light">Orders Value</th> -->
                                    <th scope="col" class="bg-secondary text-light">No. of Orders</th>
                                    <th scope="col" class="bg-secondary text-light">No. of Revisions</th>
                                    <!-- <th scope="col" class="bg-secondary text-light">Revisions Value</th> -->
                                    <th scope="col" class="bg-secondary text-light">Total Quotes and Orders</th>
                                    
                                </tr>
                            </thead>
                            <tbody v-for="estimatorKPI in estimatorKPI" :key="estimatorKPI.id">
                                <td>{{ estimatorKPI.USER_NAME }}</td>
                                <!-- <td>{{ estimatorKPI.SVALUE | toDollar }}</td>
                                <td>{{ estimatorKPI.QVALUE | toDollar }}</td> -->
                                <td>{{ estimatorKPI.QTEQTY }}</td>
                                <td>{{ estimatorKPI.DLQTY }}</td>
                                <!-- <td>{{ estimatorKPI.RVALUE | toDollar }}</td> -->
                                <td>{{ estimatorKPI.RQTY }}</td>
                                <!-- <td>{{ estimatorKPI.DLVALUE | toDollar }}</td> -->
                                <td>{{ parseInt(estimatorKPI.QTEQTY) + parseInt(estimatorKPI.DLQTY) }}</td>
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
import totalValueBar from '../chart-data/sa/eli/totalValueBar';
import totalQuantityBar from '../chart-data/sa/eli/totalQuantityBar';
import axios from 'axios'
import { mapGetters } from 'vuex'
import { nextTick } from 'q';

export default {
    name: 'elizabeth',
    components: {
        totalValueBar,
        totalQuantityBar
    },
    data() {
        return {
            show: true,
            time: '',
            quotes_orders_total: null
        }
    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'isLoggedIn',           //module:auth: logged-in getter
            isELI: 'isELI',                     //module:auth: geebung getter
            estimatorKPI: 'getELIKPI',          //module:eli: specific estimator KPI data getter
            totalKPI: 'getELIKPITotal',         //module:eli: total estimator KPI data getter
            totalLoad: 'getELITotalKPIStatus',  //module:eli: loading status getter
            KPILoad: 'getELIKPIStatus'          //module:eli: loading status getter
        }),
    },
    mounted() {
        this.permissionCheck()
        this.get3MonthData()
   
    },
    methods: {
        /**-------------------------------------------------------------------
        ***                   Retrieve Monthly Data
        ***-------------------------------------------------------------------
        *** Function: Triggers actions from the geebung.js module. Updates
        *** the eliEstimatorKPI and eliTotalKPI to Monthly.
        ***-------------------------------------------------------------------
        **/
        getCurrentMonth() {
            if (this.totalLoad == true && this.KPILoad == true) {              
                this.$store.dispatch('toggle_eli_total_KPI_status')            
                this.$store.dispatch('toggle_eli_est_KPI_status')
            }
            this.time = ''
            this.$store.dispatch('getELIKPIMonth')
            this.$store.dispatch('getELIKPITotalMonth')
                .then(() => {
                    if (this.totalLoad == false && this.KPILoad == false) {
                        this.$store.dispatch('toggle_eli_total_KPI_status')
                        this.$store.dispatch('toggle_eli_est_KPI_status')
                    }
                    this.quotes_orders_total =  parseInt(this.totalKPI[0].DLQTY) + parseInt(this.totalKPI[0].QTEQTY)
                    this.time = 'Last 30 Days'
                    this.show = false
                    nextTick(() => {
                        this.show = true
                    })
                })
                .finally(() => {
                    if (this.isELI && this.isLoggedIn) {                              
                        toast.fire({
                            type: "info",
                            title: "Showing data for Elizabeth"
                        })                                       
                    }
                })
        },

        get3MonthData() {
            this.$store.dispatch('getELIKPITotalMonth2')                        //Previous month
            this.$store.dispatch('getELIKPITotalMonth3').then(() => {           //2 months prior
                this.getCurrentMonth()                                          //Current Month                        
            })                        
        },

        /**-------------------------------------------------------------------
        ***                   Double Check User Permission
        ***-------------------------------------------------------------------
        *** Function: Check if the user is both logged in and a Geebung user
        ***-------------------------------------------------------------------
        **/
        permissionCheck() {
            if (!this.isELI || !this.isLoggedIn) {                              //if the user is not a geebung or not logged in
                this.$router.push('/404')                                       //redirect to 404 page
            }
        },
    }
}
</script>

