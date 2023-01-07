import { defineStore } from 'pinia'

const baseUrl = '/api/auth'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => {
        return {
            jwt_access: '',
            jwt_refresh: '',
            jwt_cookie: '',
            user_id: -1,
            user_role: '',
            user_name: ''
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
                        this.getUser()
                        const cookie = useCookie('refresh', { maxAge: 60 * 60})
                        if (cookie) {
                            cookie.value = this.jwt_refresh
                        }
                    }
                })
                .catch(error => { throw error })
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
                        this.getUser()
                        /*const cookie = useCookie('refresh', { maxAge: 60 * 60})
                        if (cookie) {
                            cookie.value = response.jwt_refresh
                        }*/
                    }
                })
                .catch(error => { throw error })
        },
        async getUser() {
            await $fetch(`/api/user/get-user`, {
                method: 'POST',
                headers: {
                    Authorization: this.jwt_access
                }
            }).then(response => {
                if (response && response.user_id != -1) {
                    if (response.expired) {
                        this.refreshToken().then(ret => {
                            if (ret) {
                                this.getUser()
                                return
                            }
                        })
                    }
                    this.user_id = response.user_id
                    this.user_role = response.auth_level
                    this.user_name = response.name
                }
            }).catch(error => { throw error })
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
        },
    },
    getters: {
        isLoggedIn(state) {
            if (state.user_id != -1) {
                return true
            }
        }
    },
    persist: true
})