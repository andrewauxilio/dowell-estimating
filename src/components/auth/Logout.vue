<template>

</template>

<script>
export default {
    created() {
        this.$store.dispatch('removeUserDetails')
            .then(response => {
                this.$store.dispatch('removeGBGData')
                this.$store.dispatch('removeSMTData')
                this.$router.push('/')
                toast.fire({
                    type: "success",
                    title: "You have logged out successfully"
                });
            })
    }
}
</script>
