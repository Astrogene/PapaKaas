import { Users } from '../../../models/database'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    const body = await readBody(event);
    const user: any = await Users.findOne({
        where: {
            username: body.username
        }
    });
    if (user){
        if (user.isValidPassword(body.password)){
            const token = jwt.sign({
                id: user.id,
                auth_level: user.role
            }, runtimeConfig.secret, { expiresIn: '1h' });
            return token;
        }
    }
    return null;

});