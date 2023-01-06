import { defineStore } from 'pinia'
import jwt from 'jsonwebtoken'

const baseUrl = '/api/auth'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        token: JSON.parse(localStorage.getItem('token') || '{}'),
    }),
    actions: {
        async login(loginForm: any) {
            await $fetch(`${baseUrl}/login`, {
                method: 'POST',
                body: loginForm
            })
                .then(response => {
                    /* Update Pinia state */
                    this.token = response
                    /* Store user in local storage to keep them logged in between page refreshes */
                    localStorage.setItem('token', JSON.stringify(this.token))
                })
                .catch(error => { throw error })
        },
        logout() {
            this.token = null
            localStorage.removeItem('token')
        },
        async register(registerForm: any) {
            await $fetch(`${baseUrl}/register`, {
                method: 'POST',
                body: registerForm
            })
                .then(response => {
                    this.token = response
                    localStorage.setItem('token', JSON.stringify(this.token))
                })
                .catch(error => { throw error })
        }
    }
})