<template>
    cart page
    {{ cart }}
</template>

<script>
import { mapStores } from 'pinia';
import { useAuthenticationStore } from '@/pinia-stores/authenticationStore';
export default {
    name: 'CartPage',
    data() {
        return {
            cart: []
        }
    },
    async mounted() {
        await this.loadShoppingCart();
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