import "https://deno.land/std@0.224.0/dotenv/load.ts"

// https://docs.deno.com/api/web/~/WebSocket
const ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json")

const DISCORD_BOT_TOKEN =   Deno.env.get("TOKEN")
if(!DISCORD_BOT_TOKEN)      Error("トークンが無いわ");

ws.onopen=_=>ws.send(JSON.stringify({op: 2, d: {token: DISCORD_BOT_TOKEN, compress: true}}))

ws.onmessage = (event) => {
  const{op, d}  =           JSON.parse(event.data)
  if(op==10)                setInterval(_=>ws.send(JSON.stringify({op:1, d:null})), d.heartbeat_interval)
  if(op==0)
    return
}

ws.onclose = (event) => {
  console.log(`WebSocket closed: Code=${event.code}, Reason=${event.reason}`);
}
