<template>
    <v-progress-linear v-if="loadingData" color="blue-lighten-3" indeterminate></v-progress-linear>
    <div class="d-flex justify-center pa-2 ma-2" v-else-if="cart.length == 0">
        You have no products added yet
        <v-icon> mdi-emoticon-sad-outline</v-icon>
    </div>
    <div v-else class="d-flex flex-column flex-grow-1">
        <div>
            <div v-for="(prod, index) in cart" :key="prod.code">
                <div class="d-flex flex-row pa-2 ma-2">
                    <img :src="prod.imageUrl" height="300">
                    <v-form class="d-flex flex-column flex-grow-1 px-2 mx-2">
                        <h3>{{ prod.name }}</h3>
                        <div v-if="prod.discount == 0">
                            <div class="me-1">{{ prod.price }}€</div>
                        </div>
                        <div v-else class="d-flex">
                            <div class="me-1">{{ getDiscountedPrice(prod.price, prod.discount) }}€</div>
                            <div class="me-1 text-decoration-line-through">{{ prod.price }}€</div>
                            <div class="red">{{ prod.discount }}% off</div>
                        </div>
                        <v-row class="py-3">
                            <v-col>
                                <v-select :items="Object.keys(prod.stock)" label="Size" variant="outlined"
                                    v-model="prod.size"></v-select>
                            </v-col>
                            <v-col>
                                <v-select :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" label="Quantity" variant="outlined"
                                    v-model="prod.quantity"></v-select>
                            </v-col>
                        </v-row>

                        <div class="d-flex flex-wrap justify-space-between">
                            <v-btn class="flex-1-0 ma-2" text="Move to favorites" variant="outlined"
                                append-icon="mdi-heart-plus" @click="moveToFavorites(prod.code, index)"></v-btn>
                            <v-btn class="flex-1-0 ma-2" text="Remove" variant="outlined"
                                append-icon="mdi-basket-remove-outline" color="red"
                                @click="removeFromCart(prod.code, index)"></v-btn>
                        </div>
                    </v-form>
                </div>
                <v-divider></v-divider>
            </div>
        </div>

        <v-dialog width="60%">
            <template v-slot:activator="{ props }">
                <div class="mt-auto ma-3 pa-3 align-self-end">
                    <v-btn v-bind="props" text="Place order" width="fit-content"></v-btn>
                </div>
            </template>

            <v-card>
                <v-stepper v-model="currentStepNo" :items="steps" show-actions>
                    <template v-slot:[`item.1`]>
                        <h3 class="text-h6 mb-2">Products</h3>
                        <v-list-item v-for="product in cart" :key="product.code">
                            <v-list-item-title>{{ product.name }} | {{ product.size }} | {{ product.quantity
                            }}</v-list-item-title>
                            <v-list-item-subtitle v-if="!product.discount">{{ product.price }}€</v-list-item-subtitle>
                            <v-list-item-subtitle v-else class="d-inline-flex">
                                <div class="me-1">{{ getDiscountedPrice(product.price, product.discount) }}€</div>
                                <div class="me-1 text-decoration-line-through">{{ product.price }}€</div>
                                <div class="red">(discount {{ product.discount }}%)</div>
                            </v-list-item-subtitle>
                            <v-divider></v-divider>
                        </v-list-item>
                        <v-list-item class="font-weight-bold">Total: {{ getTotalToPay() }}€</v-list-item>
                    </template>
                    <template v-slot:[`item.2`]>
                        <h3 class="text-h6 mb-2">Address</h3>
                        <v-form ref="form">
                            <v-row>
                                <v-col>
                                    <v-text-field label="City" variant="outlined" density="compact"
                                        v-model="deliveryAddress.city" :rules="[rules.required]"></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field label="Street" variant="outlined" density="compact"
                                        v-model="deliveryAddress.street" :rules="[rules.required]"></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field label="Number" variant="outlined" density="compact"
                                        v-model="deliveryAddress.number" :rules="[rules.required]"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field label="Zip code" variant="outlined" density="compact"
                                        v-model="deliveryAddress.zipCode" :rules="[rules.required]"></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field label="Floor" variant="outlined" density="compact"
                                        v-model="deliveryAddress.floor" :rules="[rules.required]"></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field label="Apartment number" variant="outlined" density="compact"
                                        v-model="deliveryAddress.apartmentNumber" :rules="[rules.required]"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </template>
                    <template v-slot:[`item.3`]>
                        <h3 class="text-h6 mb-2">Pay and place order</h3>
                        <v-list-item v-for="product in cart" :key="product.code">
                            <v-list-item-title>
                                {{ getDiscountedPrice(product.price, product.discount) }} x {{ product.quantity }} item(s)
                            </v-list-item-title>
                            <v-list-item-subtitle> Total: {{ getTotalToPayPerProduct(product) }}</v-list-item-subtitle>
                            <v-divider></v-divider>
                        </v-list-item>

                        <div class="pa-2 ma-2 d-flex justify-center">
                            <v-btn color="blue" variant="outlined" @click="perpareForPayment">Pay {{ getTotalToPay()
                            }}€</v-btn>
                        </div>
                    </template>
                </v-stepper>
            </v-card>
        </v-dialog>

        <v-dialog v-model="warningDialogIsOpen" width="auto">
            <v-card>
                <div class="d-flex justify-center pa-3 ma-3">
                    <v-icon size="100" color="amber-accent-2">mdi-alert-circle-outline</v-icon>
                </div>
                <v-card-title>Please complete all the fields for the delivery address</v-card-title>
            </v-card>
        </v-dialog>

    </div>

    <v-snackbar :timeout="4000" :color="confirmation.success ? 'green-lighten-1' : 'red-lighten-1'" variant="tonal"
        v-model="confirmation.show">
        <v-icon>{{ confirmation.show ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline' }}</v-icon>
        {{ confirmation.message }}
    </v-snackbar>
</template>

<script>
import { mapStores } from 'pinia';
import { useAuthenticationStore } from '@/pinia-stores/authenticationStore';
import generalFunctionsMixin from '@/commons/mixins';
import { VStepper } from 'vuetify/labs/VStepper';

export default {
    name: 'CartPage',
    mixins: [generalFunctionsMixin],
    components: {
        VStepper,
    },
    data() {
        return {
            cart: [],
            loadingData: true,
            confirmation: {
                show: false,
                success: true,
                message: ""
            },
            warningDialogIsOpen: false,
            rules: {
                required: value => !!value || 'This field is required',
            },
            // stepper:
            currentStepNo: 1,
            steps: ["Order details", "Delivery address", "Confirm order"],
            deliveryAddress: {
                city: "",
                street: "",
                number: null,
                zipCode: null,
                floor: null,
                apartmentNumber: null
            },
            addressAlreadyDefined: false,
        }
    },
    async mounted() {
        this.loadingData = true;
        await this.loadShoppingCart();
        this.loadingData = false;

        await this.loadAddressOfCurrentUser();

        console.log(this.convertDateTimeToString(new Date()))
    },
    computed: {
        ...mapStores(useAuthenticationStore)
    },
    watch: {
        warningDialogIsOpen(newValue) {
            if (!newValue) return;
            setTimeout(() => (this.warningDialogIsOpen = false), 3000)
        }
    },
    methods: {
        loadShoppingCart() {
            return new Promise(resolve => {
                this.axios.get(`users/${this.authenticationStore.user.id}/shoppingCarts`)
                    .then(response => this.cart = response.data)
                    .catch(error => console.error(error))
                    .finally(() => resolve());
            })
        },
        loadAddressOfCurrentUser() {
            return new Promise(resolve => {
                this.axios.get(`users/${this.authenticationStore.user.id}/address`)
                    .then(response => {
                        this.deliveryAddress = response.data
                        this.addressAlreadyDefined = true;
                    })
                    .catch(() => this.addressAlreadyDefined = false)
                    .finally(() => resolve());
            })
        },
        removeFromCart(productCode, index, showConfirmation = true) {
            return new Promise(resolve => {
                this.axios.delete(`users/${this.authenticationStore.user.id}/shoppingCarts/${productCode}`)
                    .then(() => {
                        this.cart.splice(index, 1);
                        this.confirmation = {
                            show: showConfirmation,
                            success: true,
                            message: "Product removed from cart successfully"
                        }
                    })
                    .catch(error => {
                        console.error(error)
                        this.confirmation.show = showConfirmation;
                        this.confirmation.success = false;
                        this.confirmation.message = 'An error occured. Please try again';
                    })
                    .finally(() => {
                        resolve()
                    });
            })
        },
        moveToFavorites(productCode, index) {
            return new Promise(resolve => {
                this.axios.post(`users/${this.authenticationStore.user.id}/favorites`, { productCode: productCode })
                    .then(async () => {
                        await this.removeFromCart(productCode, index, false);
                        this.confirmation = {
                            show: true,
                            success: true,
                            message: "Product moved to favorites successfully"
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        this.confirmation = {
                            show: true,
                            success: false,
                            message: "An error occured. Please try again"
                        }
                    })
                    .finally(() => {
                        resolve()
                    });

            })
        },
        getTotalToPay() {
            const sum = this.cart.reduce((acc, item) => {
                return acc + this.getDiscountedPrice(item.price, item.discount) * item.quantity;
            }, 0)
            return sum;
        },
        getTotalToPayPerProduct(product) {
            return this.getDiscountedPrice(product.price, product.discount) * product.quantity;
        },
        async perpareForPayment() {
            let formValidation = await this.$refs.form.validate();
            if (formValidation.valid) {
                await this.saveDeliveryAddress();
                let products = this.generateProductsArray();
                let orderDetails = this.generateOrderDetails();
                await this.redirectToPayment(products, orderDetails);
            } else {
                this.warningDialogIsOpen = true;
            }
        },
        saveDeliveryAddress() {
            let method;
            let url;
            if (this.addressAlreadyDefined) {
                method = 'PUT';
                url = `/addresses/${this.deliveryAddress.id}`;
            } else {
                method = 'POST';
                url = `/users/${this.authenticationStore.user.id}/address`;
            }

            return new Promise(resolve => {
                this.axios({
                    method: method,
                    url: url,
                    data: this.deliveryAddress
                })
                    .then(response => console.log(response.data))
                    .catch(error => console.log(error))
                    .finally(() => resolve());
            })

        },
        generateProductsArray() {
            let productsArray = [];
            for (let product of this.cart) {
                productsArray.push({
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: product.name
                        },
                        unit_amount: Math.round(this.getDiscountedPrice(product.price, product.discount) * 100)
                    },
                    quantity: product.quantity
                })
            }
            return productsArray;
        },
        generateOrderDetails() {
            const orderDetails = {
                userId: this.authenticationStore.user.id,
                orderDateTime: this.convertDateTimeToString(new Date()),
                products: this.cart.map(p => `${p.code},${p.size},${p.quantity}`).join(";"),
                amount: this.getTotalToPay()
            }
            return orderDetails;
        },
        redirectToPayment(products, orderDetails) {
            return new Promise(resolve => {
                this.axios.post("/create-checkout-session", { lineItems: products, orderDetails: orderDetails })
                    .then(response => response.data)
                    .then(data => {
                        window.location.href = data.url;
                    })
                    .catch(error => console.error(error))
                    .finally(() => resolve());
            })
        }
    }
}
</script>