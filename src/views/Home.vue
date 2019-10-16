<template>
<div id="wrapper">
    <!--------------------------------------------------------------------
                             Main Navigation
    --------------------------------------------------------------------->
    <ul :class="{'toggled': isCollapsed}" class="navbar-nav bg-gradient-success sidebar sidebar-dark accordion" id="accordionSidebar">
        <router-link class="sidebar-brand d-flex align-items-center justify-content-center" to="/">
            <div class="sidebar-brand-icon">
                <i class="fas fa-chart-area"></i>
            </div>
            <div class="sidebar-brand-text mx-3">Dowell Estimating</div>
        </router-link>

        <!-- Divider -->
        <hr v-if="loggedIn && isEstimating" class="sidebar-divider my-0">
        <li v-if="loggedIn && isEstimating" class="nav-item active">
            <router-link class="nav-link" to="/">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </router-link>
        </li>
      
        <hr v-if="loggedIn && isEstimating" class="sidebar-divider">
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
                    <router-link class="collapse-item" to="/national-totals">Totals</router-link>
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
                    <h6 class="collapse-header">Sites:</h6>
                    <router-link class="collapse-item" to="/">Totals</router-link>
                    <router-link class="collapse-item" to="/">Bayswater</router-link>
                    <router-link class="collapse-item" to="/">Epping</router-link>
                    <router-link class="collapse-item" to="/">Shepparton</router-link>
                    <router-link class="collapse-item" to="/">Ballarat</router-link>
                    <router-link class="collapse-item" to="/">Bayswater</router-link>
                    <router-link class="collapse-item" to="/">Bendigo</router-link>
                    <router-link class="collapse-item" to="/">Geelong</router-link>
                    <router-link class="collapse-item" to="/">Wodonga</router-link>
                    <router-link class="collapse-item" to="/">Warnambool</router-link>
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
                    <h6 class="collapse-header">Sites:</h6>
                    <router-link v-if="isNAT" class="collapse-item" to="/">Totals</router-link>
                    <router-link v-if="isGBG" class="collapse-item" to="/gbg">Geebung</router-link>
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
                    <h6 class="collapse-header">Sites:</h6>
                    <router-link class="collapse-item" to="/">Totals</router-link>
                    <router-link class="collapse-item" to="/smt">Smithfield</router-link>
                    <router-link class="collapse-item" to="/">Nowra</router-link>
                    <router-link class="collapse-item" to="/">Newcastle</router-link>
                </div>
            </div>
        </li>

        <!-- <li v-if="loggedIn && isEstimating" class="nav-item">
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
        </li> -->
        
        <hr class="sidebar-divider d-none d-md-block">
        <div v-if="loggedIn" class="sidebar-heading">
            Account Controls
        </div>

        <li v-if="loggedIn" class="nav-item">
            <router-link class="nav-link" to="/logout">
                <i class="fas fa-fw fa-power-off"></i>
                <span>Logout</span>
            </router-link>
        </li>

        <hr v-if="loggedIn" class="sidebar-divider d-none d-md-block">

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
            <button @click="sideBarToggle()" class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
    </ul>


    <!--------------------------------------------------------------------
                               Main Content
    --------------------------------------------------------------------->
    <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
            <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <!-- Sidebar Toggle (Topbar) -->
                <button @click="sideBarToggle()" id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                    <i class="fa fa-bars"></i>
                </button>
            </nav>
            <div class="container-fluid">
                <transition name="fade">
                    <!-- Router View -->
                    <router-view  />
                </transition>
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
            isCollapsed: false,
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
        isBAY() {
            return this.$store.getters.isBAY
        },
        //QLD Getters (State and Sites)
        isQLD() {
            return this.$store.getters.isQLD
        },
        isGBG() {
            return this.$store.getters.isGBG
        },
        isNSW() {
            return this.$store.getters.isNSW
        },
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
