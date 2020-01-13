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

</style>
