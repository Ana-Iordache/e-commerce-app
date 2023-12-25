<template>
    <div class="page_container">
        <v-btn prepend-icon="mdi-plus" width="fit-content" class="ml-auto" variant="tonal" @click="showProductForm(true)">Add
            product</v-btn>

        <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="products" class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon size="small" class="me-2" @click="showProductForm(true, item)" title="Edit product">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" @click="deleteProduct(item)" title="Delete product">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </div>

    <v-dialog v-model="addProduct.showFormDialog" width="80%">
        <v-card color="blue-grey-lighten-5" class="pa-3 text-center">
            <v-btn icon class="ml-auto" size="x-small" variant="outlined" @click="showProductForm(false)">
                <v-icon>{{ 'mdi-close' }}</v-icon>
            </v-btn>
            <v-card-title>{{ editProduct ? 'Edit' : 'Add' }} product</v-card-title>
            <v-card-text>
                <ProductForm @product-added="showConfirmation" :editProduct="editProduct"></ProductForm>
            </v-card-text>
        </v-card>
    </v-dialog>

    <v-snackbar :timeout="4000" :color="addProduct.productAdded ? 'green-lighten-1' : 'red-lighten-1'" variant="tonal"
        v-model="addProduct.showProductAddedConfirmation">
        <v-icon>{{ addProduct.productAdded ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline' }}</v-icon>
        {{ addProduct.productAdded ? 'Product saved successfully' : 'Product couldn\'t be saved' }}
    </v-snackbar>
</template>

<script>
import ProductForm from './administration/ProductForm.vue';
import { VDataTable } from "vuetify/labs/VDataTable";
export default {
    components: {
        ProductForm,
        VDataTable
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
            headers: [
                { title: "Name", align: "start", key: "name" },
                { title: "Added at", align: "end", key: "addingDate" }, // TODO: parse to string
                { title: "Price", align: "end", key: "price" },
                { title: "Discount", align: "end", key: "discount" },
                { title: "Category", align: "end", key: "category" },
                { title: "Subcategory", align: "end", key: "subcategory" },
                { title: "Gender", align: "end", key: "gender" },
                { title: 'Actions', key: 'actions', sortable: false },
            ],
            itemsPerPage: 5,
            editProduct: {},
        }
    },
    async mounted() {
        await this.loadProducts();
    },
    methods: {
        showProductForm(show, product = null) {
            this.addProduct.showFormDialog = show;
            this.editProduct = product;
        },
        showConfirmation(productAdded, product) {
            this.showProductForm(false);
            this.addProduct.productAdded = productAdded;
            this.addProduct.showProductAddedConfirmation = true;

            this.products.push(product);
        },
        loadProducts() {
            return new Promise(resolve => {
                this.axios.get("/products")
                    .then(response => response.data)
                    .then(data => {
                        this.products = data;
                    })
                    .catch(error => console.error(error))
                    .finally(() => resolve());
            })
        },
        // TODO: delete /products/:id
        deleteProduct(product) {
            console.log(product)
        }
    }
}
</script>

<style>
.v-card-text {
    overflow-y: auto;
}

.v-icon.mdi-pencil {
    color: green;
}

.v-icon.mdi-delete {
    color: darkred;
}
</style>