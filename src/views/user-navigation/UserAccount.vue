<template>
    Account info for {{ currentUser }}
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