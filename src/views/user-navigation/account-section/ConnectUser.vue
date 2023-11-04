<template>
    <div class="page_container">
        <div class="form_wrapper">
            <v-tabs fixed-tabs bg-color="" v-model="currentTab">
                <v-tab value="tab-1">
                    Login
                </v-tab>
                <v-tab value="tab-2">
                    Sign up
                </v-tab>
            </v-tabs>

            <v-window v-model="currentTab" class="window_container">
                <v-window-item value="tab-1">
                    <LoginForm v-if="currentTab === 'tab-1'" />
                </v-window-item>
                <v-window-item value="tab-2">
                    <SignUpForm v-if="currentTab === 'tab-2'" />
                </v-window-item>
            </v-window>
        </div>
    </div>
</template>

<script>
import SignUpForm from "./SignUpForm.vue";
import LoginForm from "./LoginForm.vue";


export default {
    name: "ConnectUser",
    components: {
        SignUpForm,
        LoginForm,
    },
    data() {
        return {
            currentTab: null,
        }
    }
}
</script>

<style scoped>
.form_container {
    display: flex;
    flex-direction: column;
    padding: 2rem 5rem;
    
}
.window_container {
    background-color: rgb(238, 238, 238);
    border-radius: 0 0 1rem 1rem;
}

.form_wrapper {
    width: 50%;
    min-width: fit-content;
}

.v-tabs {
    border-top: 1px solid rgb(238, 238, 238);
    border-right: 1px solid rgb(238, 238, 238);
    border-left: 1px solid rgb(238, 238, 238);
    border-radius: 1rem 1rem 0 0;
}
</style>