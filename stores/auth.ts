import { defineStore } from 'pinia'
import jwt from 'jsonwebtoken'

const baseUrl = '/api/auth'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => {
        return {
            jwt_access: '',
            jwt_refresh: '',
            user: {
                loggedIn: false,
                id: -1,
                role: '',
                name: ''
            }
        }
    },
    actions: {
        async login(loginForm: any) {
            await $fetch(`${baseUrl}/login`, {
                method: 'POST',
                body: loginForm
            })
                .then(response => {
                    /* Update Pinia state */
                    if (response) {
                        this.jwt_access = response.jwt_access
                        this.jwt_refresh = response.jwt_refresh
                    }
                })
                .catch(error => { throw error })
            await this.setUser()
        },
        logout() {
            this.jwt_access = ''
            this.jwt_refresh = ''
        },
        async register(registerForm: any) {
            await $fetch(`${baseUrl}/register`, {
                method: 'POST',
                body: registerForm
            })
                .then(response => {
                    if (response) {
                        this.jwt_access = response.jwt_access
                        this.jwt_refresh = response.jwt_refresh
                    }
                })
                .catch(error => { throw error })
            await this.setUser()
        },
        async refreshToken(): Promise<any> {
            await $fetch(`${baseUrl}/refresh`, {
                method: 'POST',
                body: {
                    refresh_token: this.jwt_refresh
                }
            }).then(response => {
                if (response) {
                    this.jwt_access = response.access_token
                    return new Promise(resolve => resolve(true))
                }
                return new Promise(resolve => resolve(false))

            }).catch(error => { throw error })
            await this.setUser()
        },
        async setUser() {
            let user_id = -1, role = '', name = '', loggedIn = false
            await $fetch('/api/user/get-user', {
                method: 'POST',
                headers: {
                    authorization: this.jwt_access
                }
            }).then(response => {
                if (response && response.user_id && response.auth_level && response.name && !response.expired){
                    user_id = response.user_id 
                    role = response.auth_level
                    name = response.name
                    loggedIn = true
                }
            })
            if (!loggedIn && this.jwt_refresh){
                if (await this.refreshToken()){
                    this.setUser()
                }
                return
            }
            this.user.id = user_id
            this.user.role = role
            this.user.name = name
            this.user.loggedIn = loggedIn
        }
    },
    persist: {
        paths: ['jwt_access', 'jwt_refresh']
    }
})