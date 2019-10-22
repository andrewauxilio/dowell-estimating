<template>

</template>

<script>
export default {
    created() {
        this.$store.dispatch('removeUserDetails')
            .then(response => {
                this.$store.dispatch('removeGBGData')
                this.$router.push('/')
                toast.fire({
                    type: "success",
                    title: "You have logged out successfully"
                });
            })
    }
}
</script>
