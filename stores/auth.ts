const baseUrl = '/api/auth'
export const useAuth = defineStore('auth', {
    state: () => {
        return {
            jwt_access: '',
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
                .then((response: any) => {
                    /* Update Pinia state */
                    if (response) {
                        this.jwt_access = response.jwt_access
                    }
                    else{
                        return
                    }
                })
                .catch(error => { throw error })
            await this.setUser()
            alert(this.jwt_access)
        },
        logout() {
            this.jwt_access = ''
        },
        async register(registerForm: any) {
            await $fetch(`${baseUrl}/register`, {
                method: 'POST',
                body: registerForm
            })
                .then((response) => {
                    if (response) {
                        this.jwt_access = response.jwt_access
                    }
                })
                .catch(error => { throw error })
            await this.setUser()
        },
        async setUser() {
            let user_id = -1, role = '', name = '', loggedIn = false
            await $fetch('/api/user/get-user', {
                method: 'POST',
                headers: {
                    authorization: this.jwt_access
                },
            }).then((response) => {
                if (response && response.user_id && response.auth_level && response.name){
                    user_id = response.user_id 
                    role = response.auth_level
                    name = response.name
                    loggedIn = true
                }
            })
            this.user.id = user_id
            this.user.role = role
            this.user.name = name
            this.user.loggedIn = loggedIn
        }
    },
    persist: {
        paths: ['jwt_access']
    },
})