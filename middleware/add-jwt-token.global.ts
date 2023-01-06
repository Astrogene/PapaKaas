import { useAuthStore } from "~~/stores/auth"

export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) {
        return true
    }
    const { token } = useAuthStore();
    if (token && !to.query.token){
        const query = Object.assign({}, to.query);
        query.token = token
        return navigateTo({
            path: to.path,
            query: query
        })
    }
    else{
        return true
    }
})