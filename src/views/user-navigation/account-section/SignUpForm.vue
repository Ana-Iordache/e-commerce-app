<template>
    <v-form class="form_container" @submit.prevent="submitForm" ref="form">
        <h3 class="form_title">Create an account</h3>
        <v-text-field label="Name" variant="outlined" prepend-inner-icon="mdi mdi-account" v-model="user.name"
            :rules="[rules.required]"></v-text-field>
        <v-text-field label="Surname" variant="outlined" prepend-inner-icon="mdi mdi-account" v-model="user.surname"
            :rules="[rules.required]"></v-text-field>
        <v-text-field label="Phone number" variant="outlined" prepend-inner-icon="mdi mdi-phone" v-model="user.phoneNumber"
            :rules="[rules.required]"></v-text-field>
        <v-text-field label="Email" type="email" variant="outlined" prepend-inner-icon="mdi mdi-email" v-model="user.email"
            :rules="[rules.required]"></v-text-field>
        <v-text-field label="Password" :type="showPassword ? 'text' : 'password'" variant="outlined"
            prepend-inner-icon="mdi mdi-lock" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword" v-model="user.password"
            :rules="[rules.required]"></v-text-field>
        <v-btn type="submit" variant="tonal" color="teal-darken-1">Register</v-btn>


        <v-dialog v-model="showDialog" persistent width="40%">
            <v-card color="blue-grey-lighten-4" class="pa-3 text-center">
                <v-card-title>Creating account</v-card-title>
                <v-card-text>
                    <v-progress-circular indeterminate color="white" size="small" width="3" class="mr-2"></v-progress-circular>
                    Please wait...
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-form>
</template>

<script>

export default {
    name: "SignUpForm",
    data() {
        return {
            showPassword: false,
            showDialog: false,
            rules: {
                required: value => !!value || 'This field is required',
            },
            user: {
                name: "",
                surname: "",
                phoneNumber: "",
                email: "",
                password: "",
                isAdmin: false
            }
        }
    },
    methods: {
        async submitForm() {
            let formValidation = await this.$refs.form.validate();
            if (formValidation.valid) {
                this.showDialog = true;
                await this.signUpUser();
                this.showDialog = false;
            }
        },
        signUpUser() {
            return new Promise(resolve => {
                this.axios.post("/users", this.user)
                    .then(() => {
                        // Redirect to home if sigup is successfull
                        this.$router.push('/home');
                    })
                    .catch(error => console.error(error))
                    .finally(() => resolve());
            })
        }
    }
}
</script>