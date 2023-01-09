import { Users } from "~~/models/database";

export default defineEventHandler(async (event) => {
    console.log(event.context.auth.auth_level)
    if (event.context.auth.auth_level == "ADMIN"){
        return await (await Users()).findAll()
    }
});