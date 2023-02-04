import jwt from 'jsonwebtoken';
import Users from '~~/models/Users';

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
        } 
      }
    );
    if (typeof id !== "undefined") {
      if (id == -2) {
        event.context.auth = {
          id: -2,
          auth_level: 'ADMIN',
          name: 'Admin',
        };
      }
      else {
        user = await Users.findOne({ where: { id: id } });
        if (user) {
          event.context.auth = {
            id: id,
            auth_level: (user as any).role,
            name: (user as any).username,
          };
        }
      }
    }
  }
});
