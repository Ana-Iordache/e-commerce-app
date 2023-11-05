<template>
    <div class="d-flex align-center">
        <v-btn variant="tonal" width="fit-content" prepend-icon="mdi-chevron-left" :to="pathToReturn">Back</v-btn>
        <h3 class="ms-4">{{ title }}</h3>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        pathToReturn: {
            type: String,
            required: true,
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