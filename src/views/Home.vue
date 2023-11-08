<template>
    <div class="page_wrapper">
        <CarouselImages></CarouselImages>
    </div>
</template>

<script>
import CarouselImages from '@/components/CarouselImages.vue';
export default {
    name: "HomePage",
    components: {
        CarouselImages
    }
}
</script>

<style>
.page_wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>