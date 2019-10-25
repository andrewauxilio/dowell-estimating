<template>
<div v-if="isLoggedIn && isGBG" class="container-fluid">

    <div class="row">

        <!-- Sales Value ({{ time }}) -->
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
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Sales Value ({{ time }})</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ totalKPI[0].SVALUE | toDollar }}</div>
                        </div>
                        <div v-if="totalLoad" class="col-auto">
                            <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
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
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Quotes Value ({{ time }})</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ totalKPI[0].QVALUE | toDollar }}</div>
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
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Revisions Value ({{ time }})</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ totalKPI[0].RVALUE | toDollar }}</div>
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
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Quotes Value ({{ time }})</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ totalKPI[0].DLVALUE | toDollar }}</div>
                        </div>
                        <div v-if="totalLoad" class="col-auto">
                            <i class="fas fa-clipboard-check fa-2x text-gray-300"></i>
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
                    <h6 class="m-0 font-weight-bold text-success">Value ($) {{ time }}</h6>
                </div>
                <div class="card-body">
                    <div class="card-body table-responsive p-0">
                        <div v-if="!totalLoad" class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                        <totalValueBar v-if="show && totalLoad" />
                    </div>
                </div>
            </div>
        </div>

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

        <div class="col-xl-12 col-lg-12">
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
                                    <th scope="col" class="bg-success text-light">Sales</th>
                                    <th scope="col" class="bg-secondary text-light">Quotes Value </th>
                                    <th scope="col" class="bg-secondary text-light">No. of Quotes</th>
                                    <th scope="col" class="bg-secondary text-light">Revisions Value</th>
                                    <th scope="col" class="bg-secondary text-light">No. of Revision</th>
                                    <th scope="col" class="bg-secondary text-light">Orders Value</th>
                                    <th scope="col" class="bg-secondary text-light">No. of Orders</th>
                                </tr>
                            </thead>
                            <tbody v-for="estimatorKPI in estimatorKPI" :key="estimatorKPI.id">
                                <td>{{ estimatorKPI.USER_NAME }}</td>
                                <td>{{ estimatorKPI.SVALUE | toDollar }}</td>
                                <td>{{ estimatorKPI.QVALUE | toDollar }}</td>
                                <td>{{ estimatorKPI.QTEQTY }}</td>
                                <td>{{ estimatorKPI.RVALUE | toDollar }}</td>
                                <td>{{ estimatorKPI.RQTY }}</td>
                                <td>{{ estimatorKPI.DLVALUE | toDollar }}</td>
                                <td>{{ estimatorKPI.DLQTY }}</td>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="fab-container">
        <button class="buttons" tooltip="Past 7 Days" v-on:click="getDataWeek()">7</button>
        <button class="buttons" tooltip="Past 30 Days" v-on:click="getDataMonth()">30</button>
        <button class="buttons" tooltip="Download Reports" data-toggle="modal" data-target=".report-modal"><i class="fab fas fa-download"></i></button>
        <button class="buttons" tooltip="Actions" href="#"><i class="fab fas fa-cogs"></i></button>
    </div>

    <!-- Report modal -->
    <div class="modal fade report-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-dark font-weight-bold">Download Reports</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Report Name</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Report 1</th>
                                <td><a href="http://dweqxsql04/Reports/report/CustomerInvoice/report_Customer_Invoice" target="_blank">Test Report</a></td>
                            </tr>
                            <tr>
                                <th>Report 2</th>
                                <td><a href="http://uat.website.dowell.com.au/" target="_blank">http://uat.website.dowell.com.au/</a></td>
                            </tr>
                            <tr>
                                <th>Report 3</th>
                                <td><a href="http://uat.website.dowell.com.au/" target="_blank">http://uat.website.dowell.com.au/</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import totalValueBar from '../chart-data/qld/gbg/totalValueBar';
import totalQuantityBar from '../chart-data/qld/gbg/totalQuantityBar';
import axios from 'axios'
import { mapGetters } from 'vuex'
import { nextTick } from 'q';

