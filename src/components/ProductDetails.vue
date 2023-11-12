<template>
    <v-row>
        <v-col>
            <v-carousel hide-delimiter-background>
                <v-carousel-item v-for="image in product.images" :key="image" :src="image"></v-carousel-item>
            </v-carousel>
        </v-col>
        <v-col class="d-flex flex-column">
            <h3 class="mt-2">{{ product.name }}</h3>
            <div v-if="!product.discount">
                <h4 class="mt-1">{{ product.price }}€</h4>
            </div>
            <div v-else class="d-flex">
                <h4 class="me-2">{{ getDiscountedPrice(product.price, product.discount) }}€</h4>
                <div class="me-1 text-decoration-line-through">{{ product.price }}€</div>
                <div class="red">{{ product.discount }}% off</div>
            </div>
            <div class="mt-2 me-2">
                <div>Description</div>
                <div> {{ product.description }}</div>
            </div>

            <div class="mt-2">
                <div>Sizes</div>
                <v-item-group mandatory v-model="selectedSize" selected-class="bg-grey-lighten-2">
                    <v-row>
                        <v-item v-for="(stock, index) in product.stock" :key="index" v-slot="{ selectedClass, toggle }">
                            <v-chip :class="[selectedClass]" class="me-2" variant="outlined" @click="toggle">
                                {{ stock.size }}
                            </v-chip>
                        </v-item>
                    </v-row>
                </v-item-group>
            </div>

            <v-btn class="mt-auto" :disabled="this.authenticationStore.user == null"
                :title="this.authenticationStore.user == null ? 'Please login first' : ''" prepend-icon="mdi-shopping"
                @click="addToCart">Add to cart</v-btn>
        </v-col>
    </v-row>
</template>

<script>
import generalFunctionsMixin from '@/commons/mixins';
import { mapStores } from 'pinia';
import { useAuthenticationStore } from '@/pinia-stores/authenticationStore';

export default {
    mixins: [generalFunctionsMixin],
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    emits: ['added-to-cart'],
    data() {
        return {
            selectedSize: 0,
        }
    },
    computed: {
        ...mapStores(useAuthenticationStore)
    },
    methods: {
        async addToCart() {
            const cart = {
                productCode: this.product.code,
                size: this.product.stock[this.selectedSize].size,
                quantity: 1
            }
            return new Promise(resolve => {
                this.axios.post(`/users/${this.authenticationStore.user.id}/shoppingCarts`, cart)
                    .then(response => {
                        console.log(response.data);
                        this.$emit('added-to-cart', true);
                    })
                    .catch(error => {
                        console.error(error)
                        this.$emit('added-to-cart', false);
                    })
                    .finally(() => {

                        resolve()
                    });
            })
        }
    }
}
</script>

<style scoped>
.carousel_content {
    width: auto;
}

.v-row {
    margin: 0;
}

.v-btn:disabled {
    pointer-events: auto;
}
</style>