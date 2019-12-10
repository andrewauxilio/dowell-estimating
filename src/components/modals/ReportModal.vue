<template>
<div class="modal fade report-modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-dark font-weight-bold">Download Reports</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Report Name</th>
                            <th>Link</th>
                            <th>Download Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>KPI Report</th>
                            <td>
                                <a :href="report_url + 'POO=' + site + '&DateStart=' + startDate + '&DateEnd=' + endDate" target="_blank">View Report</a>
                            </td>
                            <td>
                                <a style="color:red; margin:2px;" :href="report_pdf + 'POO=' + site + '&DateStart=' + startDate + '&DateEnd=' + endDate" target="_blank">
                                    <i class="fas fa-file-pdf fa-3x"></i>
                                </a>
                                <a style="color:green; margin:2px;" :href=" report_excel + 'POO=' + site + '&DateStart=' + startDate + '&DateEnd=' + endDate" target="_blank">
                                    <i class="fas fa-file-excel fa-3x"></i>
                                </a>
                                <a style="color:blue; margin:2px;" :href="report_csv + 'POO=' + site + '&DateStart=' + startDate + '&DateEnd=' + endDate" target="_blank">
                                    <i class="fas fa-file-csv fa-3x"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <p class="mr-auto">
                    IMPORTANT: Please make sure you are logged in to Dowell's citrix desktop.
                    The reports are only accessible inside the Dowell's citrix desktop.
                </p>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            report_url: "http://dweqxsql04/reports/report/Quoting/KPIEstimator?",
            report_pdf: "http://dweqxsql04/Reportserver?%2fQuoting%2fKPIEstimator&rs:Command=Render&rs:Format=PDF&",
            report_excel: "http://dweqxsql04/Reportserver?%2fQuoting%2fKPIEstimator&rs:Command=Render&rs:Format=EXCEL&",
            report_csv: "http://dweqxsql04/Reportserver?%2fQuoting%2fKPIEstimator&rs:Command=Render&rs:Format=CSV&"
        }
    },
    props: {
        site: String,
        startDate: String,
        endDate: String,
    },
}
</script>
