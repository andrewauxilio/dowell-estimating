<template>
<div v-if="isLoggedIn" class="container">
    <!-- Page Heading -->
    <div class="row justify-content-center animated fadeIn">
        <h1 class="landing-text">Estimating Dashboard</h1>
    </div>
    <div class="row text-center mt-4">
        <div class="col-lg-6 mb-4 animated fadeInUp">
            <div class="animated infinite pulse slow">
                <div class="text-center">
                    <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 20rem; height: 15rem;" src="../assets/images/data_vis.svg" alt="">
                </div>
                <h4 class="landing-text">Data Visualization</h4>
            </div>
        </div>

        <div class="col-lg-6 mb-4 animated fadeInUp">
            <div class="animated infinite pulse slow">
                <div class="text-center">
                    <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 20rem; height: 15rem;" src="../assets/images/real_time.svg" alt="">
                </div>
                <h4 class="landing-text">Real-Time Data</h4>
            </div>
        </div>

        <div class="col-lg-6 mb-4 animated fadeInUp delay-1s">
            <div class="animated infinite pulse slow">
                <div class="text-center">
                    <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 20rem; height: 15rem;" src="../assets/images/data_report.svg" alt="">
                </div>
                <h4 class="landing-text">Data Reports</h4>
            </div>
        </div>
        <div class="col-lg-6 mb-4 animated fadeInUp delay-1s">
            <div class="animated infinite pulse slow">
                <div class="text-center ">
                    <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 20rem; height: 15rem;" src="../assets/images/date_selec.svg" alt="">
                </div>
                <h4 class="landing-text">Flexible Date Selection</h4>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";

export default {
    computed: {
        ...mapGetters({
            isLoggedIn: "isLoggedIn",
        })
    },

    mounted() {
        this.permissionCheck();
    },

    methods: {
        permissionCheck() {
            if (!this.isLoggedIn) {
                this.$router.push("/");
            }
        }
    }
}
</script>

<style scoped>
.landing-text {
    color: #505254;
}

@import "../../node_modules/leaflet/dist/leaflet.css";

.leaflet-fake-icon-image-2x {
    background-image: url(../../node_modules/leaflet/dist/images/marker-icon-2x.png);
}

.leaflet-fake-icon-shadow {
    background-image: url(../../node_modules/leaflet/dist/images/marker-shadow.png);
}

body {
    margin: 0px;
    font-family: Helvetica, Verdana, sans-serif;
}

#side {
    float: left;
    width: 208px;
}

#full_div {
    position: auto;
    overflow-x: hidden;
    top: 0;
    right: 0;
    left: 208px;
    bottom: 0;
    padding-left: 8px;
    border-left: 1px solid #ccc;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

li {
    font: 200 15px/1.5 Helvetica, Verdana, sans-serif;
    border-bottom: 1px solid #ccc;
}

li:last-child {
    border: none;
}

li a {
    font-size: 15px;
    padding-left: 8px;
    text-decoration: none;
    color: #000;
    display: block;
    -webkit-transition: font-size 0.3s ease, background-color 0.3s ease;
    -moz-transition: font-size 0.3s ease, background-color 0.3s ease;
    -o-transition: font-size 0.3s ease, background-color 0.3s ease;
    -ms-transition: font-size 0.3s ease, background-color 0.3s ease;
    transition: font-size 0.3s ease, background-color 0.3s ease;
}

li a:hover {
    font-size: 20px;
    background: #f6f6f6;
}
</style>
