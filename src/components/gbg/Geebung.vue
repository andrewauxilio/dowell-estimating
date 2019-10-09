<template>
<div class="container-fluid">
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
    mounted() {

    },
    methods: {

    }
}
</script>

<style scoped>

.t_center {
    text-align: center;
    align-content: center;  
}

.spinner {
    margin: 50px auto 0;
    margin-bottom: 50px;
    width: 70px;
    text-align: center;
}

.spinner>div {
    width: 18px;
    height: 18px;
    background-color: #17A471;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
}

.spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {

    0%,
    80%,
    100% {
        -webkit-transform: scale(0)
    }

    40% {
        -webkit-transform: scale(1.0)
    }
}

@keyframes sk-bouncedelay {

    0%,
    80%,
    100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    40% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
    }
}
</style>
