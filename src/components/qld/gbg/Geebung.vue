<template>
<div v-if="loggedIn && isGBG" class="container-fluid">

    <div class="row">

        <!-- Sales Value (Monthly) -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div v-if="!isLoaded" class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                        <div v-if="isLoaded" class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Sales Value (Monthly)</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ getGBGKPITotal[0].SVALUE | toDollar }}</div>
                        </div>
                        <div v-if="isLoaded" class="col-auto">
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
                        <div v-if="!isLoaded" class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                        <div v-if="isLoaded" class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Quotes Value (Monthly)</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ getGBGKPITotal[0].QVALUE | toDollar }}</div>
                        </div>
                        <div v-if="isLoaded" class="col-auto">
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
                        <div v-if="!isLoaded" class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                        <div v-if="isLoaded" class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Revisions Value (Monthly)</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ getGBGKPITotal[0].RVALUE | toDollar }}</div>
                        </div>
                        <div v-if="isLoaded" class="col-auto">
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
                        <div v-if="!isLoaded" class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                        <div v-if="isLoaded" class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Quotes Value (Monthly)</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ getGBGKPITotal[0].DLVALUE | toDollar }}</div>
                        </div>
                        <div v-if="isLoaded" class="col-auto">
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
                    <h6 class="m-0 font-weight-bold text-success">Value ($)</h6>
                </div>
                <div class="card-body">
                    <div class="card-body table-responsive p-0">
                        <div v-if="!isLoaded" class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                        <totalValueBar v-if="isLoaded" />
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-6 col-lg-6">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Quantity</h6>
                </div>
                <div class="card-body">
                    <div class="card-body table-responsive p-0">
                        <div v-if="!isLoaded" class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                        <totalQuantityBar v-if="isLoaded" />
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Estimating KPIs (Last 30 Days)</h6>
                </div>
                <div class="card-body">
                    <div v-if="!isLoaded" class="spinner">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
                    <div v-if="isLoaded" class="table-responsive">
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
                            <tbody v-for="estimatorKPI in getGBGKPI" :key="estimatorKPI.id">
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
    <button button type="button" class="btn btn-danger btn-lg" id="fixedbutton" data-toggle="modal" data-target=".report-modal">
        <i class="fas fa-file-download" style="margin-right: 10px;"></i>Download Reports
    </button>

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
//axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export default {
    name: 'geebung',
    components: {
        totalValueBar,
        totalQuantityBar
    },
    data() {
        return {

        }
    },
    computed: {
        isLoaded() {
            return this.$store.getters.gbgLoaded
        },
        loggedIn() {
            return this.$store.getters.loggedIn
        },
        isGBG() {
            return this.$store.getters.isGBG
        },
        getGBGKPI() {
            return this.$store.getters.getGBGKPI
        },
        getGBGKPITotal() {
            return this.$store.getters.getGBGKPITotal
        },
    },
    mounted() {
        this.permissionCheck();
        this.getData();
    },
    methods: {
        permissionCheck() {
            if (!this.isGBG || !this.loggedIn) {
                this.$router.push('/404')
            }
        },
        getData() {
            if (this.loggedIn && this.isGBG) {
                this.$store.dispatch('getGBGKPI')
                this.$store.dispatch('getGBGKPITotal')
            }
        }
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
</style>
