<template>

</template>

<script>
export default {
    created() {
        this.$store.dispatch('removeUserDetails')
            .then(response => {
                this.$router.push('/')
                toast.fire({
                    icon: "success",
                    title: "You have logged out successfully"
                });
            })
    }
}
</script>
