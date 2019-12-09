<template>
<div v-if="isLoggedIn" class="container-fluid">
    <div v-if="loading" class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
    <div v-if="!loading" class="row">
        <div class="col-lg-12 mb-4 animated fadeInUp">
            <div class="card bg-success text-white shadow">
                <div class="card-body">
                    <div>
                        <small>Page Last Updated: {{ lastUpdate }}</small>
                        <h5 class="mt-1">Current Date Range:</h5>
                        <span class="mt-1">From: {{ startDate | toPrettyDate }} to: {{ endDate | toPrettyDate }}</span>
                        <button type="submit" class="btn btn-danger float-right" @click="fetchData">Update Page</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="!loading" class="row">
        <div class="col-xl-4 col-md-6 mb-4 animated fadeInUp delay-1s">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Quotes</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ siteData[0].QUOTES_NO }} Quotes</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">Value: ${{ siteData[0].QUOTES_$ }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-book fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-4 col-md-6 mb-4 animated fadeInUp delay-1s">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Orders</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ siteData[0].ORDERS_IN_NO }} Orders</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">Value: ${{ siteData[0].ORDERS_IN_$ }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-truck fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-4 col-md-6 mb-4 animated fadeInUp delay-1s">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Revisions</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ siteData[0].REVISION_NO }} Revisions</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">Value: ${{ siteData[0].REVISION_$ }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-redo fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="!loading" class="row">
        <div class="col-xl-12 col-lg-12 animated fadeInUp delay-2s">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Past 3 Days Statistics</h6>
                </div>
                <div class="card-body">
                    <div class="card-body table-responsive p-0">
                        <dailyChart v-if="show" :site="site" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="!loading" class="fab-container">
        <button class="buttons" tooltip="Download Reports" data-toggle="modal" data-target=".report-modal">
            <i class="fab fas fa-download"></i>
        </button>
        <button class="buttons" tooltip="Change Dates" data-toggle="modal" data-target=".date-modal">
            <i class="fab fas fa-calendar-alt"></i>
        </button>
        <button class="buttons" tooltip="Actions">
            <i class="fab fas fa-cogs"></i>
        </button>
    </div>

    <!-- Report modal -->
    <div class="modal fade report-modal" tabindex="-1" role="dialog" aria-hidden="true">
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
                                <th>Download Report</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>KPI Report</th>
                                <td>
                                    <a :href="report_url + 'POO=' + site + '&DateStart=' + startDate + '&DateEnd=' + endDate" target="_blank">View Report</a>
                                </td>
                                <td>
                                    <a style="color:red; margin:2px;" :href="report_pdf + 'POO=' + site + '&DateStart=' + startDate + '&DateEnd=' + endDate" target="_blank">
                                        <i class="fas fa-file-pdf fa-3x"></i>
                                    </a>
                                    <a style="color:green; margin:2px;" :href=" report_excel + 'POO=' + site + '&DateStart=' + startDate + '&DateEnd=' + endDate" target="_blank">
                                        <i class="fas fa-file-excel fa-3x"></i>
                                    </a>
                                    <a style="color:blue; margin:2px;" :href="report_csv + 'POO=' + site + '&DateStart=' + startDate + '&DateEnd=' + endDate" target="_blank">
                                        <i class="fas fa-file-csv fa-3x"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <p class="mr-auto">
                        IMPORTANT: Please make sure you are logged in to Dowell's citrix desktop.
                        The reports are only accessible inside the Dowell's citrix desktop.
                    </p>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade date-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-dark font-weight-bold">Change Dates</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Start Date</label>
                            <input type="date" class="form-control" v-model="c_startDate">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">End Date</label>
                            <input type="date" class="form-control" v-model="c_endDate">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="changeDate">Submit</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import axios from "axios";
import {
    mapGetters
} from "vuex";
import {
    nextTick
} from 'q';
import dailyChart from './chart-data/7days';
import loading from 'vue-loading-overlay';

export default {
    name: "dashboard",
    components: {
        dailyChart,
        loading
    },

    props: {
        site: String
    },

    data() {
        return {
            siteData: [],
            loading: true,
            visible: false,
            show: true,
            lastUpdate: "",
            c_startDate: "",
            c_endDate: "",
            report_url: "http://dweqxsql04/reports/report/Quoting/KPIEstimator?",
            report_pdf: "http://dweqxsql04/Reportserver?%2fQuoting%2fKPIEstimator&rs:Command=Render&rs:Format=PDF&",
            report_excel: "http://dweqxsql04/Reportserver?%2fQuoting%2fKPIEstimator&rs:Command=Render&rs:Format=EXCEL&",
            report_csv: "http://dweqxsql04/Reportserver?%2fQuoting%2fKPIEstimator&rs:Command=Render&rs:Format=CSV&"
        };
    },

    computed: {
        ...mapGetters({
            isLoggedIn: "isLoggedIn",
            startDate: "getStartDate",
            endDate: "getEndDate"
        })
    },
    mounted() {
        this.permissionCheck();
        this.fetchData();
    },

    methods: {
        permissionCheck() {
            if (!this.isLoggedIn) {
                this.$router.push("/404");
            }
        },

        pageLoader() {
            let loader = this.$loading.show({
                loader: 'dots'
            });
        },

        async fetchData() {
            this.lastUpdate = moment().format('MMMM Do YYYY, h:mm:ss a');
            this.show = false;
            this.loading = true;
            try {
                await axios
                    .post("/estimating/kpis", {
                        end: this.endDate,
                        start: this.startDate,
                        site: this.site,
                        grouped: 0
                    })
                    .then(response => {

                        this.siteData = response.data;
                        this.loading = false;
                        nextTick(() => {
                            this.show = true
                        })

                    })
                    .catch(err => {
                        console.log(err);
                    });
            } catch (e) {
                console.log(e);
            }
        },

        changeDate() {
            this.show = false
            this.loading = true;
            this.$store.dispatch('changeDates', {
                start: this.c_startDate,
                end: this.c_endDate
            }).then((response) => {
                this.fetchData();
            });
        }
    }
};
</script>

<style scoped>
.loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite;
    /* Safari */
    animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
