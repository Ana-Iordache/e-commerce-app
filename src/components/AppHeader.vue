<template>
    <v-toolbar>
        <v-toolbar-title>
            <!-- <router-link :to="'/'"> -->
                {{ appTitle }}
            <!-- </router-link> -->
        </v-toolbar-title>
        <!-- <v-spacer></v-spacer> -->
        <v-toolbar-items class="hidden-xs-only">
            <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
                <v-icon left dark>{{ item.icon }}</v-icon>
                {{ item.title }}
            </v-btn>
        </v-toolbar-items>

        <template v-slot:extension>
            <v-tabs v-model="currentTab" align-tabs="title">
                <v-tab v-for="item in submenuItems" :key="item" :value="item" :to="item.path">
                    {{ item.title }}
                </v-tab>
            </v-tabs>
        </template>
    </v-toolbar>
</template>

<script>
export default {
    name: "AppHeader",
    data() {
        return {
            appTitle: 'E-commerce App',
            menuItems: [
                { title: 'My account', path: '/account', icon: 'mdi-account-circle' },
                { title: 'Favorites', path: '/favorites', icon: 'mdi-heart' },
                { title: 'Shopping cart', path: '/cart', icon: 'mdi-shopping' }
            ],
            submenuItems: [
                { title: 'New in', path: '/newin' },
                { title: 'Clothing', path: '/clothing' },
                { title: 'Shoes', path: '/shoes' },
                { title: 'Accessories', path: '/accessories' },
            ],
            currentTab: ""
        }
    },
}
</script>