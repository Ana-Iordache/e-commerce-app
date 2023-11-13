<template>
    <div class="">
        <v-row>
            <v-col v-for="product in accessoriesProducts" :key="product.id" cols="12" sm="6" md="4">
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
    name: 'AccesoriesPage',
    components: {
        ProductCard,
    },
    data() {
        return {
            accessoriesProducts: []
        }
    },
    computed: {
        ...mapStores(useAuthenticationStore)
    },
    async mounted() {
        await this.loadAccessoriesProducts();
    },
    methods: {
        loadAccessoriesProducts() {
            return new Promise(resolve => {
                this.axios.get("/products?category=accesories")
                    .then(response => response.data)
                    .then(async data => {
                        this.accessoriesProducts = data;
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
                        let favoriteIds = data.map(fav => fav.code);
                        this.accessoriesProducts = this.accessoriesProducts.map(prod => {
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
            this.accessoriesProducts.find(prod => prod.code == productCode).favorite = value;
        }
    }
}
</script>

<style></style>