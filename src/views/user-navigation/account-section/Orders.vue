<template>
    <div class="page_container">
        <v-progress-linear v-if="loadingData" color="blue-lighten-3" indeterminate></v-progress-linear>
        <div class="d-flex justify-center pa-2 ma-2" v-else-if="orders.length == 0">
            You have no orders yet
            <v-icon> mdi-emoticon-sad-outline</v-icon>
        </div>
        <div v-else v-for="order in orders" :key="order.id">
            <v-row>
                <v-col class="text-h6">
                    <span>Amount: </span> {{ order.amount }}€
                </v-col>
                <v-col class="d-flex justify-end">
                    <span class="mr-2">Order date: </span> {{ convertDateTimeToString(new Date(order.orderDateTime)) }}
                </v-col>
            </v-row>
            <v-row>
                <v-col v-for="(product, index) in order.products" :key="index" cols="12" sm="6" md="3"
                    class="d-flex flex-column align-center">
                    <img :src="product.imageUrl" height="200">
                    <div class="mx-2">
                        {{ product.name }} | {{ product.size }} | {{ product.quantity }} item(s)
                    </div>
                </v-col>
            </v-row>
            <v-divider></v-divider>
        </div>
    </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useAuthenticationStore } from '@/pinia-stores/authenticationStore';
import generalFunctionsMixin from '@/commons/mixins';

export default {
    name: "OrdersPage",
    mixins: [generalFunctionsMixin],
    data() {
        return {
            orders: [],
            loadingData: true,
        }
    },
    computed: {
        ...mapStores(useAuthenticationStore),
    },
    async mounted() {
        this.loadingData = true;
        await this.loadOrders();
        this.loadingData = false;
    },
    methods: {
        loadOrders() {
            return new Promise(resolve => {
                this.axios.get(`/users/${this.authenticationStore.user.id}/orders`)
                    .then(response => response.data)
                    .then(data => this.orders = data)
                    .catch(error => console.error(error))
                    .finally(() => resolve());
            })
        }
    }
}
</script>