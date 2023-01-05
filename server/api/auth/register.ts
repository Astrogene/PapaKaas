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
            const token = jwt.sign({
                id: user_new.id,
                auth_level: user_new.role
            }, runtimeConfig.secret, { expiresIn: '1h' });
            return token
        }
    }
    return null;

});