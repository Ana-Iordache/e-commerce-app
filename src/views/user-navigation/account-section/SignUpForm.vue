<template>
    <v-form class="form_container">
        <h3 class="form_title">Create an account</h3>
        <v-text-field label="Name" variant="outlined" prepend-inner-icon="mdi mdi-account"></v-text-field>
        <v-text-field label="Surname" variant="outlined" prepend-inner-icon="mdi mdi-account"></v-text-field>
        <v-text-field label="Phone number" variant="outlined" prepend-inner-icon="mdi mdi-phone"></v-text-field>
        <v-text-field label="Email" type="email" variant="outlined" prepend-inner-icon="mdi mdi-email"></v-text-field>
        <v-text-field label="Password" :type="showPassword ? 'text' : 'password'" variant="outlined"
            prepend-inner-icon="mdi mdi-lock" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"></v-text-field>
        <v-btn variant="tonal" color="teal-darken-1">Register</v-btn>
    </v-form>
</template>

<script>
export default {
    name: "SignUpForm",
    data() {
        return {
            showPassword: false,
        }
    }
}
</script>