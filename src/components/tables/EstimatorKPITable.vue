<template>
<div class="table-responsive">
    <table class="table table-bordered">
        <thead>
            <tr>
                <th scope="col">Estimator</th>
                <th scope="col" class="bg-success text-light">Sales</th>
                <th scope="col" class="bg-secondary text-light">No. of Quotes</th>
                <th scope="col" class="bg-secondary text-light">Quotes Value</th>
                <th scope="col" class="bg-secondary text-light">No. of Revisions</th>
                <th scope="col" class="bg-secondary text-light">Revisions Value</th>
                <th scope="col" class="bg-secondary text-light">No. of Orders</th>
                <th scope="col" class="bg-secondary text-light">Orders Value</th>
            </tr>
        </thead>
        <tbody v-for="estimatorKPI in kpiData" :key="estimatorKPI.id">
            <td>{{ estimatorKPI.ESTIMATOR }}</td>
            <td>{{ estimatorKPI.SALES_$ | toDollar }}</td>
            <td>{{ estimatorKPI.QUOTES_NO }}</td>
            <td>{{ estimatorKPI.QUOTES_$ | toDollar }}</td>
            <td>{{ estimatorKPI.REVISION_NO }}</td>
            <td>{{ estimatorKPI.REVISION_$ | toDollar }}</td>
            <td>{{ estimatorKPI.ORDERS_IN_NO }}</td>
            <td>{{ estimatorKPI.ORDERS_IN_$ | toDollar }}</td>
        </tbody>
    </table>
</div>
</template>

<script>
export default {
    props: {
        kpiData: Array,
    },
}
</script>
