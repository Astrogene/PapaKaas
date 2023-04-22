import { Presses } from "~/server/plugins/press";
export default defineEventHandler(async (event) => {
    if (event.context.auth.auth_level == 'ADMIN') {
        const body = getQuery(event)
        let press = Presses.find(i => i.press_data.id == body.id)
        if (press != undefined){
            if (!press.started == true){
                press.started = true
                press.socket.write(`F${body.factor}H${((body.hours as any)*60 + (body.minutes as any))}S${press.press_data.id}E`)
            }
        }        
    }
});