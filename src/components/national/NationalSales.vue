<template>
<div class="card">
    <Chart v-if="isGBG" />
    <!-- <div class="card">{{ apps }}</div>
    <div class="card">{{ roles }}</div>
    <div class="card">{{ states }}</div> -->
    <div class="card">{{ sites }}</div>
</div>
</template>

<script>
import Chart from './RandomChart'

export default {
    components: {
        Chart
    },
    data() {
       return {
           sites: this.$store.state.sites,
       }
    },
    computed: {
        isGBG() {
            return this.$store.getters.isGBG
        }
    },
}
</script>
