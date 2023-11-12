const generalFunctionsMixin = {
    data() {
        return {
            price: 0,
            discount: 0,
        }
    },
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },

        getDiscountedPrice(price, discount) {
            return price - discount / 100 * price;
        },
    }
}

export default generalFunctionsMixin;