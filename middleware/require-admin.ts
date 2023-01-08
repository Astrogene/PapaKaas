import { useAuthStore } from "~~/stores/auth"

export default defineNuxtRouteMiddleware(async (to) => {
    const authStore = useAuthStore()
    if (!(authStore.user.role === "ADMIN")) {
        return abortNavigation()
    }
})