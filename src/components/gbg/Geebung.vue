<template>
<div v-if="loggedIn && isGBG" class="container-fluid">
    <div class="row">
        <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Estimating KPIs</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Estimator</th>
                                    <th scope="col" class="bg-success text-light">Sales</th>
                                    <th scope="col" class="bg-secondary text-light">Quotes In</th>
                                    <th scope="col" class="bg-secondary text-light">Revisions</th>
                                    <th scope="col" class="bg-primary text-light">Orders In</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">John Doe</th>
                                    <td>$25000</td>
                                    <td>
                                        <th scope="col">$</th>
                                        <th scope="col">#</th>
                                        <tr><td>$30000</td><td>5</td></tr>
                                    </td>
                                    <td>
                                        <th scope="col">$</th>
                                        <th scope="col">#</th>
                                        <tr><td>$25000</td><td>2</td></tr>
                                    </td>
                                    <td>
                                        <th scope="col">$</th>
                                        <th scope="col">#</th>
                                        <tr><td>$25000</td><td>5</td></tr>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Jane Doe</th>
                                    <td>$15000</td>
                                    <td>
                                        <th scope="col">$</th>
                                        <th scope="col">#</th>
                                        <tr><td>$20000</td><td>2</td></tr>
                                    </td>
                                    <td>
                                        <th scope="col">$</th>
                                        <th scope="col">#</th>
                                        <tr><td>$15000</td><td>3</td></tr>
                                    </td>
                                    <td>
                                        <th scope="col">$</th>
                                        <th scope="col">#</th>
                                        <tr><td>$15000</td><td>1</td></tr>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Bruce Wayne</th>
                                    <td>$45000</td>
                                    <td>
                                        <th scope="col">$</th>
                                        <th scope="col">#</th>
                                        <tr><td>$50000</td><td>5</td></tr>
                                    </td>
                                    <td>
                                        <th scope="col">$</th>
                                        <th scope="col">#</th>
                                        <tr><td>$45000</td><td>5</td></tr>
                                    </td>
                                    <td>
                                        <th scope="col">$</th>
                                        <th scope="col">#</th>
                                        <tr><td>$45000</td><td>4</td></tr>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export default {
    name: 'national-totals',
    components: {},
    data() {
        return {
            loading: true
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        },
        isGBG() {
            return this.$store.getters.isGBG
        },
    },
    mounted() {
        this.permissionCheck();
    },
    methods: {
        permissionCheck() {
            if(!this.isGBG || !loggedIn) {
                this.$router.push('/404')
            }
        }
    }
}
</script>

