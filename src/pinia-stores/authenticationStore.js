import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthenticationStore = defineStore('authentication', {
    state: () => ({
        user: null,
    }),
    actions: {
        async setCurrentUser(userEmail) {
            this.user = await this.getCurrentUser(userEmail);
            
            // console.log("DEBUG Current user pinia: ", this.user);
        },
        removeUser() {
            this.user = null;

            // console.log("DEBUG Current user pinia: ", this.user);
        },
        getCurrentUser(userEmail) {
            return new Promise(resolve => {
                axios.get(`/users/${userEmail}`)
                .then(response => response.data)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    console.error(error);
                    resolve(error);
                })
            })
        }
    }
})