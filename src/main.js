import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

const app = createApp(App);

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    ssr: true,
})


// Axios
import axios from 'axios';
import config from '../config.json';
app.config.globalProperties.axios = axios;
const baseUrlAxios = `http://${config.BACKEND_HOST}:${config.BACKEND_PORT}`;
axios.defaults.baseURL = baseUrlAxios;

// Initialize Firebase for auth
// NOTE: you should create a file 'auth.js' in 'firebase-auth' folder with details metioned in 'auth_template.js'
import initilizeFirebase from './firebase-auth/auth';
initilizeFirebase();

// Pinia
import { createPinia } from 'pinia';
const pinia = createPinia();

app.use(router).use(vuetify).use(pinia).mount('#app')
