import Users from '~/models/Users';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const body = await readBody(event);
  const user: any = await Users.findOne({
    where: {
      username: body.username,
    },
  });
  if (user) {
    if (user.isValidPassword(body.password)) {
      const jwt_access = jwt.sign(
        {
          id: user.id,
          auth_level: user.role,
          name: user.username,
        },
        runtimeConfig.secret,
        { expiresIn: '10h' }
      );
      return {jwt_access};
    }
  }
  if (body.username == runtimeConfig.username && body.password == runtimeConfig.password) {
    const jwt_access = jwt.sign(
      {
        id: -2,
        auth_level: 'ADMIN',
        name: 'Admin',
      },
      runtimeConfig.secret,
      { expiresIn: '10h' }
    );
    return {jwt_access};
  }
  return null;
});
