<template>
    <div class="d-flex align-center">
        <v-btn variant="tonal" width="fit-content" prepend-icon="mdi-chevron-left">Back</v-btn>
        <h3 class="ms-4">{{ title }}</h3>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped>

</style>