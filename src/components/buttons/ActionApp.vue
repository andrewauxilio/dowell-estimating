<template>
<div class="fab-container-app">
    <button class="buttons" tooltip="Hide Sidebar" @click="hideSidebar">
        <i class="fab fas fa-eye"></i>
    </button>
    <button class="buttons">
        <i class="fab fas fa-cog"></i>
    </button>
</div>
</template>

<script>
export default {
    methods: {
        hideSidebar() {
            this.$emit('hideSidebar')
        }
    }
}
</script>

<style scoped>
@import url('../../assets/css/action-button.css');
</style>
