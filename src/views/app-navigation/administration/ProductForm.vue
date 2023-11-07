<template>
    <v-form class="custom_form" @submit.prevent="submitForm" ref="form">
        <v-row>
            <v-col>
                <v-text-field label="Name" variant="outlined" :rules="[rules.required]"
                    v-model="product.name"></v-text-field>
            </v-col>
            <v-col>
                <v-select label="Category" v-model="product.categoryId" :items="categories" item-title="name"
                    item-value="id" variant="outlined" :rules="[rules.required]"></v-select>
            </v-col>
            <v-col>
                <v-select label="Subcategory" v-model="product.subCategoryId" :items="subcategoriesOfCategory"
                    item-title="name" item-value="id" variant="outlined" :rules="[rules.required]"></v-select>
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
            <v-col>
                <v-radio-group inline label="Gender" v-model="product.gender" :rules="[rules.required]">
                    <v-radio label="Woman" value="F"></v-radio>
                    <v-radio label="Male" value="M"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>

        <v-row v-if="!editProduct">
            <v-col>
                <v-file-input show-size counter multiple variant="outlined" prepend-icon="mdi-camera" chips
                    accept="image/png, image/jpeg, image/bmp" label="Images" title="Add product images"
                    @change="uploadImages"></v-file-input>
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
                <v-text-field label="Size" v-model="item.size" variant="outlined" class="no_input_details"></v-text-field>
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

        <v-dialog v-model="showDialog" persistent width="40%">
            <v-card color="blue-grey-lighten-4" class="pa-3 text-center">
                <v-card-title>Adding product</v-card-title>
                <v-card-text>
                    <v-progress-circular indeterminate color="white" size="small" width="3"
                        class="mr-2"></v-progress-circular>
                    Please wait...
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-form>
</template>

<script>
import generalFunctionsMixin from '@/commons/mixins';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default {
    name: 'ProductForm',
    props: {
        editProduct: {
            type: Object
        }
    },
    emits: ['product-added'],
    mixins: [generalFunctionsMixin],
    data() {
        return {
            categories: [],
            product: {
                categoryId: null,
                subCategoryId: "Select a category first",
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
            MAX_LENGHT: 300,
            uploadedImages: {},
            showDialog: false,
        }
    },
    async mounted() {
        await this.loadCategories()
        if (this.editProduct != null) {
            this.product = this.editProduct;
        }
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
            if(this.editProduct == null)
                this.product.subCategoryId = null;
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
                this.showDialog = true;
                await this.uploadImagesToFirebase();
                await this.saveProduct(this.product); // TODO: check if is put/post
                this.showDialog = false;
            }
        },
        saveProduct(product) {
            return new Promise(resolve => {
                this.axios.post("/products", product)
                    .then(response => {
                        console.log('DEBUG ', response.data)
                        this.$emit('product-added', true);
                    })
                    .catch(error => {
                        console.error(error)
                        this.$emit('product-added', false);
                    })
                    .finally(() => resolve());
            })
        },
        addStock() {
            this.product.stock.push({ size: "", quantity: 0 })
        },
        removeStock(index) {
            this.product.stock.splice(index, 1);
        },
        uploadImages(e) {
            this.uploadedImages = e.target.files;
        },
        async uploadImagesToFirebase() {
            const storage = getStorage();
            const uploadPromises = [];

            for (let file of this.uploadedImages) {
                // console.log("FILE: ", file);

                let fileRef = storageRef(storage, 'products-images/' + file.name);
                let uploadTask = uploadBytesResumable(fileRef, file);

                const uploadPromise = new Promise((resolve, reject) => {
                    uploadTask.on('state_changed',
                        (snapshot) => {
                            // Observe state change events such as progress, pause, and resume
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                            // switch (snapshot.state) {
                            //     case 'paused':
                            //         console.log('Upload is paused');
                            //         break;
                            //     case 'running':
                            //         console.log('Upload is running');
                            //         break;
                            // }
                        },
                        (error) => {
                            console.error(error);
                            reject(error);
                        },
                        async () => {
                            // Handle successful uploads on complete
                            try {
                                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                                this.product.images.push(downloadURL);
                                // console.log('File available at', downloadURL);
                                resolve();
                            } catch (error) {
                                reject(error);
                            }
                        }
                    );
                });

                uploadPromises.push(uploadPromise);
            }

            // Wait for all upload promises to resolve
            try {
                await Promise.all(uploadPromises);
            } catch (error) {
                console.error('Error uploading images:', error);
            }
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