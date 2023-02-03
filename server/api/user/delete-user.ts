import Users from '~~/models/Users';

export default defineEventHandler(async (event) => {
    console.log(event.context.auth)
    if (event.context.auth.auth_level == 'ADMIN') {
        const body = await readBody(event);
        if (body) {
            await Users.destroy({
                where: {
                    id: body
                }
            }).then(() => {
                return true
            });
        }
    }
});