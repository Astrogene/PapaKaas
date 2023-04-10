import * as net from "net";
import * as fs from 'fs';
import * as path from "path";
type Press = {
    id: number
    weights: number[]
    corrections: number[]
    socket: any
    header: boolean
    t: number
}
//TODO ADD FACTOR FOR MULTIPLYING TIME
export var Presses: Press[] = [];
export default defineNitroPlugin((nitroApp) => {

    var server = net.createServer();

    server.on("connection", (socket: any) => {
        socket.on('data', function (chunk: any) {
            var data = JSON.parse(chunk.toString());
            if (data && data.hasOwnProperty("id")) {
                switch (data["id"]) {
                    case "auth": {
                        if (data["token"] == useRuntimeConfig().press_secret) {
                            Presses.push({ id: 0, weights: [], corrections: [], socket: socket, header: false, t:0})
                            console.log("Got token")
                        }
                        else {
                            socket.end()
                        }
                        break;
                    }
                    case "data": {
                        if (data["token"] == useRuntimeConfig().press_secret && data["weights"] && data["corrections"]) {
                            addToCSV(data)
                        }
                        else {
                            socket.end()
                        }
                        break;
                    }
                    case "done": {
                        if (data["token"] == useRuntimeConfig().press_secret && data["session"]) {
                            Presses.splice(Presses.findIndex(i => i.id === data["session"]), 1)
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
    server.listen(8888, '127.0.0.1');
})
function addToCSV(data: any): void {
    let press = Presses.find(i => i.id === data["session"]);
    console.log(press)
    if (press){
        press.weights.push(data["weights"]);
        press.corrections.push(data["corrections"]);
        let new_path = `${path.join("data/press/session-" + data["session"].toString())}`;
        if (!fs.existsSync(new_path)) {
            fs.mkdirSync(new_path);
        }
        if (!press.header) {
            fs.writeFileSync(`${path.join(new_path, "data.csv")}`, "t,weights,corrections \r\n")
            press.header = true
        }
        fs.appendFileSync(`${path.join(new_path, "data.csv")}`, `${press.t},${data["weights"]},${data["corrections"]}\r\n`)
        press.t++;
    }
}

/*
TOKEN: AUTH
SESSION: ID
{"id": "auth","token": "tobechanged"}
{ "id": "data", "session":0, "token":"tobechanged", "weights":1.5, "corrections":2}
{ "id": "done", "session":0, "token":"tobechanged"}
*/