<template>
    <v-form class="form_container" @submit.prevent="submitForm" ref="form">
        <h3 class="form_title">Login</h3>
        <v-text-field label="Email" type="email" variant="outlined" prepend-inner-icon="mdi mdi-email"
            :rules="[rules.required]" v-model="user.email"></v-text-field>

        <div class="text-caption text-blue forgot_password_link" @click="dismissPasswordDialog(false)">
            Forgot password?
        </div>

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

        <v-dialog v-model="resetPassword.showForgotDialog" width="40%">
            <v-card color="blue-grey-lighten-5" class="pa-3 text-center">
                <v-card-title>Reset password</v-card-title>
                <v-card-text>
                    <ResetPasswordForm @email-sent="showConfirmation"></ResetPasswordForm>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-snackbar :timeout="4000" :color="resetPassword.emailSent ? 'green-lighten-1' : 'red-lighten-1'" variant="tonal" v-model="resetPassword.showEmailConfirmation">
            <v-icon>{{ resetPassword.emailSent ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline' }}</v-icon>
            {{ resetPassword.emailSent ? 'An email to reset your password has been sent' : 'Email to reset password couldn\'t be sent' }}
        </v-snackbar>
    </v-form>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ResetPasswordForm from "./ResetPasswordForm.vue";

export default {
    name: "LoginForm",
    components: {
        ResetPasswordForm
    },
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
            resetPassword: {
                showForgotDialog: false,
                showEmailConfirmation: false,
                emailSent: false,
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
        async submitForm() {
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
        },
        dismissPasswordDialog(dismiss) {
            this.resetPassword.showForgotDialog = !dismiss;
        },
        showConfirmation(emailSent) {
            this.dismissPasswordDialog(true);
            this.resetPassword.emailSent = emailSent;
            this.resetPassword.showEmailConfirmation = true;
        }
    }
}
</script>

<style scoped>
.forgot_password_link {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
}
</style>