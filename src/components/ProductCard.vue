<template>
    <v-card :loading="loading" class="mx-auto my-12" max-width="374">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
        </template>

        <v-img class="product_image" cover height="auto" :src="image" @mouseover="changeImage" @mouseout="resetImage">
        </v-img>

        <v-card-actions>
            <v-list-item class="w-100 pe-0">
                <v-list-item-title>{{ product.name }}</v-list-item-title>
                <v-list-item-subtitle v-if="product.discount == 0">
                    <div class="me-1">{{ product.price }}€</div>
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else class="d-flex">
                    <div class="me-1">{{ getDiscountedPrice(product.price, product.discount) }}€</div>
                    <div class="me-1 text-decoration-line-through">{{ product.price }}€</div>
                    <div class="red">{{ product.discount }}% off</div>
                </v-list-item-subtitle>
                <template v-slot:append>
                    <!-- TODO: prevent from adding more than once -->
                    <div class="justify-self-end ms-4">
                        <v-btn class="px-0" size="small" color="surface-variant" variant="text" icon="mdi-heart-outline"
                            title="Add to favorites" @click="addToFavorites"></v-btn>

                        <v-menu v-model="selectSizeMenu" :close-on-content-click="false" location="end">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" class="px-0 ml-0" size="small" color="surface-variant" variant="text"
                                    icon="mdi-basket-plus-outline" title="Add to cart"></v-btn>
                            </template>

                            <v-card width="auto">
                                <v-card-item>
                                    <v-radio-group v-model="selectedSize">
                                        <v-radio v-for="stock in product.stock" :key="stock.size" :label="stock.size"
                                            :value="stock.size"></v-radio>
                                    </v-radio-group>
                                </v-card-item>
                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-btn variant="text" @click="selectSizeMenu = false"> Cancel </v-btn>
                                    <v-btn variant="text" @click="selectSize">
                                        Add
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
                    </div>
                </template>
            </v-list-item>
        </v-card-actions>
    </v-card>

    <!-- TODO: doesn't look right -->
    <v-snackbar :timeout="4000" :color="confirmation.success ? 'green-lighten-1' : 'red-lighten-1'" variant="tonal"
        v-model="confirmation.show">
        <v-icon>{{ confirmation.show ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline' }}</v-icon>
        {{ confirmation.success ? 'Product added successfully' : 'An error occured. Please try again' }}
    </v-snackbar>
</template>

<script>
import { mapStores } from 'pinia';
import { useAuthenticationStore } from '@/pinia-stores/authenticationStore';

export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            loading: false,
            image: "",
            selectSizeMenu: false,
            selectedSize: "",
            confirmation: {
                show: false,
                success: true
            }
        }
    },
    computed: {
        ...mapStores(useAuthenticationStore)
    },
    mounted() {
        this.image = this.product.images[0];
        this.selectedSize = this.product.stock[0].size;
    },
    methods: {
        changeImage() {
            this.image = this.product.images[1];
        },
        resetImage() {
            this.image = this.product.images[0];
        },
        getDiscountedPrice(price, discount) {
            return price - discount / 100 * price;
        },
        async addToFavorites() {
            if (this.authenticationStore.user == null) {
                this.$router.push("/connect");
                return;
            }
            await this.add(`/users/${this.authenticationStore.user.id}/favorites`, { productCode: this.product.code });
        },
        async selectSize() {
            await this.addToCart();
            this.selectSizeMenu = false;
        },
        async addToCart() {
            if (this.authenticationStore.user == null) {
                this.$router.push("/connect");
                return;
            }
            const cart = {
                productCode: this.product.code,
                size: this.selectedSize,
                quantity: 1
            }
            await this.add(`/users/${this.authenticationStore.user.id}/shoppingCarts`, cart);
        },
        add(url, data) {
            return new Promise(resolve => {
                this.axios.post(url, data)
                    .then(response => {
                        console.log(response.data);
                        this.confirmation.show = true;
                        this.confirmation.success = true;
                    })
                    .catch(error => {
                        console.error(error)
                        this.confirmation.show = true;
                        this.confirmation.success = false;
                    })
                    .finally(() => resolve());
            })
        }
    }

}
</script>

<style>
.red {
    color: red;
}

.product_image {
    transition: 0.3s;
}

.v-radio-group .v-input__details {
    display: none;
}
</style>