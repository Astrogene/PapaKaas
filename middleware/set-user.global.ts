export default defineNuxtRouteMiddleware(async (to) => {
    const authStore = useAuth()
    if (authStore.jwt_access){
        const { data } = await useAuthFetch('/api/auth/expired');
        if (data.value) {
            authStore.logout()
            return navigateTo('/auth/login')
        }
        if (!authStore.user.loggedIn){
            await authStore.setUser()
        }
    }
})