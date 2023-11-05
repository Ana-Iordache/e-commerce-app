<template>
    <div class="page_container">
        <PageHeader :title="'New product'" :pathToReturn="'/administration'"></PageHeader>
        <v-form class="custom_form" @submit.prevent="submitForm" ref="form">
            <v-row>
                <v-col>
                    <v-select label="Category" v-model="product.categoryId" :items="categories" item-title="name"
                        item-value="id" variant="outlined" :rules="[rules.required]"></v-select>
                </v-col>
                <v-col>
                    <v-select label="Subcategory" v-model="product.subcategoryId" :items="subcategoriesOfCategory"
                        item-title="name" item-value="id" variant="outlined" :rules="[rules.required]"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-text-field label="Name" variant="outlined" :rules="[rules.required]"
                        v-model="product.name"></v-text-field>
                </v-col>
                <v-col>
                    <v-select label="Gender" v-model="product.gender" :items="['F', 'M']" variant="outlined"
                        :rules="[rules.required]"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-text-field label="Price" type="number" variant="outlined" :rules="[rules.required]"
                        v-model="product.price"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field label="Discount" type="number" variant="outlined" v-model="product.discount" :min="0"
                        :max="100" @input="validateRangeValue"></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-file-input show-size counter multiple variant="outlined" prepend-icon="mdi-camera" chips
                        accept="image/png, image/jpeg, image/bmp" label="Images" title="Add product images"></v-file-input>
                </v-col>
            </v-row>

            <v-row>
                <v-divider></v-divider>
            </v-row>

            <v-row class="pa-2">
                <div class="pr-2">Stock</div>
                <v-icon title="Add" class="stock_icon" @click="addStock">{{ 'mdi-plus-circle' }}</v-icon>
            </v-row>
            <v-row v-for="(item, index) in product.stock" :key="index">
                <v-col>
                    <v-text-field label="Size" v-model="item.size" variant="outlined"
                        class="no_input_details"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field label="Quantity" type="number" v-model="item.quantity" class="no_input_details"
                        append-icon="mdi-close-circle-outline" @click:append="removeStock(index)"
                        variant="outlined"></v-text-field>

                </v-col>
            </v-row>

            <v-row>
                <v-divider></v-divider>
            </v-row>

            <v-row>
                <v-col>
                    <v-textarea label="Description" variant="outlined" v-model="product.description"
                        :maxlength="300"></v-textarea>
                </v-col>
            </v-row>
            <div class="d-flex justify-end description_lenght" :class="descriptionCurrentLength == MAX_LENGHT ? 'red' : ''">
                {{ descriptionCurrentLength }} / {{ MAX_LENGHT }}</div>

            <v-btn type="submit" variant="tonal" color="teal-darken-1">Save</v-btn>
        </v-form>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import generalFunctionsMixin from '@/commons/mixins';

export default {
    name: 'ProductForm',
    components: {
        PageHeader
    },
    mixins: [generalFunctionsMixin],
    data() {
        return {
            categories: [],
            product: {
                categoryId: null,
                subcategoryId: "Select a category first",
                name: "",
                gender: null,
                price: null,
                discount: 0,
                description: "",
                stock: [],
                images: [],
            },
            rules: {
                required: value => !!value || 'This field is required',
            },
            MAX_LENGHT: 300
        }
    },
    async mounted() {
        await this.loadCategories();
    },
    computed: {
        subcategoriesOfCategory() {
            if (!this.product.categoryId) {
                return [];
            }
            return this.categories.find(c => c.id == this.product.categoryId).subcategories;
        },
        descriptionCurrentLength() {
            return this.product.description.length;
        }
    },
    watch: {
        'product.categoryId'() {
            this.product.subcategoryId = null;
        }
    },
    methods: {
        loadCategories() {
            return new Promise(resolve => {
                this.axios.get("/categories")
                    .then(response => response.data)
                    .then(data => {
                        this.categories = data;
                    })
                    .catch(error => console.error(error))
                    .finally(() => resolve());
            })
        },
        validateRangeValue() {
            let value = parseFloat(this.product.discount);

            if (isNaN(value)) {
                this.product.discount = null;
            } else {
                // Ensure the value is within the desired range (0 to 100)
                this.product.discount = Math.min(100, Math.max(0, value));
            }
        },
        async submitForm() {
            let formValidation = await this.$refs.form.validate();
            if (formValidation.valid) {
                await this.saveProduct(this.product);
            }
        },
        saveProduct(product) {
            console.log(product)
        },
        addStock() {
            this.product.stock.push({ size: "", quantity: 0 })
        },
        removeStock(index) {
            this.product.stock.splice(index, 1);
        }
    }
}
</script>

<style scoped>
.description_lenght {
    font-size: .8rem;
    font-style: italic;
    color: rgba(201, 201, 201)
}

.red {
    color: red;
}
.stock_icon {
    cursor: pointer;
}
</style>