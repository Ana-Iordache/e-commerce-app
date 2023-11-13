<template>
    <v-progress-linear v-if="loadingData" color="blue-lighten-3" indeterminate></v-progress-linear>
    <div class="d-flex justify-center pa-2 ma-2" v-else-if="cart.length == 0">
        You have no products added yet
        <v-icon> mdi-emoticon-sad-outline</v-icon>
    </div>
    <div v-else>
        {{ cart }}
    </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useAuthenticationStore } from '@/pinia-stores/authenticationStore';
export default {
    name: 'CartPage',
    data() {
        return {
            cart: [],
            loadingData: true,
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
        }
    }
}
</script>