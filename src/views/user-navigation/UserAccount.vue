<template>
    <div class="d-flex flex-grow-1">
        <div>
            <v-list-item>Hi, {{ currentUser }}</v-list-item>
            <v-divider></v-divider>
            <v-list-item link title="Orders"></v-list-item>
            <v-list-item link title="Personal information"></v-list-item>
        </div>
        <div style="background-color: whitesmoke;" class="flex-grow-1">

        </div>
    </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useAuthenticationStore } from '@/pinia-stores/authenticationStore';

export default {
    name: 'UserAccountPage',
    computed: {
        ...mapStores(useAuthenticationStore),
        currentUser() {
            return `${this.authenticationStore.user.name} ${this.authenticationStore.user.surname}`;
        }
    }
}
</script>