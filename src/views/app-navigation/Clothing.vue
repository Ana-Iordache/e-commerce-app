<template>
    <div class="">
        <v-row>
            <v-col v-for="product in clothingProducts" :key="product.id" cols="12" sm="6" md="4">
                <ProductCard :product="product" @favorite-changed="updateFavorites"></ProductCard>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useAuthenticationStore } from '@/pinia-stores/authenticationStore';
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
    computed: {
        ...mapStores(useAuthenticationStore)
    },
    async mounted() {
        await this.loadClothingProducts();
    },
    methods: {
        loadClothingProducts() {
            return new Promise(resolve => {
                this.axios.get("/products?category=clothing")
                    .then(response => response.data)
                    .then(async data => {
                        this.clothingProducts = data;
                        if (this.authenticationStore.user != null) {
                            await this.loadFavoritesOfUser();
                        }
                    })
                    .catch(error => console.error(error))
                    .finally(() => resolve());
            })
        },

        loadFavoritesOfUser() {
            return new Promise(resolve => {
                this.axios.get(`/users/${this.authenticationStore.user.id}/favorites`)
                    .then(response => response.data)
                    .then(data => {
                        let favoriteIds = data.map(fav => fav.productCode);
                        this.clothingProducts = this.clothingProducts.map(prod => {
                            return {
                                ...prod,
                                favorite: favoriteIds.indexOf(prod.code) != -1
                            }
                        })
                    })
                    .catch(error => console.error(error))
                    .finally(() => resolve());
            })
        },
        updateFavorites(productCode, value) {
            this.clothingProducts.find(prod => prod.code == productCode).favorite = value;
        }
    }
}
</script>

<style></style>