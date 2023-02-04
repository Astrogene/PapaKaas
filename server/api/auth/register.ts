import Users from '~~/models/Users';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  console.log('Registering new user');
  const body = await readBody(event);
  const user = await Users.findOne({
    where: {
      username: body.username,
    },
  });
  if (!user) {
    if (body.password && body.username) {
      const user_new: any = await Users.create({
        username: body.username,
        password: body.password,
      });
      const jwt_access = jwt.sign(
        {
          id: user_new.id,
        },
        runtimeConfig.secret,
        { expiresIn: '1m' }
      );
      return {jwt_access};
    }
  }
  return null;
});
