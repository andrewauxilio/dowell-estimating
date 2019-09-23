<template>
<div class="container-fluid">
    <div class="col-md-3 col-sm-12 col-12 mt-3">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">All Quote Requests</h3>
            </div>
            <div class="card-body">
                
            </div>
            <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                    <tbody>
                        <tr>
                            <th class="site">Site</th>
                            <th class="number">Number of Requests</th>
                        </tr>
                        <tr v-for="newQuoteRequest in newQuoteRequests.data" :key="newQuoteRequest.id">
                            <td class="site">{{ newQuoteRequest.location }}</td>
                            <td class="number">{{ newQuoteRequest.Quantity }}</td>
                        </tr>
                        <!-- <tr v-for="newQuoteRequestsTotals in newQuoteRequestsTotal" :key="newQuoteRequestsTotals.id">
                            <th class="site">Total</th>
                            <td class="number">{{ newQuoteRequestsTotals.Quantity }}</td>
                        </tr> -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/estimating'

export default {
    data() {
        return {
            newQuoteRequests: {},
        }
    },
    mounted() {
        this.getQuoteRequests()
    },
    methods: {
        getQuoteRequests(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.access_token
            return new Promise((resolve, reject) => {
                axios.get('/nat/new-quote-requests/all')
                    .then(response => {
                        this.newQuoteRequests = response
                        console.log(response)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                        console.log(error)
                    })
            })
        },
    }
}
</script>
