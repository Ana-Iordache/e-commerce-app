<template>
    <v-row>
        <v-col>
            <v-carousel hide-delimiter-background>
                <v-carousel-item v-for="image in product.images" :key="image" :src="image"></v-carousel-item>
            </v-carousel>
        </v-col>
        <v-col class="d-flex flex-column">
            <div class="mt-2">{{ product.name }}</div>
            <div class="mt-1">{{ product.price }}€</div>
            <div class="mt-2 me-2">
                <div>Description</div>
                <div> {{ product.description }}</div>
            </div>

            <div class="mt-2">
                <v-item-group selected-class="bg-grey-lighten-2">
                    <v-row>
                        <v-col v-for="(stock, index) in product.stock" :key="index" cols="12" sm="auto" md="auto" lg="auto">
                            <v-item v-slot="{ selectedClass, toggle }">
                                <v-btn :class="[selectedClass]" variant="outlined" @click="toggle">
                                    {{ stock.size }}
                                </v-btn>
                            </v-item>
                        </v-col>
                    </v-row>
                </v-item-group>
            </div>

            <v-btn class="mt-auto" prepend-icon="mdi-shopping">Add to cart</v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.carousel_content {
    width: auto;
}
</style>