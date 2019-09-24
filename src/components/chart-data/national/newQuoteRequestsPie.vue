<script>
import { Pie } from "vue-chartjs";

import axios from 'axios'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.access_token

export default {
  extends: Pie,
  mounted() {
    let location = new Array();
    let quantity = new Array();
    axios.get("/estimating/nat/new-quote-requests/all").then(response => {
      let data = response.data;
      if (data) {
        data.forEach(element => {
          location.push(element.location);
          quantity.push(element.Quantity);
        });
        this.renderChart(
          {
            labels: location,
            datasets: [
              {
                label: "No. of Quote Requests",
                backgroundColor: [
                  "rgba(54, 162, 235, 0.5)",
                  "rgba(255, 206, 86, 0.5)",
                  "rgba(75, 192, 192, 0.5)",
                  "rgba(153, 102, 255, 0.5)",
                  "rgba(255, 159, 64, 0.5)",
                  "rgba(255, 99, 132, 0.5)"
                ],
                borderColor: [
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 99, 132, 1)"
                ],
                data: quantity
              }
            ]
          },
          { responsive: true, maintainAspectRatio: false }
        );
      } else {
        console.log("No data");
      }
    });
  }
};
</script>