export default {
    name: 'geebung',
    components: {
        totalValueBar,
        totalQuantityBar
    },
    data() {
        return {
            show: true,
            time: ''
        }
    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'isLoggedIn',       //module:auth: logged-in getter
            isGBG: 'isGBG',                 //module:auth: geebung getter
            estimatorKPI: 'getGBGKPI',      //module:gbg: specific estimator KPI data getter
            totalKPI: 'getGBGKPITotal',     //module:gbg: total estimator KPI data getter
            totalLoad: 'getGBGTotalKPIStatus', //module:gbg: loading status getter
            KPILoad: 'getGBGKPIStatus'         //module:gbg: loading status getter
        }),
    },
    mounted() {
        this.permissionCheck();
        this.getDataMonth();
    },
    methods: {
        /**-------------------------------------------------------------------
        ***                   Retrieve Weekly Data
        ***-------------------------------------------------------------------
        *** Function: Triggers actions from the geebung.js module. Updates
        *** the gbgEstimatorKPI and gbgTotalKPI to Weekly.
        ***-------------------------------------------------------------------
        **/
        getDataWeek() {
            if (this.totalLoad == true && this.KPILoad == true) {              //basically changes both loading status for total and specific estimator
                this.$store.dispatch('toggle_gbg_total_KPI_status')            //data to false
                this.$store.dispatch('toggle_gbg_est_KPI_status')
            }
            this.time = ''                                                     //clears time string (for card headers)
            this.$store.dispatch('getGBGKPIWeek')                              //Triggers module:gbg:getGBGKPIWeek
            this.$store.dispatch('getGBGKPITotalWeek')                         //Triggers module:gbg:getGBGKPITotalWeek
                .then(() => {
                    if (this.totalLoad == false && this.KPILoad == false) {    //once data is loaded change loading status to true 
                        this.$store.dispatch('toggle_gbg_total_KPI_status')
                        this.$store.dispatch('toggle_gbg_est_KPI_status')
                    }
                    this.time = 'Last 7 Days'                                  //change time string to 'Last 7 Days' (for card headers)
                    this.show = false                                          //hides charts components
                    nextTick(() => {                                           //reloads charts components with new data
                        this.show = true
                    })
                })
                .finally(() => {                                               //Fires a notification toast on top right of screen
                    if (this.isGBG && this.isLoggedIn) {                              
                        toast.fire({
                            type: "info",
                            title: "Showing data for the past 7 days"
                        })                                       
                    }
                })
        },
        /**-------------------------------------------------------------------
        ***                   Retrieve Monthly Data
        ***-------------------------------------------------------------------
        *** Function: Triggers actions from the geebung.js module. Updates
        *** the gbgEstimatorKPI and gbgTotalKPI to Monthly.
        ***-------------------------------------------------------------------
        **/
        getDataMonth() {
            if (this.totalLoad == true && this.KPILoad == true) {              
                this.$store.dispatch('toggle_gbg_total_KPI_status')            //See comments from getDataWeekly()
                this.$store.dispatch('toggle_gbg_est_KPI_status')
            }
            this.time = ''
            this.$store.dispatch('getGBGKPIMonth')
            this.$store.dispatch('getGBGKPITotalMonth')
                .then(() => {
                    if (this.totalLoad == false && this.KPILoad == false) {
                        this.$store.dispatch('toggle_gbg_total_KPI_status')
                        this.$store.dispatch('toggle_gbg_est_KPI_status')
                    }
                    this.time = 'Last 30 Days'
                    this.show = false
                    nextTick(() => {
                        this.show = true
                    })
                })
                .finally(() => {
                    if (this.isGBG && this.isLoggedIn) {                              
                        toast.fire({
                            type: "info",
                            title: "Showing data for the past 30 days"
                        })                                       
                    }
                })
        },
        /**-------------------------------------------------------------------
        ***                   Double Check User Permission
        ***-------------------------------------------------------------------
        *** Function: Check if the user is both logged in and a Geebung user
        ***-------------------------------------------------------------------
        **/
        permissionCheck() {
            if (!this.isGBG || !this.isLoggedIn) {                              //if the user is not a geebung or not logged in
                this.$router.push('/404')                                       //redirect to 404 page
            }
        },
    }
}
</script>

