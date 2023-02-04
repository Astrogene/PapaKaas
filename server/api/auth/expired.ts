import jwt from 'jsonwebtoken';
export default defineEventHandler(async (event) => {
    if (event.node.req.headers.authorization) {
        const auth = event.node.req.headers.authorization.slice(
            event.node.req.headers.authorization.indexOf(' ') + 1
        );
        jwt.verify(
            auth,
            useRuntimeConfig().secret,
            async function (err: any,) {
                if (err && err.name == 'TokenExpiredError') {
                    return true
                }
            }
        );
        return false
    }
})