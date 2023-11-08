<template>
    <div class="">
        <v-row>
            <v-col v-for="product in accessoriesProducts" :key="product.id" cols="12" sm="6" md="4">
                <ProductCard :product="product"></ProductCard>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
export default {
    name: 'AccesoriesPage',
    components: {
        ProductCard,
    },
    data() {
        return {
            accessoriesProducts: []
        }
    },
    async mounted() {
        await this.loadAccessoriesProducts();
    },
    methods: {
        loadAccessoriesProducts() {
            return new Promise(resolve => {
                this.axios.get("/products?category=accesories")
                    .then(response => response.data)
                    .then(data => this.accessoriesProducts = data)
                    .catch(error => console.error(error))
                    .finally(() => resolve());
            })
        }
    }
}
</script>

<style>
</style>