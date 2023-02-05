
export default defineNuxtRouteMiddleware(async (to) => {
    const authStore = useAuth()
    console.log(authStore.user)
    if (!(authStore.user.role === "ADMIN")) {
        return abortNavigation()
    }
})