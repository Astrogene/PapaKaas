import jwt from 'jsonwebtoken';
import Users from '~~/models/Users';
import { useAuthStore } from '~~/stores/auth';

export default defineEventHandler(async (event) => {
  if (event.node.req.headers.authorization) {
    const auth = event.node.req.headers.authorization.slice(
      event.node.req.headers.authorization.indexOf(' ') + 1
    );
    let id, user;
    jwt.verify(
      auth,
      useRuntimeConfig().secret,
      async function (err: any, decoded: any) {
        if (decoded) {
          id = decoded.id;
        } else if (err.name == 'TokenExpiredError') {
          await useAuthStore().refreshToken()      
          return;
        } else {
          return;
        }
      }
    );
    if (id && id != -2) {
      user = await Users.findOne({ where: { id: id } });
      if (user) {
        event.context.auth = {
          id: id,
          auth_level: (user as any).role,
          name: (user as any).username,
        };
      }
    } else {
        event.context.auth = {
          id: -1,
          auth_level: '',
          name: '',
        };
    }
    if (id == -2) {
      event.context.auth = {
        id: -2,
        auth_level: 'ADMIN',
        name: 'Admin',
      };
    }
  }
});
