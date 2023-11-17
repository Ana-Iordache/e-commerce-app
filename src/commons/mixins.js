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

        /**
         * 
         * @param {Date} datetime 
         * @returns String
         */
        convertDateTimeToString(datetime) {
            // Extract date components
            const year = datetime.getFullYear();
            const month = String(datetime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(datetime.getDate()).padStart(2, '0');
            const hours = String(datetime.getHours()).padStart(2, '0');
            const minutes = String(datetime.getMinutes()).padStart(2, '0');
            const seconds = String(datetime.getSeconds()).padStart(2, '0');

            // Format the date string
            const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            return formattedDate;
        }
    }
}

export default generalFunctionsMixin;