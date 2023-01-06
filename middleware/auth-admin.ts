import jwt from 'jsonwebtoken'

export default defineNuxtRouteMiddleware((to) => {
    if (process.client){
        return abortNavigation()
    }
    if (!to.query) {
        return abortNavigation()
    }
    else {
        const token: any = to.query.token
        if (typeof token === typeof "") {
            const token_decoded: any = jwt.verify(token, useRuntimeConfig().secret)
            if (token_decoded.auth_level === "ADMIN") {
                return true
            }
            else {
                return abortNavigation()
            }
        }
    }
    return abortNavigation()
})