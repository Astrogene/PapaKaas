import * as net from "net";
import * as fs from 'fs';
import * as path from "path";
type Press = {
    press_data: {
        id: number
        weights: number[]
        corrections: number[]
        t: number
        t_f: number
    }
    socket: any
    header: boolean
    cheese: {
        name: string
        factor: number
    }
    started: boolean
}
//TODO ADD FACTOR FOR MULTIPLYING TIME
export var Presses: Press[] = [];
export default defineNitroPlugin((nitroApp) => {

    var server = net.createServer();

    server.on("connection", (socket: any) => {
        console.log("Press connected")
        socket.on('data', function (chunk: any) {
            var data = JSON.parse(chunk.toString());
            if (data && data.hasOwnProperty("id")) {
                switch (data["id"]) {
                    case "auth": {
                        if (data["token"] == useRuntimeConfig().press_secret) {
                            Presses.push({ press_data: {
                                id: 0, weights: [], corrections: [], t: 0, t_f: data["t_f"]
                            }, socket: socket, header: false, cheese: { name: "", factor: 0}, started: false
                        })
                            console.log("Got token")
                        }
                        else {
                            socket.end()
                        }
                        break;
                    }
                    case "data": {
                        if (data["token"] == useRuntimeConfig().press_secret && data["weight"] && data["correction"]) {
                            addToCSV(data)
                        }
                        else {
                            socket.end()
                        }
                        break;
                    }
                    case "done": {
                        if (data["token"] == useRuntimeConfig().press_secret && data["session"]) {
                            Presses.splice(Presses.findIndex(i => i.press_data.id === data["session"]), 1)
                        }
                        socket.end()
                        break;
                    }
                }
            }
        });

        socket.on("end", () => {
            Presses.splice(Presses.findIndex(i => i.socket === socket), 1)
            console.log("Disconnected")
        })
    })
    server.listen(8888);
})
function addToCSV(data: any): void {
    let press = Presses.find(i => i.press_data.id === data["session"]);
    console.log("Adding CSV data")
    if (press){
        press.press_data.weights.push(data["weight"]);
        press.press_data.corrections.push(data["correction"]);
        let new_path = `${path.join("data/press/session-" + data["session"].toString())}`;
        if (!fs.existsSync(new_path)) {
            fs.mkdirSync(new_path);
        }
        if (!press.header) {
            fs.writeFileSync(`${path.join(new_path, "data.csv")}`, "t,weights,corrections \r\n")
            press.header = true
        }
        
        fs.appendFileSync(`${path.join(new_path, "data.csv")}`, `${press.press_data.t * press.press_data.t_f},${data["weights"]},${data["corrections"]}\r\n`)
        press.press_data.t++;
    }
}

/*
TOKEN: AUTH
SESSION: ID
{"id": "auth","token": "tobechanged", "t_f":"1"}
{ "id": "data", "session":0, "token":"tobechanged", "weight":1.5, "correction":2}
{ "id": "done", "session":0, "token":"tobechanged"}
*/