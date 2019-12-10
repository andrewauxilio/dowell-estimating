<template>
<div v-if="isLoggedIn && perm" class="container-fluid">
    <div class="row">
        <div class="col-lg-12 mb-4">
            <div class="card bg-success text-white shadow">
                <div class="card-body">
                    <div v-if="d_loading" class="spinner-white">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
                    <div v-if="!d_loading">
                        <h5 class="mt-1">{{ site }}</h5>
                        <span class="mt-1">Date Range: {{ startDate | toPrettyDate }} - {{ endDate | toPrettyDate }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Past 7 Units</h6>
                    <small>Last Updated: {{ c_lastUpdate }}</small>
                    <button type="submit" class="btn btn-danger float-right" @click="updateChart">Refresh</button>
                </div>
                <div v-if="c_loading" class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
                <div v-if="!c_loading" class="card-body">
                    <div class="card-body table-responsive p-0">
                        <dailyChart v-if="show" :site="site" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Totals and KPIs</h6>
                    <small>Last Updated: {{ lastUpdate }}</small>
                    <button type="submit" class="btn btn-danger float-right" @click="updateEstData">Refresh</button>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-xl-4 col-md-6 mb-4">
                            <div class="card border-left-success shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div v-if="loading" class="spinner">
                                            <div class="bounce1"></div>
                                            <div class="bounce2"></div>
                                            <div class="bounce3"></div>
                                        </div>
                                        <div v-if="!loading" class="col mr-2">
                                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Quotes</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ siteData[0].QUOTES_NO }} Quotes</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">Value: ${{ siteData[0].QUOTES_$ }}</div>
                                        </div>
                                        <div v-if="!loading" class="col-auto">
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
                                        <div v-if="loading" class="spinner">
                                            <div class="bounce1"></div>
                                            <div class="bounce2"></div>
                                            <div class="bounce3"></div>
                                        </div>
                                        <div v-if="!loading" class="col mr-2">
                                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Orders</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ siteData[0].ORDERS_IN_NO }} Orders</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">Value: ${{ siteData[0].ORDERS_IN_$ }}</div>
                                        </div>
                                        <div v-if="!loading" class="col-auto">
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
                                        <div v-if="loading" class="spinner">
                                            <div class="bounce1"></div>
                                            <div class="bounce2"></div>
                                            <div class="bounce3"></div>
                                        </div>
                                        <div v-if="!loading" class="col mr-2">
                                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Revisions</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ siteData[0].REVISION_NO }} Revisions</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">Value: ${{ siteData[0].REVISION_$ }}</div>
                                        </div>
                                        <div v-if="!loading" class="col-auto">
                                            <i class="fas fa-redo fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div v-if="e_loading" class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                        <div v-if="!e_loading" class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Estimator</th>
                                        <th scope="col" class="bg-success text-light">Sales</th>
                                        <th scope="col" class="bg-secondary text-light">No. of Quotes</th>
                                        <th scope="col" class="bg-secondary text-light">Quotes Value</th>
                                        <th scope="col" class="bg-secondary text-light">No. of Revisions</th>
                                        <th scope="col" class="bg-secondary text-light">Revisions Value</th>
                                        <th scope="col" class="bg-secondary text-light">No. of Orders</th>
                                        <th scope="col" class="bg-secondary text-light">Orders Value</th>
                                    </tr>
                                </thead>
                                <tbody v-for="estimatorKPI in estData" :key="estimatorKPI.id">
                                    <td>{{ estimatorKPI.ESTIMATOR }}</td>
                                    <td>{{ estimatorKPI.SALES_$ | toDollar }}</td>
                                    <td>{{ estimatorKPI.QUOTES_NO }}</td>
                                    <td>{{ estimatorKPI.QUOTES_$ | toDollar }}</td>
                                    <td>{{ estimatorKPI.REVISION_NO }}</td>
                                    <td>{{ estimatorKPI.REVISION_$ | toDollar }}</td>
                                    <td>{{ estimatorKPI.ORDERS_IN_NO }}</td>
                                    <td>{{ estimatorKPI.ORDERS_IN_$ | toDollar }}</td>
                                </tbody>
                            </table>
                        </div>
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
        site: String,
        perm: Boolean
    },

    data() {
        return {
            siteData: [],
            estData: [],
            loading: true, //estimator total loading
            c_loading: true, //chart loading
            d_loading: true, //date loading
            e_loading: true, //estimator loading
            visible: false,
            show: true,
            c_lastUpdate: "",
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
            endDate: "getEndDate",
        })
    },

    mounted() {
        this.permissionCheck();
        this.fetchData();
        this.fetchData_2();
    },

    methods: {
        permissionCheck() {
            if (!this.isLoggedIn || !this.perm) {
                this.$router.push("/404");
            }
        },

        async fetchData() {
            if (this.isLoggedIn && this.perm) {
                this.lastUpdate = moment().format('MMMM Do YYYY, h:mm:ss a');
                this.c_lastUpdate = moment().format('MMMM Do YYYY, h:mm:ss a');
                this.show = false;
                this.loading = true;
                this.c_loading = true;
                this.d_loading = true
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
                            this.c_loading = false;
                            this.d_loading = false;
                            nextTick(() => {
                                this.show = true
                            })
                            toast.fire({
                                type: "success",
                                title: "Site data loaded"
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } catch (e) {
                    console.log(e);
                }
            }
        },

        async fetchData_2() {
            if (this.isLoggedIn && this.perm) {
                this.e_loading = true;
                try {
                    await axios
                        .post("/estimating/kpis", {
                            end: this.endDate,
                            start: this.startDate,
                            site: this.site,
                            grouped: 1
                        })
                        .then(response => {
                            this.estData = response.data;
                            this.e_loading = false;
                            toast.fire({
                                type: "success",
                                title: "Estimator KPI loaded"
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } catch (e) {
                    console.log(e);
                }
            }

        },

        async updateEst() {
            this.e_loading = true;
            try {
                await axios
                    .post("/estimating/kpis", {
                        end: this.endDate,
                        start: this.startDate,
                        site: this.site,
                        grouped: 1
                    })
                    .then(response => {
                        this.estData = response.data;
                        this.e_loading = false;
                        toast.fire({
                            type: "success",
                            title: "Site data loaded"
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } catch (e) {
                console.log(e);
            }
        },

        async updateEstTotal() {
            this.lastUpdate = moment().format('MMMM Do YYYY, h:mm:ss a');
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
                        toast.fire({
                            type: "success",
                            title: "Estimator KPI updated"
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } catch (e) {
                console.log(e);
            }
        },

        updateEstData() {
            this.updateEst();
            this.updateEstTotal();
        },

        updateChart() {
            this.c_lastUpdate = moment().format('MMMM Do YYYY, h:mm:ss a');
            this.show = false;
            nextTick(() => {
                this.show = true
            })
            toast.fire({
                type: "success",
                title: "Chart updating"
            })

        },

        changeDate() {
            this.show = false
            this.loading = true;
            this.e_loading = true;
            this.$store.dispatch('changeDates', {
                start: this.c_startDate,
                end: this.c_endDate
            }).then((response) => {
                this.fetchData();
                this.fetchData_2();
            }).finally(() => {
                toast.fire({
                    type: "success",
                    title: "Dates changed (from: " + this.c_startDate + " to: " + this.c_endDate + ")"
                })
            });
        }
    }
};
</script>
