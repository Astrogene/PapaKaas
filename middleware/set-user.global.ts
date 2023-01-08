import { useAuthStore } from "~~/stores/auth"


export default defineNuxtRouteMiddleware(async (to) => {
    const authStore = useAuthStore()
    if (!authStore.user.loggedIn && authStore.jwt_access && authStore.jwt_refresh){
        await authStore.setUser()
    }
})