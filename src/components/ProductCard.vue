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
                    <div class="justify-self-end ms-4">
                        <v-btn class="px-0" size="small" color="surface-variant" variant="text" icon="mdi-heart-outline"
                            title="Add to favorites" @click="addToFavorites"></v-btn>
                        <v-btn class="px-0 ml-0" size="small" color="surface-variant" variant="text"
                            icon="mdi-basket-plus-outline" title="Add to cart" @click="addToCart"></v-btn>
                    </div>
                </template>
            </v-list-item>
        </v-card-actions>
    </v-card>
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
        }
    },
    computed: {
        ...mapStores(useAuthenticationStore)
    },
    mounted() {
        this.image = this.product.images[0];
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
            await this.add(`/users/${this.authenticationStore.user.id}/favorites`);
        },
        addToCart() {
            console.log("addToCart")
        },
        add(url) {
            return new Promise(resolve => {
                this.axios.post(url, { productCode: this.product.code })
                    .then(response => console.log(response.data))
                    .catch(error => console.error(error))
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
</style>