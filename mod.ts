import { datetime } from "https://deno.land/x/ptera/mod.ts";

setInterval(() => {
    fetch("https://discord.com/api/v10/channels/1206937013773930516/messages",
        {
            "headers": {
                "authorization": "Bot "+Deno.env.get("TOKEN"),
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({date: {content: datetime()}}),
            "method": "POST"
        }
    )
}, 111111)
/*
// deno-lint-ignore-file no-fallthrough
import "https://deno.land/std@0.224.0/dotenv/load.ts";
// import "jsr:@std/dotenv/load"

// https://docs.deno.com/api/web/~/WebSocket
const ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");

const DISCORD_BOT_TOKEN = Deno.env.get("TOKEN") || Error("トークンが無いわ");
console.log("TOKEN >", DISCORD_BOT_TOKEN)
// https://discord.com/developers/docs/topics/opcodes-and-status-codes

const startup_request = {
    "op": 2,
    "d":{
        "token": DISCORD_BOT_TOKEN,
        "compress": true,
        "intents": 1 << 9,
        "properties":{
            "os": Deno.build.os,
            "browser": "None",
            "device": "deno deploy"
        },
        "presence": {
            "activities": [
                {
                    name: "deno deploy",
                    type: 0
                }
            ],

            status: "online",
            afk: false
        }
    }
}

ws.onopen=_=>ws.send(JSON.stringify(startup_request))

ws.onmessage = ({data}) => {

    if(data as Blob) return
    
    const {op, d, t} = JSON.parse(data);

    switch (op) {
        case 10:
            // heartbeat
            setInterval(_=> ws.send(JSON.stringify({"op":1, "d":null})), d.heartbeat_interval)
            break

        case 0:
            console.log(d.content)
            break

        default:
            console.log(op)
            break
    }
}

ws.onerror = () => {
    console.log("ERROR")
}

ws.onclose = (event) => {
    console.log(`WebSocket closed: Code=${event.code}, Reason=${event.reason}`);
}

Deno.cron("up", {minute: {every: 2}}, () => {
    console.log("update");
});
*/
