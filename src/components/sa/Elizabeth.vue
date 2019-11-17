<template>
<div v-if="isLoggedIn && isELI" class="container-fluid">

    <div class="row">

        <!-- QUANTITY-->
        <div class="col-xl-4 col-md-6 mb-4">
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
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ totalKPI[0].QUOTES_NO }} Quotes</div>
                        </div>
                        <div v-if="totalLoad" class="col-auto">
                            <i class="fas fa-book fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-4 col-md-6 mb-4">
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
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ totalKPI[0].ORDERS_IN_NO }} Live Jobs</div>
                        </div>
                        <div v-if="totalLoad" class="col-auto">
                            <i class="fas fa-truck fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-4 col-md-6 mb-4">
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
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ totalKPI[0].REVISION_NO }} Quote Revisions</div>
                        </div>
                        <div v-if="totalLoad" class="col-auto">
                            <i class="fas fa-redo fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="col-xl-3 col-md-6 mb-4">
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
        </div> -->

    </div>

    <div class="row">

        <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">3 Month Comparison</h6>
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

        <!--  -->

        <div class="fab-container">
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
                    <div class="modal-body" v-if="totalLoad">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Report Name</th>
                                    <th>Link</th>
                                    <th>Download Report</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>KPI Report</th>
                                    <td><a :href="'http://dweqxsql04/reports/report/Quoting/KPIEstimator?' + reportSite + reporteDateStart + reportDateEnd" target="_blank">View Report</a></td>
                                    <td>
                                        <a style="color:red; margin:2px;" :href="'http://dweqxsql04/Reportserver?%2fQuoting%2fKPIEstimator&rs:Command=Render&rs:Format=PDF&' + reportSite + reporteDateStart + reportDateEnd" target="_blank"><i class="fas fa-file-pdf fa-3x"></i></a>
                                        <a style="color:green; margin:2px;" :href="'http://dweqxsql04/Reportserver?%2fQuoting%2fKPIEstimator&rs:Command=Render&rs:Format=EXCEL&' + reportSite + reporteDateStart + reportDateEnd" target="_blank"><i class="fas fa-file-excel fa-3x"></i></a>
                                        <a style="color:blue; margin:2px;" :href="'http://dweqxsql04/Reportserver?%2fQuoting%2fKPIEstimator&rs:Command=Render&rs:Format=CSV&' + reportSite + reporteDateStart + reportDateEnd" target="_blank"><i class="fas fa-file-csv fa-3x"></i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <p class="mr-auto">IMPORTANT: Please make sure you are logged in to Dowell's citrix desktop.
                            The reports are only accessible inside the Dowell's citrix desktop.</p>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
            reportSite: '',
            reporteDateStart: '',
            reportDateEnd: '',
            show: true,
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
    async created() {
        this.permissionCheck()
        this.getMonthTwo();
        this.getMonthThree();
        await this.getMonthOne()
    },
    methods: {
 
        getMonthOne() {
            if (this.totalLoad == true && this.KPILoad == true) {              
                this.$store.dispatch('toggle_eli_total_KPI_status')            
                this.$store.dispatch('toggle_eli_est_KPI_status')
            }
            this.$store.dispatch('getELIKPIMonth')
            this.$store.dispatch('getELIKPITotalMonth')
            .then(() => {
                if (this.totalLoad == false && this.KPILoad == false) {
                    this.$store.dispatch('toggle_eli_total_KPI_status')
                    this.$store.dispatch('toggle_eli_est_KPI_status')
                }
                this.quotes_orders_total =  parseInt(this.totalKPI[0].ORDERS_IN_NO) + parseInt(this.totalKPI[0].QUOTES_NO)
                this.show = false
                nextTick(() => {
                    this.show = true
                })
                this.fireToast()
            })
        },

        getMonthTwo() {
            this.$store.dispatch('getELIKPITotalMonth2') 
        },

        getMonthThree() {
            this.$store.dispatch('getELIKPITotalMonth3')
        },

        getReportData() {
            let reportDateStart =  moment(this.totalKPI[0].DATE_FROM)
            let reportDateEnd =  moment(this.totalKPI[0].DATE_TO)
            this.reportSite = 'POO=' + this.totalKPI[0].POO
            this.reporteDateStart = '&DateStart=' + reportDateStart.format('YYYYMMDD')
            this.reportDateEnd = '&DateEnd=' + reportDateEnd.format('YYYYMMDD')
        },

        fireToast() {
            if (this.isELI && this.isLoggedIn) {                              
                toast.fire({
                    type: "info",
                    title: "Showing data for Elizabeth"
                })                                       
            }
        },

        permissionCheck() {
            if (!this.isELI || !this.isLoggedIn) {                              //if the user is not a geebung or not logged in
                this.$router.push('/404')                                       //redirect to 404 page
            }
        },
    }
}
</script>

<style scoped>
    .dl-buttons {
        margin: 100px;
        padding: 100px;
    }
</style>