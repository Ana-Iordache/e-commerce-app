<template>
    <v-form class="form_container" @submit="submitForm" ref="form">
        <h3 class="form_title">Login</h3>
        <v-text-field label="Email" type="email" variant="outlined" prepend-inner-icon="mdi mdi-email"
            :rules="[rules.required]"></v-text-field>
        <v-text-field label="Password" :type="showPassword ? 'text' : 'password'" variant="outlined"
            prepend-inner-icon="mdi mdi-lock" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword" :rules="[rules.required]"></v-text-field>
        <v-btn type="submit" variant="tonal" color="teal-darken-1">Login</v-btn>
    </v-form>
</template>

<script>
export default {
    name: "LoginForm",
    data() {
        return {
            showPassword: false,
            rules: {
                required: value => !!value || 'This field is required',
            },
        }
    },
    methods: {
        async submitForm(e) {
            e.preventDefault();
            let formValidation = await this.$refs.form.validate();
            if (formValidation.valid) {
                console.log("TODO perfom login")
            }
        }
    }
}
</script>

<style></style>