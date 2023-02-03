import Users from '~~/models/Users';

export default defineEventHandler(async (event) => {
  if (event.context.auth.auth_level == 'ADMIN') {
    return await Users.findAll();
  }
});
