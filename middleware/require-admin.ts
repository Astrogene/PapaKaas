
export default defineNuxtRouteMiddleware(async (to) => {
    const authStore = useAuth()
    if (!(authStore.user.role === "ADMIN")) {
        return abortNavigation()
    }
})