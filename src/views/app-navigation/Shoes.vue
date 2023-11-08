<template>
    <div class="">
        <v-row>
            <v-col v-for="product in shoesProducts" :key="product.id" cols="12" sm="6" md="4">
                <ProductCard :product="product"></ProductCard>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
export default {
    name: 'ShoesPage',
    components: {
        ProductCard,
    },
    data() {
        return {
            shoesProducts: []
        }
    },
    async mounted() {
        await this.loadShoesProducts();
    },
    methods: {
        loadShoesProducts() {
            return new Promise(resolve => {
                this.axios.get("/products?category=shoes")
                    .then(response => response.data)
                    .then(data => this.shoesProducts = data)
                    .catch(error => console.error(error))
                    .finally(() => resolve());
            })
        }
    }
}
</script>

<style>
</style>