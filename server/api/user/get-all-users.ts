import { Users } from "~~/models/database";

export default defineEventHandler(async (event) => {
    console.log(event.context.auth.auth_level)
    if (event.context.auth.auth_level == "ADMIN" || event.context.auth.auth_level == "USER"){
        return await Users.findAll()
    }
});