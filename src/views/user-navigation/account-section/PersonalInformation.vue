<template>
    <div class="page_container">
        <v-form class="custom_form" @submit.prevent="submitForm" ref="form">
            <v-row>
                <v-col>
                    <v-text-field :readonly="!editMode" :class="!editMode ? 'disabled_input' : ''" label="Name"
                        variant="outlined" prepend-inner-icon="mdi mdi-account" v-model="user.name"
                        :rules="[rules.required]"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field :readonly="!editMode" :class="!editMode ? 'disabled_input' : ''" label="Surname"
                        variant="outlined" prepend-inner-icon="mdi mdi-account" v-model="user.surname"
                        :rules="[rules.required]"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field :readonly="!editMode" :class="!editMode ? 'disabled_input' : ''" label="Phone number"
                        variant="outlined" prepend-inner-icon="mdi mdi-phone" v-model="user.phoneNumber"
                        :rules="[rules.required]"></v-text-field>
                </v-col>
                <v-col>
                    <!-- TODO: should be verified first in order to be changed -->
                    <v-text-field readonly class="disabled_input" label="Email"
                        type="email" variant="outlined" prepend-inner-icon="mdi mdi-email" v-model="user.email"
                        :rules="[rules.required]"></v-text-field>
                </v-col>
            </v-row>

            <div class="ma-2 pa-2 text-h6">Address</div>
            <v-divider class="mb-4"></v-divider>
            <v-row>
                <v-col>
                    <v-text-field :readonly="!editMode" :class="!editMode ? 'disabled_input' : ''" label="City"
                        variant="outlined" v-model="user.address.city" :rules="[rules.required]"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field :readonly="!editMode" :class="!editMode ? 'disabled_input' : ''" label="Street"
                        variant="outlined" v-model="user.address.street" :rules="[rules.required]"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field :readonly="!editMode" :class="!editMode ? 'disabled_input' : ''" label="Number"
                        variant="outlined" v-model="user.address.number" :rules="[rules.required]"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field :readonly="!editMode" :class="!editMode ? 'disabled_input' : ''" label="Zip code"
                        variant="outlined" v-model="user.address.zipCode" :rules="[rules.required]"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field :readonly="!editMode" :class="!editMode ? 'disabled_input' : ''" label="Floor"
                        variant="outlined" v-model="user.address.floor" :rules="[rules.required]"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field :readonly="!editMode" :class="!editMode ? 'disabled_input' : ''" label="Apartment number"
                        variant="outlined" prepend-inner-icon="mdi mdi-email" v-model="user.address.apartmentNumber"
                        :rules="[rules.required]"></v-text-field>
                </v-col>
            </v-row>

            <div class="ma-2 pa-2 text-h6">Change password</div>
            <v-divider class="mb-4"></v-divider>
            <v-row>
                <v-col>
                    <v-text-field :readonly="!editMode" :class="!editMode ? 'disabled_input' : ''" label="New password"
                        :type="showPassword ? 'text' : 'password'" variant="outlined"
                        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append-inner="showPassword = !showPassword" v-model="user.password"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field :readonly="!editMode" :class="!editMode ? 'disabled_input' : ''"
                        label="Confirm new password" type="password" variant="outlined" :rules="[rules.passwordsMatch]"
                        v-model="confirmPassword"></v-text-field>
                </v-col>
            </v-row>

            <div v-if="editMode">
                <v-btn class="mr-3" type="submit" variant="tonal" color="teal-darken-1">Save</v-btn>
                <v-btn variant="tonal" @click="editMode = false">Cancel</v-btn>
            </div>
            <v-btn v-else variant="tonal" @click="editMode = true">Edit info</v-btn>

        </v-form>
    </div>

    <v-snackbar :timeout="4000" :color="confirmation.success ? 'green-lighten-1' : 'red-lighten-1'" variant="tonal"
        v-model="confirmation.show">
        <v-icon>{{ confirmation.success ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline' }}</v-icon>
        {{ confirmation.message }}
    </v-snackbar>
</template>

<script>
import { mapStores } from 'pinia';
import { useAuthenticationStore } from '@/pinia-stores/authenticationStore';
import { getAuth, updateEmail, updatePassword } from '@firebase/auth';
export default {
    name: "PersonalInformationPage",
    data() {
        return {
            rules: {
                required: value => !!value || 'This field is required',
                passwordsMatch: value => value == this.user.password || 'Passwords do not match',
            },
            user: {},
            showPassword: false,
            confirmPassword: "",
            editMode: false, 
            confirmation: {
                success: true,
                show: false,
                message: ""
            },
            oldEmail: "",
            auth: getAuth()
        }
    },
    computed: {
        ...mapStores(useAuthenticationStore)
    },
    async beforeMount() {
        this.user = this.authenticationStore.user;
        this.user.password = "";
        this.user.address = {
            city: "",
            street: "",
            number: "",
            zipCode: "",
            floor: "",
            apartmentNumber: ""
        }
        this.oldEmail = this.user.email;
        await this.loadUserAddress();
    },
    methods: {
        async submitForm() {
            let formValidation = await this.$refs.form.validate();
            if (formValidation.valid) {
                // TODO: firebase doesn't let me change an email if it hasn't been verified
                if(this.user.email != this.oldEmail) {
                    await this.updateUserEmail(this.user.email);
                }

                if(this.user.password) {
                    await this.updateUserPassword(this.user.email, this.user.password);
                } else {
                    delete this.user.password;
                }

                await this.updateUser(this.user);

                this.editMode = false;
            }
        },
        loadUserAddress() {
            return new Promise(resolve => {
                this.axios.get(`/users/${this.user.id}/address`)
                    .then(response => response.data)
                    .then(data => this.user.address = data)
                    .catch(error => console.error(error))
                    .finally(() => resolve());
            })
        },
        async updateUserEmail(email) {
            updateEmail(this.auth.currentUser, email)
            .then(() =>{
                console.log("email updated")
            })
            .catch(error => {
                console.error("email couldn't be updated: ", error)
                this.user.email = this.oldEmail;
            })
        },
        async updateUserPassword(email, newPassword) {
            updatePassword(this.auth.currentUser, newPassword)
            .then(() => {
                console.log("password updated")
            })
            .catch(error => {
                console.error("password couldn't be updated: ", error)
                delete this.user.password;
            })
        },
        updateUser(user) {
            return new Promise(resolve => {
                this.axios.put(`/users/${user.id}`, user)
                    .then(() => {
                        this.confirmation = {
                            show: true,
                            success: true,
                            message: "Your data has been updated!"
                        }
                    })
                    .catch(error => {
                        this.confirmation = {
                            show: true,
                            success: false,
                            message: "An error occured. Please try again"
                        }
                        console.error(error);
                    })
                    .finally(() => resolve());
            })
        }
    }
}
</script>

<style scoped>
.disabled_input {
    color: gray;
    pointer-events: none;
}
</style>