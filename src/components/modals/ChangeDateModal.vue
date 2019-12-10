<template>
<div class="modal fade date-modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-dark font-weight-bold">Change Dates</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Start Date</label>
                        <input type="date" class="form-control" v-model="startDate">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">End Date</label>
                        <input type="date" class="form-control" v-model="endDate">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="changeDateChild">Submit</button>
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
            startDate: "",
            endDate: ""
        }
    },

    methods: {
        changeDateChild(event) {
            this.$store.dispatch('changeDates', {
                start: this.startDate,
                end: this.endDate
            }).then((response) => {
                this.$emit('change')
                toast.fire({
                    type: "success",
                    title: "Dates changed (from: " + this.startDate + " to: " + this.endDate + ")"

                })
            })
        }
    }
}
</script>
