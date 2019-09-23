<template>
<!-- Page Wrapper -->
<div id="wrapper">
    <!-- Sidebar -->
    <ul :class="{'toggled': isCollapsed}" class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-chart-area"></i>
            </div>
            <div class="sidebar-brand-text mx-3">Dowell Estimating</div>
        </a>

        <!-- Divider -->
        <hr v-if="loggedIn && isEstimating" class="sidebar-divider my-0">

        <!-- Nav Item - Dashboard -->
        <li v-if="loggedIn && isEstimating" class="nav-item active">
            <a class="nav-link" href="index.html">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </a>
        </li>

        <!-- Divider -->
        <hr v-if="loggedIn && isEstimating" class="sidebar-divider">

        <!-- Heading -->
        <div v-if="loggedIn && isEstimating" class="sidebar-heading">
            Analytics
        </div>

        <li v-if="loggedIn && isEstimating && isNAT" class="nav-item">
            <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapseNAT" aria-expanded="true" aria-controls="collapseNAT">
                <i class="fas fa-fw fa-flag"></i>
                <span>National</span>
            </a>
            <div id="collapseNAT" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar" style="">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Categories:</h6>
                    <router-link class="collapse-item" to="/national-sales">Sales</router-link>
                    <router-link class="collapse-item" to="/national-reports">Reports</router-link>
                </div>
            </div>
        </li>

        <li v-if="loggedIn && isEstimating && isVIC" class="nav-item">
            <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapseVIC" aria-expanded="true" aria-controls="collapseVIC">
                <i class="fas fa-fw fa-map-marked"></i>
                <span>Victoria</span>
            </a>
            <div id="collapseVIC" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar" style="">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Categories:</h6>
                    <router-link class="collapse-item" to="/vic-sales">Sales</router-link>
                    <router-link class="collapse-item" to="/vic-reports">Reports</router-link>
                </div>
            </div>
        </li>

        <li v-if="loggedIn && isEstimating && isQLD" class="nav-item">
            <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapseQLD" aria-expanded="true" aria-controls="collapseQLD">
                <i class="fas fa-fw fa-map-marked"></i>
                <span>Queensland</span>
            </a>
            <div id="collapseQLD" class="collapse">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Categories:</h6>
                    <router-link class="collapse-item" to="/wa-sales">Sales</router-link>
                    <router-link class="collapse-item" to="/wa-reports">Reports</router-link>
                </div>
            </div>
        </li>

        <li v-if="loggedIn && isEstimating && isNSW" class="nav-item">
            <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapseNSW" aria-expanded="true" aria-controls="collapseNSW">
                <i class="fas fa-fw fa-map-marked"></i>
                <span>New South Wales</span>
            </a>
            <div id="collapseNSW" class="collapse">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Categories:</h6>
                    <router-link class="collapse-item" to="/wa-sales">Sales</router-link>
                    <router-link class="collapse-item" to="/wa-reports">Reports</router-link>
                </div>
            </div>
        </li>

        <li v-if="loggedIn && isEstimating" class="nav-item">
            <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapseWA" aria-expanded="true" aria-controls="collapseWA">
                <i class="fas fa-fw fa-map-marked"></i>
                <span>Western Australia</span>
            </a>
            <div id="collapseWA" class="collapse">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Categories:</h6>
                    <router-link class="collapse-item" to="/wa-sales">Sales</router-link>
                    <router-link class="collapse-item" to="/wa-reports">Reports</router-link>
                </div>
            </div>
        </li>
        
        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block">

        <!-- Heading -->
        <div class="sidebar-heading">
            Account Controls
        </div>

        <li v-if="!loggedIn" class="nav-item">
            <router-link class="nav-link" to="/login">
                <i class="fas fa-fw fa-power-off"></i>
                <span>Login</span>
            </router-link>
        </li>

        <li v-if="loggedIn" class="nav-item">
            <router-link class="nav-link" to="/logout">
                <i class="fas fa-fw fa-power-off"></i>
                <span>Logout</span>
            </router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block">

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
            <button @click="sideBarToggle()" class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
            <!-- Topbar -->
            <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <!-- Sidebar Toggle (Topbar) -->
                <button @click="sideBarToggle()" id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                    <i class="fa fa-bars"></i>
                </button>

                <!-- Topbar Navbar -->
                <ul class="navbar-nav ml-auto">
                    <!-- Nav Item - User Information -->
                    <li class="nav-item dropdown no-arrow">
                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="mr-2 d-none d-lg-inline text-gray-600 small">Welcome</span>
                            <img class="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60">
                        </a>
                        <!-- Dropdown - User Information -->
                        <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
            <!-- End of Topbar -->

            <!-- Begin Page Content -->
            <div class="container-fluid">
                <router-view  />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/auth";

export default {
    name: 'home',
    data() {
        return {
            isCollapsed: true,
            name: '',
            sites: this.$store.state.sites,
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        },
        isEstimating() {
            return this.$store.getters.isEstimating
        },
        isNAT() {
            return this.$store.getters.isNAT
        },
        isVIC() {
            return this.$store.getters.isVIC
        },
        isQLD() {
            return this.$store.getters.isQLD
        },
        isNSW() {
            return this.$store.getters.isNSW
        },
    },
    created() {
        //this.getUserName();
    },
    methods: {
        sideBarToggle() {
            this.isCollapsed = !this.isCollapsed
        },
        sidebarToggleTop() {
            this.isCollapsed = !this.isCollapsed
        }
    }
}
</script>
