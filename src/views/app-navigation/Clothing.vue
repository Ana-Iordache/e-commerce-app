<template>
    <div class="page_container_products">
        <ProductCard></ProductCard>
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
export default {
    name: 'ClothingPage',
    components: {
        ProductCard,
    }
}
</script>

<style>
.page_container_products {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap
    /* flex-shrink: 1; */
    /* flex-grow: 1; */
}
</style>