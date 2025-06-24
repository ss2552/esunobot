import "https://deno.land/std@0.224.0/dotenv/load.ts"

// https://docs.deno.com/api/web/~/WebSocket
const ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json")

const DISCORD_BOT_TOKEN = Deno.env.get("TOKEN") | Error("トークンが無いわ");

ws.onopen=_=>ws.send(JSON.stringify({op: 2, d: {token: DISCORD_BOT_TOKEN, compress: true}}))

ws.onmessage = ({data}) => {
  
  const {op, d} = JSON.parse(data)
  
  switch (op){
    case 10 : setInterval(_=>ws.send("{\"op\":1, \"d\":0}")), d.heartbeat_interval)
    case  0 : return
    default : console.log(op)
  }

ws.onclose = (event) => {
  console.log(`WebSocket closed: Code=${event.code}, Reason=${event.reason}`);
}
