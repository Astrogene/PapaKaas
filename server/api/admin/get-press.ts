import { Presses } from "~/server/plugins/press";
export default defineEventHandler(async (event) => {
    if (event.context.auth.auth_level == 'ADMIN') {
        return Presses.find(i => i.press_data.id == getQuery(event).id)
    }
});