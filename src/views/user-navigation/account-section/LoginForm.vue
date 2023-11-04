<template>
    <v-form class="form_container" @submit="submitForm" ref="form">
        <h3 class="form_title">Login</h3>
        <v-text-field label="Email" type="email" variant="outlined" prepend-inner-icon="mdi mdi-email"
            :rules="[rules.required]" v-model="user.email"></v-text-field>
        <v-text-field label="Password" :type="showPassword ? 'text' : 'password'" variant="outlined"
            prepend-inner-icon="mdi mdi-lock" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword" :rules="[rules.required]"
            v-model="user.password"></v-text-field>
        <v-btn type="submit" variant="tonal" color="teal-darken-1">Login</v-btn>

        <v-dialog v-model="showErrorDialog" persistent width="40%">
            <v-card color="red-lighten-5" class="pa-3 text-center">
                <v-card-title>Login failed</v-card-title>
                <v-card-text>
                    {{ errorMessage }}
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-form>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
    name: "LoginForm",
    data() {
        return {
            user: {
                email: "",
                password: ""
            },
            showPassword: false,
            showErrorDialog: false,
            errorMessage: "",
            rules: {
                required: value => !!value || 'This field is required',
            },
        }
    },
    watch: {
        showErrorDialog(newValue) {
            if (!newValue)
                return;
            setTimeout(() => this.showErrorDialog = false, 4000);
        }
    },
    methods: {
        async submitForm(e) {
            e.preventDefault();
            let formValidation = await this.$refs.form.validate();
            if (formValidation.valid) {
                await this.loginUser(this.user);
            }
        },
        async loginUser(user) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then(async () => {
                    console.log("User logged in successfully in firebase: ", auth.currentUser);
                    // Redirect to home if login is successfull
                    this.$router.push('/home');
                })
                .catch(error => {
                    console.error(error);
                    switch (error.code) {
                        case 'auth/wrong-password':
                            this.errorMessage = "Incorrect password";
                            break;
                        case 'auth/user-not-found':
                            this.errorMessage = "No account found";
                            break;
                        default:
                            this.errorMessage = "Invalid credentials";
                            break;
                    }
                    
                    this.showErrorDialog = true;
                });
        }
    }
}
</script>

<style></style>