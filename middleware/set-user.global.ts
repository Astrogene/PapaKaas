export default defineNuxtRouteMiddleware(async (to) => {
    const authStore = useAuth()
    if (!authStore.user.loggedIn && authStore.jwt_access && authStore.jwt_refresh){
        await authStore.setUser()
    }
})