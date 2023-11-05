const generalFunctionsMixin = {
    data() {
        return {

        }
    },
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
}

export default generalFunctionsMixin;