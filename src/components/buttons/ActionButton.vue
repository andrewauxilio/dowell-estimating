<template>
<div class="fab-container animated infinite pulse slow">
    <button class="buttons" tooltip="Download Reports" data-toggle="modal" data-target=".report-modal">
        <i class="fab fas fa-download"></i>
    </button>
    <button class="buttons" tooltip="Set Current Date" @click="resetDate">
        <i class="fab fas fa-clock"></i>
    </button>
    <button class="buttons" tooltip="Change Dates" data-toggle="modal" data-target=".date-modal">
        <i class="fab fas fa-calendar-alt"></i>
    </button>
    <button class="buttons" tooltip="Refresh Page" @click="refreshPage">
        <i class="fab fas fa-sync-alt"></i>
    </button>
    <button class="buttons" tooltip="Actions">
        <i class="fab fas fa-cogs"></i>
    </button>
</div>
</template>

<script>
export default {
    methods: {
        refreshPage() {
            this.$emit('refresh');
        },

        resetDate() {
            this.$store.dispatch('getDates')
            .then((response) => {
                this.$emit('change')
                toast.fire({
                    type: "success",
                    title: "Dates changed to today"

                });
            });
        }
    }
}
</script>
