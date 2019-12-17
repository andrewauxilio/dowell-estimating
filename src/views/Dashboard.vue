<template>
<div v-if="isLoggedIn && perm" class="container-fluid">

    <!-- <div class="row animated fadeIn">
        <div class="col-lg-12 mb-4">
            <div class="card bg-success text-white shadow">
                <div class="card-body">
                    <spinnerw v-if="d_loading" />
                    <div v-if="!d_loading">
                        <h5 class="mt-1">{{ site | toLongName }} Dashboard</h5>
                        <span class="mt-1">Date Range: {{ startDate | toPrettyDate }} - {{ endDate | toPrettyDate }}</span>
                        <button type="submit" class="btn btn-danger float-right" @click="updateAll">Reload All</button>
                    </div>
                </div>
            </div>
        </div>
    </div> -->

    <!-- <div class="row animated fadeIn delay-1s">
        <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Totals</h6>
                    <small>Last Updated: {{ lastUpdate }}</small>
                    <button type="submit" class="btn btn-success float-right" @click="updateEstTotal">Reload</button>
                </div>
                <div class="card-body"> -->
    <div class="row">
        <div class="col-xl-4 col-md-12 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <spinner v-if="total_loading" />
                        <div v-if="!total_loading" class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Information</div>
                            <div class="mb-0 font-weight-bold text-gray-800">{{ site | toLongName }} Dashboard</div>
                            <div class="mb-0 font-weight-bold text-gray-800"><small>Date Range: {{ startDate | toPrettyDate }} - {{ endDate | toPrettyDate }}</small></div>
                            <div class="mb-0 font-weight-bold text-gray-800"><small>Last Updated: {{ total_update }}</small></div>
                        </div>
                        <div v-if="!total_loading" class="col-auto">
                            <i class="fas fa-info-circle fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-2 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <spinner v-if="total_loading" />
                        <div v-if="!total_loading" class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Quotes</div>
                            <div class="mb-0 font-weight-bold text-gray-800">{{ totalData[0].QUOTES_NO }} Quotes</div>
                            <div class="mb-0 font-weight-bold text-gray-800">Value: ${{ totalData[0].QUOTES_$ }}</div>
                        </div>
                        <div v-if="!total_loading" class="col-auto">
                            <i class="fas fa-book fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-2 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <spinner v-if="total_loading" />
                        <div v-if="!total_loading" class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Orders</div>
                            <div class="mb-0 font-weight-bold text-gray-800">{{ totalData[0].ORDERS_IN_NO }} Orders</div>
                            <div class="mb-0 font-weight-bold text-gray-800">Value: ${{ totalData[0].ORDERS_IN_$ }}</div>
                        </div>
                        <div v-if="!total_loading" class="col-auto">
                            <i class="fas fa-truck fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-2 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <spinner v-if="total_loading" />
                        <div v-if="!total_loading" class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Revisions</div>
                            <div class="mb-0 font-weight-bold text-gray-800">{{ totalData[0].REVISION_NO }} Revisions</div>
                            <div class="mb-0 font-weight-bold text-gray-800">Value: ${{ totalData[0].REVISION_$ }}</div>
                        </div>
                        <div v-if="!total_loading" class="col-auto">
                            <i class="fas fa-redo fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-2 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <spinner v-if="total_loading" />
                        <div v-if="!total_loading" class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Lead Time</div>
                            <div class="mb-0 font-weight-bold text-gray-800">Avg: {{ totalData[0].QLAVG }} days</div>
                            <div class="mb-0 font-weight-bold text-gray-800">Max: {{ totalData[0].QLMAX }} days</div>
                        </div>
                        <div v-if="!total_loading" class="col-auto">
                            <i class="fas fa-hourglass fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- </div>
            </div>
        </div>
    </div> -->

    <div class="row">
        <div class="col-xl-6 col-lg-6">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Monthly</h6>
                    <button @click="updateMonthlyChart" class="btn btn-success btn-circle btn-sm">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
                <spinner v-if="monthly_loading" />
                <div v-if="!monthly_loading" class="card-body">
                    <div class="card-body table-responsive p-0 text-center">
                        <Monthly v-if="show_monthly" :site="site" />
                        <!-- <small>Last Updated: {{ c_lastUpdate }}</small> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-6 col-lg-6">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Past 7 Units</h6>
                    <button @click="updateUnitChart" class="btn btn-success btn-circle btn-sm">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
                <spinner v-if="unit_loading" />
                <div v-if="!unit_loading" class="card-body">
                    <div class="card-body table-responsive p-0 text-center">
                        <SevenUnits v-if="show_unit" :site="site" />
                        <!-- <small>Last Updated: {{ c_lastUpdate }}</small> -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xl-3 col-lg-3">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Quote Lead Times</h6>
                    <button @click="updateQLChart" class="btn btn-success btn-circle btn-sm">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
                <spinner v-if="ql_loading" />
                <div v-if="!ql_loading" class="card-body">
                    <div class="card-body table-responsive p-0 text-center">
                        <LeadTimes v-if="show_ql" :site="site" />
                        <!-- <small>Last Updated: {{ c_lastUpdate }}</small> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-9 col-lg-9">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">KPIs</h6>
                    <!-- <small>Last Updated: {{ e_lastUpdate }}</small> -->
                    <button @click="updateKpi" class="btn btn-success btn-circle btn-sm">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
                <div class="card-body">
                    <div class="row">
                        <spinner v-if="kpi_loading" />
                        <estTable v-if="!kpi_loading" :kpiData="kpiData" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Action Button -->
    <actionBtn v-if="!total_loading" @change="changeDate" />

    <!-- Report modal -->
    <reportModal :site="site" :startDate="startDate" :endDate="endDate" />

    <!-- Change Date Modal -->
    <changeDateModal @change="changeDate" />

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
import SevenUnits from '../components/charts/7units';
import loading from 'vue-loading-overlay';
import spinner from '../components/plugins/Spinner';
import spinnerw from '../components/plugins/SpinnerWhite';
import actionBtn from '../components/buttons/ActionButton';
import reportModal from '../components/modals/ReportModal';
import changeDateModal from '../components/modals/ChangeDateModal';
import estTable from '../components/tables/EstimatorKPITable';
import LeadTimes from '../components/charts/LeadTimes';
import Monthly from '../components/charts/Monthly';

