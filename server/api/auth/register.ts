import { Users } from '~/models/database'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    console.log("Registering new user")
    const body = await readBody(event);
    const user = await Users.findOne({
        where: {
            username: body.username
        }
    });
    if (!user) {
        if (body.password && body.username) {
            const user_new: any = await Users.create({
                username: body.username,
                password: body.password,
            })
            const jwt_access = jwt.sign({
                id: user.id,
            }, runtimeConfig.secret, { expiresIn: '1m' });
            const jwt_refresh = jwt.sign({
                id: user.id,
                auth_level: user.role
            }, runtimeConfig.secret, { expiresIn: '5h' });
            const res = {
                jwt_access: jwt_access,
                jwt_refresh: jwt_refresh
            }
            return res
        }
    }
    return null;

});