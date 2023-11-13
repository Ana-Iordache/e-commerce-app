<template>
    <v-progress-linear v-if="loadingData" color="blue-lighten-3" indeterminate></v-progress-linear>
    <div class="d-flex justify-center pa-2 ma-2" v-else-if="favorites.length == 0">
        You have no favorites yet
        <v-icon> mdi-emoticon-sad-outline</v-icon>
    </div>
    <div v-else v-for="(fav, index) in favorites" :key="fav.code">
        <div class="d-flex flex-row pa-2 ma-2">
            <img :src="fav.imageUrl" height="300">
            <v-form class="d-flex flex-column flex-grow-1 px-2 mx-2" ref="form" @submit.prevent="addToCart(index, fav)">
                <h3>{{ fav.name }}</h3>
                <div v-if="fav.discount == 0">
                    <div class="me-1">{{ fav.price }}€</div>
                </div>
                <div v-else class="d-flex">
                    <div class="me-1">{{ getDiscountedPrice(fav.price, fav.discount) }}€</div>
                    <div class="me-1 text-decoration-line-through">{{ fav.price }}€</div>
                    <div class="red">{{ fav.discount }}% off</div>
                </div>
                <v-row class="py-3">
                    <v-col>
                        <v-select :items="Object.keys(fav.stock)" label="Size" variant="outlined" v-model="fav.selectedSize"
                            :rules="[rules.required]"></v-select>
                    </v-col>
                    <v-col>
                        <v-select :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" label="Quantity" variant="outlined"
                            v-model="fav.selectedQuantity" :rules="[rules.required]"></v-select>
                    </v-col>
                </v-row>

                <div class="d-flex flex-wrap justify-space-between">
                    <v-btn class="flex-1-0 ma-2" text="Add to cart" variant="outlined" append-icon="mdi-shopping"
                        type="submit"></v-btn>
                    <v-btn class="flex-1-0 ma-2" text="Remove" variant="outlined" append-icon="mdi-heart-remove" color="red"
                        @click="removeFavorite(fav.code, index)"></v-btn>
                </div>
            </v-form>
        </div>
        <v-divider></v-divider>
    </div>

    <v-snackbar :timeout="4000" :color="confirmation.success ? 'green-lighten-1' : 'red-lighten-1'" variant="tonal"
        v-model="confirmation.show">
        <v-icon>{{ confirmation.show ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline' }}</v-icon>
        {{ confirmation.message }}
    </v-snackbar>
</template>

<script>
import { mapStores } from 'pinia';
import { useAuthenticationStore } from '@/pinia-stores/authenticationStore'
import generalFunctionsMixin from '@/commons/mixins';

export default {
    name: 'FavoritesPage',
    mixins: [generalFunctionsMixin],
    data() {
        return {
            favorites: [],
            rules: {
                required: value => !!value || 'This field is required',
            },
            confirmation: {
                show: false,
                success: true,
                message: ""
            },
            loadingData: true,
        }
    },
    async mounted() {
        this.loadingData = true;
        await this.loadFavorites();
        this.loadingData = false;
    },
    computed: {
        ...mapStores(useAuthenticationStore)
    },
    methods: {
        loadFavorites() {
            return new Promise(resolve => {
                this.axios.get(`/users/${this.authenticationStore.user.id}/favorites`)
                    .then(response => response.data)
                    .then(data => {
                        this.favorites = data.map(prod => {
                            return {
                                ...prod,
                                selectedQuantity: null,
                                selectedSize: null
                            }
                        })
                    })
                    .catch(error => console.error(error))
                    .finally(() => resolve());
            })
        },
        async addToCart(index, product) {
            let formValidation = await this.$refs.form[index].validate();
            if (formValidation.valid) {
                const cart = {
                    productCode: product.code,
                    size: product.selectedSize,
                    quantity: product.selectedQuantity
                }
                return new Promise(resolve => {
                    this.axios.post(`/users/${this.authenticationStore.user.id}/shoppingCarts`, cart)
                        .then(() => {
                            this.confirmation.show = true;
                            this.confirmation.success = true;
                            this.confirmation.message = 'Product added successfully';
                        })
                        .catch(error => {
                            console.error(error)
                            this.confirmation.show = true;
                            this.confirmation.success = false;
                            this.confirmation.message = 'An error occured. Please try again';
                        })
                        .finally(() => {
                            resolve()
                        });
                })
            }
        },
        async removeFavorite(productCode, index) {
            return new Promise(resolve => {
                this.axios.delete(`/users/${this.authenticationStore.user.id}/favorites/${productCode}`)
                    .then(() => {
                        this.favorites.splice(index, 1);
                        this.confirmation.show = true;
                        this.confirmation.success = true;
                        this.confirmation.message = 'Product removed successfully';
                    })
                    .catch(error => {
                        console.error(error)
                        this.confirmation.show = true;
                        this.confirmation.success = false;
                        this.confirmation.message = 'An error occured. Please try again';
                    })
                    .finally(() => {
                        resolve()
                    });
            })
        }
    }
}
</script>