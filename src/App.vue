<template>
<div id="wrapper">
    <!--------------------------------------------------------------------
                             Main Navigation
    --------------------------------------------------------------------->
    <ul :class="{'toggled': isCollapsed}" class="navbar-nav bg-gradient-success sidebar sidebar-dark accordion" id="accordionSidebar">
        <router-link class="sidebar-brand d-flex align-items-center justify-content-center" to="/landing">
            <div class="sidebar-brand-icon">
                <i class="fas fa-chart-area"></i>
            </div>
            <div class="sidebar-brand-text mx-3">Dowell Estimating</div>
        </router-link>
        <!-- Divider -->
        <hr v-if="isLoggedIn && isEstimating" class="sidebar-divider my-0">
        <li v-if="isLoggedIn && isEstimating" class="nav-item active">
            <router-link class="nav-link" to="/landing">
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
                    <router-link v-if="isCRN" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'CRN', perm: isCRN } }">Cairns</router-link>
                    <router-link v-if="isKNP" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'KNP', perm: isKNP } }">Kundra Park</router-link>
                    <router-link v-if="isTVL" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'TVL', perm: isTVL } }">Townsville</router-link>
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
                    <router-link v-if="isNEW" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'NEW', perm: isNEW } }">Newcastle</router-link>
                    <router-link v-if="isNOW" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'NOW', perm: isNOW } }">Nowra</router-link>
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
                    <router-link v-if="isLON" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'LON', perm: isLON } }">Londsdale</router-link>
                </div>
            </div>
        </li>

        <li v-if="isLoggedIn && isEstimating && isTAS" class="nav-item">
            <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapseTAS" aria-expanded="true" aria-controls="collapseTAS">
                <i class="fas fa-fw fa-map-marked"></i>
                <span>Tasmania</span>
            </a>
            <div id="collapseTAS" class="collapse">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Sites:</h6>
                    <router-link v-if="isLAU" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'LAU', perm: isLAU } }">Launceston</router-link>
                    <router-link v-if="isMOO" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'MOO', perm: isMOO } }">Moonah</router-link>
                </div>
            </div>
        </li>

        <li v-if="isLoggedIn && isEstimating && isVIC" class="nav-item">
            <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapseVIC" aria-expanded="true" aria-controls="collapseVIC">
                <i class="fas fa-fw fa-map-marked"></i>
                <span>Victoria</span>
            </a>
            <div id="collapseVIC" class="collapse">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Sites:</h6>
                    <router-link v-if="isBAL" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'BAL', perm: isBAL } }">Ballarat</router-link>
                    <router-link v-if="isBAY" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'BAY', perm: isBAY } }">Bayswater</router-link>
                    <router-link v-if="isBEN" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'BEN', perm: isBEN } }">Bendigo</router-link>
                    <router-link v-if="isCRG" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'CRG', perm: isCRG } }">Craigieburn</router-link>
                    <router-link v-if="isGEL" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'GEL', perm: isGEL } }">Geelong</router-link>
                    <router-link v-if="isMLD" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'MLD', perm: isMLD } }">Mildura</router-link>
                    <router-link v-if="isQBN" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'QBN', perm: isQBN } }">Queanbeyan</router-link>
                    <router-link v-if="isSHP" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'SHP', perm: isSHP } }">Shepparton</router-link>
                    <router-link v-if="isTRA" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'TRA', perm: isTRA } }">Traralgon</router-link>
                    <router-link v-if="isWBL" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'WBL', perm: isWBL } }">Warrnambol</router-link>
                    <router-link v-if="isWOD" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'WOD', perm: isWOD } }">Wodonga</router-link>
                </div>
            </div>
        </li>

        <li v-if="isLoggedIn && isEstimating && isWA" class="nav-item">
            <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapseWA" aria-expanded="true" aria-controls="collapseWA">
                <i class="fas fa-fw fa-map-marked"></i>
                <span>Western Australia</span>
            </a>
            <div id="collapseWA" class="collapse">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Sites:</h6>
                    <router-link v-if="isPER" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'PER', perm: isPER } }">Perth</router-link>
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
                <p class="float-left">version: 0.17-B</p>
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
            isCRN: 'isCRN',
            isKNP: 'isKNP',
            isTVL: 'isTVL',

            isNOW: 'isNOW',
            isNEW: 'isNEW',
            isSMT: 'isSMT',

            isELI: 'isELI',
            isLON: 'isLON',

            isLAU: 'isLAU',
            isMOO: 'isMOO',

            isQBN: 'isQBN',
            isBAY: 'isBAY',
            isSHP: 'isSHP',
            isWOD: 'isWOD',
            isBEN: 'isBEN',
            isBAL: 'isBAL',
            isCRG: 'isCRG',
            isGEL: 'isGEL',
            isWBL: 'isWBL',
            isTRA: 'isTRA',
            isMLD: 'isMLD',

            isPER: 'isPER'
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
