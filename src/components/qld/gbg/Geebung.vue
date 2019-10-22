<template>
<div v-if="loggedIn && isGBG" class="container-fluid">

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
        <button class="buttons" tooltip="Download Reports" data-toggle="modal" data-target=".report-modal"><i class="fas fa-download"></i></button>
        <button class="buttons" tooltip="Actions" href="#"><i class="fas fa-cogs"></i></button>
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
                                <td><a href="http://uat.website.dowell.com.au/" target="_blank">http://uat.website.dowell.com.au/</a></td>
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
import totalValueBar from '../../chart-data/qld/gbg/totalValueBar';
import totalQuantityBar from '../../chart-data/qld/gbg/totalQuantityBar';
import axios from 'axios'
import {
    mapGetters
} from 'vuex'
import {
    nextTick
} from 'q';

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
            estimatorKPI: 'getGBGKPI',
            totalKPI: 'getGBGKPITotal',
            isGBG: 'isGBG',
            loggedIn: 'loggedIn',
            totalLoad: 'getTotalKPILoad',
            KPILoad: 'getKPILoad'
        }),
    },
    mounted() {
        this.permissionCheck();
        this.getDataMonth();
    },
    methods: {
        getDataWeek() {
            if (this.totalLoad == true && this.KPILoad == true) {
                this.$store.dispatch('toggle_gbg_total_KPI')
                this.$store.dispatch('toggle_gbg_est_KPI')
            }
            this.time = ''
            this.$store.dispatch('getGBGKPIWeek')
            this.$store.dispatch('getGBGKPITotalWeek')
                .then(() => {
                    if (this.totalLoad == false && this.KPILoad == false) {
                        this.$store.dispatch('toggle_gbg_total_KPI')
                        this.$store.dispatch('toggle_gbg_est_KPI')
                    }
                    this.time = 'Last 7 Days'
                    this.show = false
                    nextTick(() => {
                        this.show = true
                    })
                })
                .finally(() => {
                    toast.fire({
                        type: "info",
                        title: "Showing data for the past 7 days"
                    })
                })
        },

        getDataMonth() {
            if (this.totalLoad == true && this.KPILoad == true) {
                this.$store.dispatch('toggle_gbg_total_KPI')
                this.$store.dispatch('toggle_gbg_est_KPI')
            }
            this.time = ''
            this.$store.dispatch('getGBGKPIMonth')
            this.$store.dispatch('getGBGKPITotalMonth')
                .then(() => {
                    if (this.totalLoad == false && this.KPILoad == false) {
                        this.$store.dispatch('toggle_gbg_total_KPI')
                        this.$store.dispatch('toggle_gbg_est_KPI')
                    }
                    this.time = 'Last 30 Days'
                    this.show = false
                    nextTick(() => {
                        this.show = true
                    })
                })
                .finally(() => {
                    toast.fire({
                        type: "info",
                        title: "Showing data for the past 30 days"
                    })
                })
        },

        permissionCheck() {
            if (!this.isGBG || !this.loggedIn) {
                this.$router.push('/404')
            }
        },
    }
}
</script>

<style scoped>
@-webkit-keyframes bounce {
    0% {
        transform: scale(1, 1) translate(0px, 0px);
    }

    30% {
        transform: scale(1, 0.8) translate(0px, 5px);
    }

    75% {
        transform: scale(1, 1.1) translate(0px, -15px);
    }

    100% {
        transform: scale(1, 1) translate(0px, 0px);
    }
}

#fixedbutton {
    position: fixed;
    bottom: 10px;
    right: 10px;
    /* -webkit-animation: bounce 1s infinite; */
}

#fixedbutton2 {
    position: fixed;
    bottom: 70px;
    right: 10px;
    /* -webkit-animation: bounce 1s infinite; */
}

#fixedbutton3 {
    position: fixed;
    bottom: 130px;
    right: 10px;
    /* -webkit-animation: bounce 1s infinite; */
}

.fas {
    color: white;
    text-align: center;
}

.fab-container {
    bottom: 0;
    position: fixed;
    margin: 1em;
    right: 0px;
    align-content: center;
}

.buttons {
    box-shadow: 0px 5px 11px -2px rgba(0, 0, 0, 0.18),
        0px 4px 12px -7px rgba(0, 0, 0, 0.15);
    border: none;
    border-radius: 50%;
    display: block;
    width: 56px;
    height: 56px;
    margin: 20px auto 0;
    position: relative;
    -webkit-transition: all .1s ease-out;
    transition: all .1s ease-out;
    color: white;
    font-weight: 700;
}

.buttons:active,
.buttons:focus,
.buttons:hover {
    box-shadow: 0 0 4px rgba(0, 0, 0, .14),
        0 4px 8px rgba(0, 0, 0, .28);
}

.buttons:not(:last-child) {
    width: 40px;
    height: 40px;
    margin: 20px auto 0;
    opacity: 0;
    -webkit-transform: translateY(50px);
    -ms-transform: translateY(50px);
    transform: translateY(50px);
}

.fab-container:hover .buttons:not(:last-child) {
    opacity: 1;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
    margin: 15px auto 0;
}

/* Unessential styling for sliding up buttons at differnt speeds */

.buttons:nth-last-child(1) {
    -webkit-transition-delay: 25ms;
    transition-delay: 25ms;
    background-color: #e74a3b;
}

.buttons:not(:last-child):nth-last-child(2) {
    -webkit-transition-delay: 50ms;
    transition-delay: 20ms;
    background-color: #4e73df;
}

.buttons:not(:last-child):nth-last-child(3) {
    -webkit-transition-delay: 75ms;
    transition-delay: 40ms;
    background-color: #1cc88a;
}

.buttons:not(:last-child):nth-last-child(4) {
    -webkit-transition-delay: 100ms;
    transition-delay: 60ms;
    background-color: #1cc88a
}

/* Show tooltip content on hover */

[tooltip]:before {
    bottom: 25%;
    font-family: arial;
    font-weight: 600;
    border-radius: 2px;
    background: #585858;
    color: #fff;
    content: attr(tooltip);
    font-size: 12px;
    visibility: hidden;
    opacity: 0;
    padding: 5px 7px;
    margin-right: 12px;
    position: absolute;
    right: 100%;
    white-space: nowrap;
}

[tooltip]:hover:before,
[tooltip]:hover:after {
    visibility: visible;
    opacity: 1;
}

.fas {
    margin: auto;
}
</style>
