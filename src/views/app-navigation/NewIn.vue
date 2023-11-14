<template>
    <v-progress-linear v-if="loadingData" color="blue-lighten-3" indeterminate></v-progress-linear>
    <div v-else>
        <v-row>
            <v-col v-for="product in news" :key="product.id" cols="12" sm="6" md="4">
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
    name: 'NewInPage',
    components: {
        ProductCard,
    },
    data() {
        return {
            news: [],
            loadingData: true,
        }
    },
    computed: {
        ...mapStores(useAuthenticationStore)
    },
    async mounted() {
        this.loadingData = true;
        await this.loadNews();
        this.loadingData = false;
    },
    methods: {
        loadNews() {
            return new Promise(resolve => {
                this.axios.get("/products?category=newIn")
                    .then(response => response.data)
                    .then(async data => {
                        this.news = data;
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
                        this.news = this.news.map(prod => {
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
            this.news.find(prod => prod.code == productCode).favorite = value;
        }
    }
}
</script>

<style></style>