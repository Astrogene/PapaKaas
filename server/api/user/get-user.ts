export default defineEventHandler(async (event) => {
    if (event.context.auth){
        return {
            user_id: event.context.auth.id,
            auth_level: event.context.auth.auth_level,
            name: event.context.auth.name
        };
    }
    return
});