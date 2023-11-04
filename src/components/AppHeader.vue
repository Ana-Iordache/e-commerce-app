<template>
    <v-toolbar class="sticky_header">
        <v-toolbar-title>
            <router-link :to="'/home'">
                {{ appTitle }}
            </router-link>
        </v-toolbar-title>
        <!-- <v-spacer></v-spacer> -->
        <v-toolbar-items class="hidden-xs-only">
            <v-btn flat v-for="item in userNavigationItems" :key="item.title" :to="item.path"
                @click="item.title == 'Logout' ? logoutUser() : ''">
                <v-icon left dark>{{ item.icon }}</v-icon>
                {{ item.title }}
            </v-btn>
        </v-toolbar-items>

        <template v-slot:extension>
            <v-tabs v-model="currentTab" align-tabs="title">
                <v-tab v-for="item in appNavigationItems" :key="item" :value="item" :to="item.path">
                    {{ item.title }}
                </v-tab>
            </v-tabs>
        </template>
    </v-toolbar>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';

export default {
    name: "AppHeader",
    data() {
        return {
            appTitle: 'E-commerce App',
            userNavigationItems: [
                { title: 'My account', path: '/account', icon: 'mdi-account-circle' },
                { title: 'Favorites', path: '/favorites', icon: 'mdi-heart' },
                { title: 'Shopping cart', path: '/cart', icon: 'mdi-shopping' },
                { title: 'Logout', path: '/logout', icon: 'mdi-logout' }
            ],
            appNavigationItems: [
                { title: 'Home', path: '/home' },
                { title: 'New in', path: '/newin' },
                { title: 'Clothing', path: '/clothing' },
                { title: 'Shoes', path: '/shoes' },
                { title: 'Accessories', path: '/accessories' },
            ],
            currentTab: "",
            userIsLoggedIn: false,
            auth: getAuth(),
        }
    },
    mounted() {
        this.auth = getAuth();
        // console.log(this.auth);
        onAuthStateChanged(this.auth, user => {
            this.userIsLoggedIn = user ? true : false;
            this.userNavigationItems[3] = this.userIsLoggedIn ? { title: 'Logout', path: '/logout', icon: 'mdi-logout' } : { title: 'Login', path: '/connect', icon: 'mdi-login' };
            // console.log(this.userIsLoggedIn);
        })
    },
    methods: {
        logoutUser() {
            signOut(this.auth).then(() => {
                console.log("User signed out.");
            })
        }
    }
}
</script>

<style>
a {
    text-decoration: none;
    color: #000000DE;
}

.sticky_header {
    position: sticky !important;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}
</style>