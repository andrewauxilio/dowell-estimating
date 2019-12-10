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
        <hr v-if="isLoggedIn && isEstimating" class="sidebar-divider my-0">
        <li v-if="isLoggedIn && isEstimating" class="nav-item active">
            <router-link class="nav-link" to="/">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </router-link>
        </li>

        <hr v-if="isLoggedIn && isEstimating" class="sidebar-divider">
        <div v-if="isLoggedIn && isEstimating" class="sidebar-heading">
            Analytics
        </div>

        <li v-if="isLoggedIn && isEstimating && isQLD" class="nav-item">
            <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapseQLD" aria-expanded="true" aria-controls="collapseQLD">
                <i class="fas fa-fw fa-map-marked"></i>
                <span>Queensland</span>
            </a>
            <div id="collapseQLD" class="collapse">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Sites:</h6>
                    <router-link v-if="isGBG" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'GBG', perm: isGBG } }">Geebung</router-link>
                </div>
            </div>
        </li>

        <li v-if="isLoggedIn && isEstimating && isNSW" class="nav-item">
            <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapseNSW" aria-expanded="true" aria-controls="collapseNSW">
                <i class="fas fa-fw fa-map-marked"></i>
                <span>New South Wales</span>
            </a>
            <div id="collapseNSW" class="collapse">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Sites:</h6>
                    <router-link v-if="isSMT" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'SMT', perm: isSMT } }">Smithfield</router-link>
                </div>
            </div>
        </li>

        <li v-if="isLoggedIn && isEstimating && isSA" class="nav-item">
            <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapseSA" aria-expanded="true" aria-controls="collapseSA">
                <i class="fas fa-fw fa-map-marked"></i>
                <span>South Australia</span>
            </a>
            <div id="collapseSA" class="collapse">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Sites:</h6>
                    <router-link v-if="isELI" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'ELI', perm: isELI } }">Elizabeth</router-link>
                </div>
            </div>
        </li>

        <hr class="sidebar-divider d-none d-md-block">
        <div v-if="isLoggedIn" class="sidebar-heading">
            Account Controls
        </div>

        <li v-if="isLoggedIn" class="nav-item">
            <router-link class="nav-link" to="/logout">
                <i class="fas fa-fw fa-power-off"></i>
                <span>Logout</span>
            </router-link>
        </li>

        <hr v-if="isLoggedIn" class="sidebar-divider d-none d-md-block">

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
                    <i class="fa fa-bars text-success"></i>
                </button>
                <ul class="navbar-nav ml-auto">
                    <li v-if="isLoggedIn" class="nav-item dropdown no-arrow">

                        <span class="mr-2 d-none d-lg-inline text-gray-600 small">Welcome, {{ userName }}!</span>

                    </li>
                </ul>
            </nav>
            <div class="container-fluid">
                <transition name="fade">
                    <!-- Router View -->
                    <router-view :key="$route.fullPath" />
                </transition>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import {
    mapGetters
} from 'vuex'

export default {
    name: 'home',
    data() {
        return {
            isCollapsed: false,
        }
    },

    props: {
        site: String
    },

    computed: {
        ...mapGetters({
            //Account Getters
            userName: 'getUserName',
            isLoggedIn: 'isLoggedIn',
            isEstimating: 'isEstimating',
            //State Getters
            isNAT: 'isNAT',
            isVIC: 'isVIC',
            isQLD: 'isQLD',
            isNSW: 'isNSW',
            isTAS: 'isTAS',
            isACT: 'isACT',
            isSA: 'isSA',
            isWA: 'isWA',
            isNT: 'isNT',
            //Site Getters
            isGBG: 'isGBG',
            isQBN: 'isQBN',
            isHOB: 'isHOB',
            isNOW: 'isNOW',
            isNEW: 'isNEW',
            isSMT: 'isSMT',
            isELI: 'isELI',
            isLON: 'isLON',
            isEDI: 'isEDI',
            isBAY: 'isBAY',
            isSHP: 'isSHP',
            isWOD: 'isWOD',
            isBEN: 'isBEN',
            isBAL: 'isBAL',
            isEPP: 'isEPP',
            isGEE: 'isGEE',
            isWAR: 'isWAR',
            isTRA: 'isTRA'
        }),
    },
    methods: {
        //Sidebar open/close (Sidebar)
        sideBarToggle() {
            this.isCollapsed = !this.isCollapsed
        },
        //Sidebar open/close (Topbar)
        sidebarToggleTop() {
            this.isCollapsed = !this.isCollapsed
        }
    }
}
</script>
