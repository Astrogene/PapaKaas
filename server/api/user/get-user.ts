export default defineEventHandler(async (event) => {
    return { user_id: event.context.auth.id, 
        auth_level: event.context.auth.auth_level,
        name: event.context.auth.name,
        expired: event.context.auth.expired  };
});