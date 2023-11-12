<template>
    favorites page
    {{ favorites }}
</template>

<script>
import { mapStores } from 'pinia';
import { useAuthenticationStore } from '@/pinia-stores/authenticationStore'

export default {
    name: 'FavoritesPage',
    data() {
        return {
            favorites: [],
        }
    },
    async mounted() {
        await this.loadFavorites();
    },
    computed: {
        ...mapStores(useAuthenticationStore)
    },
    methods: {
        loadFavorites() {
            return new Promise(resolve => {
                this.axios.get(`/users/${this.authenticationStore.user.id}/favorites`)
                    .then(response => response.data)
                    .then(data => this.favorites = data)
                    .catch(error => console.error(error))
                    .finally(() => resolve());
            })
        }
    }
}
</script>