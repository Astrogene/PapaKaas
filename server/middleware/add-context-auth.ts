import jwt from 'jsonwebtoken';
import { Users } from '~~/models/database'

export default defineEventHandler(async (event) => {
    if (event.node.req.headers.authorization) {
        const auth = event.node.req.headers.authorization.slice(event.node.req.headers.authorization.indexOf(' ') + 1)
        let id, user_name;
        let expired = false
        jwt.verify(auth, useRuntimeConfig().secret, function(err:any, decoded:any) {
            if (decoded){
                id = decoded.id
            }
            else if (err.name == 'TokenExpiredError'){
                expired = true
            }
            else{
                return
            }
        })
        if (id){
            user_name = await (await Users()).findOne({ where: { id: id } })
            event.context.auth = { id: id, auth_level: user_name.role, name: user_name.username, expired: expired};
        }
        else{
            event.context.auth = { id: -1, auth_level: '', name: '', expired: expired}
        }
    }
});