export default {
    name: "dashboard",
    components: {
        SevenUnits,
        loading,
        spinner,
        spinnerw,
        actionBtn,
        reportModal,
        changeDateModal,
        estTable,
        LeadTimes,
        Monthly
    },

    props: {
        site: String,
        perm: Boolean
    },

    data() {
        return {
            totalData: [], //total data
            kpiData: [], //estimator KPI data

            unit_loading: true, //7 unit chart status
            total_loading: true, //total site data status
            kpi_loading: true, //kpi data status
            monthly_loading: true, //monthly data status
            ql_loading: true, //quote lead times status

            show_unit: true, //7 unit chart reload
            show_ql: true, //quote lead times chart reload
            show_monthly: true,

            unit_update: "", //7 unit chart last updated
            total_update: "", //total last updated
            kpi_update: "", //kpi last updated
            monthly_update: "", //monthly chart last updated
            ql_update: "", //quote lead times chart last upadted 
            page_update: "" //full page last updated
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
        this.fetchDataTotal();
        this.fetchDataKpi();
        this.autoUpdate();

    },

    methods: {
        permissionCheck() {
            if (!this.isLoggedIn || !this.perm) {
                this.$router.push("/404");
            }
        },

        autoUpdate() {
            setInterval(() => {
                console.log('10 minute update!')
                this.updateAll()
            }, 600000)
        },

        updateAll() {
            this.updateTotal();
            this.updateKpi();
            this.updateChart();
        },

        async fetchDataTotal() {
            if (this.isLoggedIn && this.perm) {
                this.show = false;
                this.total_loading = true;
                this.unit_loading = true;
                this.monthly_loading = true;
                this.ql_loading = true;
                try {
                    await axios
                        .post("/estimating/kpis", {
                            end: this.endDate,
                            start: this.startDate,
                            site: this.site,
                            grouped: 0
                        })
                        .then(response => {
                            this.totalData = response.data;
                            this.total_loading = false;
                            this.unit_loading = false;
                            this.monthly_loading = false;
                            this.ql_loading = false;
                            nextTick(() => {
                                this.show_unit = true;
                                this.show_monthly = true;
                                this.show_ql = true;
                            })
                            toast.fire({
                                type: "success",
                                title: "Site data loaded"
                            });
                            this.total_update = moment().format('MMMM Do YYYY, h:mm:ss a');
                            this.unit_update = moment().format('MMMM Do YYYY, h:mm:ss a');
                            this.kpi_update = moment().format('MMMM Do YYYY, h:mm:ss a');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } catch (e) {
                    console.log(e);
                }
            }
        },

        async fetchDataKpi() {
            if (this.isLoggedIn && this.perm) {
                this.kpi_loading = true;
                try {
                    await axios
                        .post("/estimating/kpis", {
                            end: this.endDate,
                            start: this.startDate,
                            site: this.site,
                            grouped: 1
                        })
                        .then(response => {
                            this.kpiData = response.data;
                            this.kpi_loading = false;
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

        async updateKpi() {
            this.kpi_update = "";
            this.kpi_loading = true;
            try {
                await axios
                    .post("/estimating/kpis", {
                        end: this.endDate,
                        start: this.startDate,
                        site: this.site,
                        grouped: 1
                    })
                    .then(response => {
                        this.kpiData = response.data;
                        this.kpi_loading = false;
                        toast.fire({
                            type: "success",
                            title: "Site data loaded"
                        })
                        this.kpi_update = moment().format('MMMM Do YYYY, h:mm:ss a');
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } catch (e) {
                console.log(e);
            }
        },

        async updateTotal() {
            this.total_update = "";
            this.total_loading = true;
            try {
                await axios
                    .post("/estimating/kpis", {
                        end: this.endDate,
                        start: this.startDate,
                        site: this.site,
                        grouped: 0
                    })
                    .then(response => {
                        this.totalData = response.data;
                        this.total_loading = false;
                        toast.fire({
                            type: "success",
                            title: "Estimator KPI updated"
                        })
                        this.total_update = moment().format('MMMM Do YYYY, h:mm:ss a');
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } catch (e) {
                console.log(e);
            }
        },

        updateQLChart() {
            this.ql_update = "";
            this.show_ql = false;
            nextTick(() => {
                this.show_ql= true
                this.ql_update = moment().format('MMMM Do YYYY, h:mm:ss a');
            })
        },

        updateMonthlyChart() {
            this.monthly_update = "";
            this.show_monthly = false;
            nextTick(() => {
                this.show_monthly = true
                this.monthly_update = moment().format('MMMM Do YYYY, h:mm:ss a');
            })
        },

        updateUnitChart() {
            this.unit_update = "";
            this.show_unit = false;
            nextTick(() => {
                this.show_unit = true
                this.unit_update = moment().format('MMMM Do YYYY, h:mm:ss a');
            })
        },

        changeDate() {
            this.show_unit = false
            this.show_ql = false
            this.total_loading = true;
            this.kpi_loading = true;
            this.fetchDataTotal();
            this.fetchDataKpi();
        },
    }

};
</script>
