<template>
    <v-form class="form_container" @submit.prevent="submitForm" ref="form">
        <v-text-field label="Email" type="email" variant="outlined" prepend-inner-icon="mdi mdi-email"
            :rules="[rules.required]" v-model="email"></v-text-field>

        <v-btn type="submit" variant="tonal" color="teal-darken-1">Reset password</v-btn>
    </v-form>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default {
    name: "ResetPasswordForm",
    emits: ['email-sent'],
    data() {
        return {
            email: "",
            rules: {
                required: value => !!value || 'This field is required',
            },
        }
    },
    methods: {
        async submitForm() {
            let formValidation = await this.$refs.form.validate();
            if (formValidation.valid) {
                await this.sendResetPasswordEmail(this.email);
            }
        },
        async sendResetPasswordEmail(email) {
            const auth = getAuth();
            sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("DEBUG email sent")
                this.$emit('email-sent', true)
            })
            .catch(error => {
                console.error(error);
                this.$emit('email-sent', false)
            });
        }
    }
}
</script>