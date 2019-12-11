<template>
<div v-if="isLoggedIn && perm" class="container-fluid">

    <div class="row animated fadeIn">
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
    </div>

    <div class="row animated fadeIn delay-1s">
        <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Past 7 Units</h6>
                    <small>Last Updated: {{ c_lastUpdate }}</small>
                    <button type="submit" class="btn btn-success float-right" @click="updateChart">Reload</button>
                </div>
                <spinner v-if="c_loading" />
                <div v-if="!c_loading" class="card-body">
                    <div class="card-body table-responsive p-0">
                        <dailyChart v-if="show" :site="site" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row animated fadeIn delay-2s">
        <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Totals</h6>
                    <small>Last Updated: {{ lastUpdate }}</small>
                    <button type="submit" class="btn btn-success float-right" @click="updateEstTotal">Reload</button>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-xl-4 col-md-6 mb-4">
                            <div class="card border-left-success shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <spinner v-if="loading" />
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
                                        <spinner v-if="loading" />
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
                                        <spinner v-if="loading" />
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
                </div>
            </div>
        </div>
    </div>

    <div class="row animated fadeIn delay-3s">
        <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">KPIs</h6>
                    <small>Last Updated: {{ e_lastUpdate }}</small>
                    <button type="submit" class="btn btn-success float-right" @click="updateEst">Reload</button>
                </div>
                <div class="card-body">
                    <div class="row">
                        <spinner v-if="e_loading" />
                        <estTable v-if="!e_loading" :estData="estData" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Action Button -->
    <actionBtn v-if="!loading" />

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
import dailyChart from '../components/charts/7units';
import loading from 'vue-loading-overlay';
import spinner from '../components/plugins/Spinner';
import spinnerw from '../components/plugins/SpinnerWhite';
import actionBtn from '../components/buttons/ActionButton';
import reportModal from '../components/modals/ReportModal';
import changeDateModal from '../components/modals/ChangeDateModal';
import estTable from '../components/tables/EstimatorKPITable';

export default {
    name: "dashboard",
    components: {
        dailyChart,
        loading,
        spinner,
        spinnerw,
        actionBtn,
        reportModal,
        changeDateModal,
        estTable,
    },

    props: {
        site: String,
        perm: Boolean
    },

    data() {
        return {
            siteData: [], //total data
            estData: [], //estimator KPI data
            loading: true, //total loading
            c_loading: true, //chart loading
            d_loading: true, //date loading
            e_loading: true, //estimator loading
            show: true, //chart reload
            c_lastUpdate: "", //chart last updated
            e_lastUpdate: "", //est last updated
            lastUpdate: "", //total and est last updated
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
        this.fetchDataEst();
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
            this.updateEstTotal();
            this.updateEst();
            this.updateChart();
        },

        async fetchDataTotal() {
            if (this.isLoggedIn && this.perm) {
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
                            this.lastUpdate = moment().format('MMMM Do YYYY, h:mm:ss a');
                            this.c_lastUpdate = moment().format('MMMM Do YYYY, h:mm:ss a');
                            this.e_lastUpdate = moment().format('MMMM Do YYYY, h:mm:ss a');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } catch (e) {
                    console.log(e);
                }
            }
        },

        async fetchDataEst() {
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
            this.e_lastUpdate = "";
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
                        this.e_lastUpdate = moment().format('MMMM Do YYYY, h:mm:ss a');
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } catch (e) {
                console.log(e);
            }
        },

        async updateEstTotal() {
            this.lastUpdate = "";
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
                        this.lastUpdate = moment().format('MMMM Do YYYY, h:mm:ss a');
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } catch (e) {
                console.log(e);
            }
        },

        updateChart() {
            this.c_lastUpdate = "";
            this.show = false;
            nextTick(() => {
                this.show = true
                this.c_lastUpdate = moment().format('MMMM Do YYYY, h:mm:ss a');
            })
        },

        changeDate() {
            this.show = false
            this.loading = true;
            this.e_loading = true;
            this.fetchDataTotal();
            this.fetchDataEst();
        },
    }

};
</script>
