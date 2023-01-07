import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let new_access: string = '';
    if (body.refresh_token){
        let id, auth_level;
        jwt.verify(body.refresh_token, useRuntimeConfig().secret, function(err:any, decoded:any){
            if (decoded){
                id = decoded.id
                auth_level = decoded.auth_level
                new_access = jwt.sign({
                    id: id,
                    auth_level: auth_level
                }, useRuntimeConfig().secret, { expiresIn: '1m' });
            }
        })
    }
    return { access_token: new_access }
})