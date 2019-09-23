<script>
import {
    Line
} from "vue-chartjs";

import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/estimating'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.access_token

export default {
    extends: Line,
    mounted() {
        let location = new Array();
        let quantity = new Array();
        axios.get("/nat/new-quote-requests/all").then(response => {
            let data = response.data;
            if (data) {
                data.forEach(element => {
                    location.push(element.location);
                    quantity.push(element.Quantity);
                });
                this.renderChart({
                    labels: location,
                    datasets: [{
                        label: "No. of Quote Requests",
                        backgroundColor: "rgba(54, 162, 235, 0.7)",
                        data: quantity
                    }]
                }, {
                    responsive: true,
                    maintainAspectRatio: false
                });
            } else {
                console.log("No data");
            }
        });
    }
};
</script>
