<template>
<div class="card">
    <Chart />
    <div class="card">{{ apps }}</div>
    <div class="card">{{ roles }}</div>
</div>
</template>

<script>
import Chart from './RandomChart'

export default {
    components: {
        Chart
    },
    mounted() {

    },
    computed: {
        // apps() {
        //     return this.$store.state.apps
        // },
        roles() {
            return this.$store.state.roles
        }
    },
    data() {
       
    },
    methods: {

    }
}
</script>
