<template>
    <div class="page_container">
        <v-btn prepend-icon="mdi-plus" width="fit-content" variant="tonal" @click="showProductForm(true)">Add
            product</v-btn>
    </div>

    <v-dialog v-model="addProduct.showFormDialog" width="80%">
        <v-card color="blue-grey-lighten-5" class="pa-3 text-center">
            <v-btn icon class="ml-auto" size="x-small" variant="outlined" @click="showProductForm(false)">
                <v-icon>{{ 'mdi-close' }}</v-icon>
            </v-btn>
            <v-card-title>Add product</v-card-title>
            <v-card-text>
                <ProductForm @product-added="showConfirmation"></ProductForm>
            </v-card-text>
        </v-card>
    </v-dialog>

    <v-snackbar :timeout="4000" :color="addProduct.productAdded ? 'green-lighten-1' : 'red-lighten-1'" variant="tonal"
        v-model="addProduct.showProductAddedConfirmation">
        <v-icon>{{ addProduct.productAdded ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline' }}</v-icon>
        {{ addProduct.productAdded ? 'Product added successfully' : 'Product couldn\'t be added' }}
    </v-snackbar>
</template>

<script>
import ProductForm from './administration/ProductForm.vue';
export default {
    components: {
        ProductForm,
    },
    name: 'AdministrationPage',
    data() {
        return {
            addProduct: {
                showFormDialog: false,
                showProductAddedConfirmation: false,
                productAdded: false,
            },
            products: [],
        }
    },
    async mounted() {
        await this.loadProducts();
    },
    methods: {
        showProductForm(show) {
            this.addProduct.showFormDialog = show;
        },
        showConfirmation(productAdded) {
            this.showProductForm(false);
            this.addProduct.productAdded = productAdded;
            this.addProduct.showProductAddedConfirmation = true;
        },
        loadProducts() {
            return new Promise(resolve => {
                this.axios.get("/products")
                    .then(response => response.data)
                    .then(data => this.products = data)
                    .catch(error => console.error(error))
                    .finally(() => resolve());
            })
        }
    }
}
</script>

<style>
.v-card-text {
    overflow-y: auto;
}
</style>