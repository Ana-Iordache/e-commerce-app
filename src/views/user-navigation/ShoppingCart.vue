<template>
    <v-progress-linear v-if="loadingData" color="blue-lighten-3" indeterminate></v-progress-linear>
    <div class="d-flex justify-center pa-2 ma-2" v-else-if="cart.length == 0">
        You have no products added yet
        <v-icon> mdi-emoticon-sad-outline</v-icon>
    </div>
    <div v-else v-for="(prod, index) in cart" :key="prod.code">
        <div class="d-flex flex-row pa-2 ma-2">
            <img :src="prod.imageUrl" height="300">
            <v-form class="d-flex flex-column flex-grow-1 px-2 mx-2">
                <h3>{{ prod.name }}</h3>
                <div v-if="prod.discount == 0">
                    <div class="me-1">{{ prod.price }}€</div>
                </div>
                <div v-else class="d-flex">
                    <div class="me-1">{{ getDiscountedPrice(prod.price, prod.discount) }}€</div>
                    <div class="me-1 text-decoration-line-through">{{ prod.price }}€</div>
                    <div class="red">{{ prod.discount }}% off</div>
                </div>
                <v-row class="py-3">
                    <v-col>
                        <v-select :items="Object.keys(prod.stock)" label="Size" variant="outlined"
                            v-model="prod.size"></v-select>
                    </v-col>
                    <v-col>
                        <v-select :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" label="Quantity" variant="outlined"
                            v-model="prod.quantity"></v-select>
                    </v-col>
                </v-row>

                <div class="d-flex flex-wrap justify-space-between">
                    <v-btn class="flex-1-0 ma-2" text="Move to favorites" variant="outlined" append-icon="mdi-heart-plus"
                        @click="moveToFavorites(prod.code, index)"></v-btn>
                    <v-btn class="flex-1-0 ma-2" text="Remove" variant="outlined" append-icon="mdi-basket-remove-outline"
                        color="red" @click="removeFromCart(prod.code, index)"></v-btn>
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
import { useAuthenticationStore } from '@/pinia-stores/authenticationStore';
import generalFunctionsMixin from '@/commons/mixins';

export default {
    name: 'CartPage',
    mixins: [generalFunctionsMixin],
    data() {
        return {
            cart: [],
            loadingData: true,
            confirmation: {
                show: false,
                success: true,
                message: ""
            },
        }
    },
    async mounted() {
        this.loadingData = true;
        await this.loadShoppingCart();
        this.loadingData = false;
    },
    computed: {
        ...mapStores(useAuthenticationStore)
    },
    methods: {
        loadShoppingCart() {
            return new Promise(resolve => {
                this.axios.get(`users/${this.authenticationStore.user.id}/shoppingCarts`)
                    .then(response => this.cart = response.data)
                    .catch(error => console.error(error))
                    .finally(() => resolve());
            })
        },
        removeFromCart(productCode, index, showConfirmation = true) {
            return new Promise(resolve => {
                this.axios.delete(`users/${this.authenticationStore.user.id}/shoppingCarts/${productCode}`)
                    .then(() => {
                        this.cart.splice(index, 1);
                        this.confirmation = {
                            show: showConfirmation,
                            success: true,
                            message: "Product removed from cart successfully"
                        }
                    })
                    .catch(error => {
                        console.error(error)
                        this.confirmation.show = showConfirmation;
                        this.confirmation.success = false;
                        this.confirmation.message = 'An error occured. Please try again';
                    })
                    .finally(() => {
                        resolve()
                    });
            })
        },
        moveToFavorites(productCode, index) {
            return new Promise(resolve => {
                this.axios.post(`users/${this.authenticationStore.user.id}/favorites`, { productCode: productCode })
                    .then(async () => {
                        await this.removeFromCart(productCode, index, false);
                        this.confirmation = {
                            show: true,
                            success: true,
                            message: "Product moved to favorites successfully"
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        this.confirmation = {
                            show: true,
                            success: false,
                            message: "An error occured. Please try again"
                        }
                    })
                    .finally(() => {
                        resolve()
                    });

            })
        }
    }
}
</script>