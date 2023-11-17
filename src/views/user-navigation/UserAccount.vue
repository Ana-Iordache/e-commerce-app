<template>
    <div class="d-flex flex-grow-1">
        <div>
            <v-list-item>Hi, {{ currentUser }}</v-list-item>
            <v-divider></v-divider>
            <v-list-item link title="Orders" @click="setCurrentListItem('Orders')" :class="currentListItem == 'Orders' ? 'active' : ''"></v-list-item>
            <v-list-item link title="Personal information" @click="setCurrentListItem('PersonalInformation')" :class="currentListItem == 'PersonalInformation' ? 'active' : ''"></v-list-item>
        </div>
        <div class="flex-grow-1 background_content">
            <Orders v-if="currentListItem == 'Orders'"></Orders>
            <PersonalInformation v-else-if="currentListItem == 'PersonalInformation'"></PersonalInformation>
        </div>
    </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useAuthenticationStore } from '@/pinia-stores/authenticationStore';
import Orders from './account-section/Orders.vue';
import PersonalInformation from './account-section/PersonalInformation.vue';

export default {
    name: 'UserAccountPage',
    components: {
        Orders,
        PersonalInformation
    },
    computed: {
        ...mapStores(useAuthenticationStore),
        currentUser() {
            return `${this.authenticationStore.user.name} ${this.authenticationStore.user.surname}`;
        }
    },
    data() {
        return {
            currentListItem: "Orders"
        }
    },
    methods: {
        setCurrentListItem(item) {
            console.log(item)
            this.currentListItem = item;
            
            console.log(this.currentListItem)
        }
    }
}
</script>

<style scoped>
.active {
    background-color: whitesmoke;
}

.background_content {
    background-color: whitesmoke;
}
</style>