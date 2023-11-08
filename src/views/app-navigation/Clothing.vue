<template>
    <div class="">
        <v-row>
            <v-col v-for="product in clothingProducts" :key="product.id" cols="12" sm="6" md="4">
                <ProductCard :product="product"></ProductCard>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
export default {
    name: 'ClothingPage',
    components: {
        ProductCard,
    },
    data() {
        return {
            clothingProducts: []
        }
    },
    async mounted() {
        await this.loadClothingProducts();
    },
    methods: {
        loadClothingProducts() {
            return new Promise(resolve => {
                this.axios.get("/products?category=clothing")
                    .then(response => response.data)
                    .then(data => this.clothingProducts = data)
                    .catch(error => console.error(error))
                    .finally(() => resolve());
            })
        }
    }
}
</script>

<style>
</style>