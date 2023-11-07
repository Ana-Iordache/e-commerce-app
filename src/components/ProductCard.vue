<template>
    <v-card :loading="loading" class="mx-auto my-12" max-width="374">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
        </template>

        <v-img cover height="auto"
            src="https://firebasestorage.googleapis.com/v0/b/ecommerce-app-7010d.appspot.com/o/products-images%2Fhmgoepprod.jpg?alt=media&token=17c1571b-49e5-4f73-af7b-879b22fddc68">
        </v-img>

        <v-card-actions>
            <v-list-item class="w-100 pe-0">
                <v-list-item-title>Product name</v-list-item-title>
                <v-list-item-subtitle class="d-flex">
                    <div class="me-1">199.99</div>
                    <div class="me-1 text-decoration-line-through">299.99</div>
                    <div class="red">10% off</div>
                </v-list-item-subtitle>
                <template v-slot:append>
                    <div class="justify-self-end">
                        <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart-outline" title="Add to favorites"></v-btn>
                        <v-btn size="small" color="surface-variant" variant="text" icon="mdi-basket-plus-outline" title="Add to cart"></v-btn>
                    </div>
                </template>
            </v-list-item>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'ProductCard',
    data() {
        return {
            loading: false
        }
    }

}
</script>

<style>
.red {
    color: red;
}
</style>