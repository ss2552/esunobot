console.log(process.env.START_MSG)
await fetch(process.env.WEBHOOK, {
  headers: {"Content-Type": "application/json"}, method: "POST", body: JSON.stringify({"content": process.env.START_MSG + " " + await get_status()})
})

const token = process.env.TOKEN
if(!token){
  console.error("トークンがありません")
  close()
}

const ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json")

ws.onmessage = async function({data}){
    const {op, d, s, t} = JSON.parse(data)
    if(op == 0&& t == "MESSAGE_CREATE"){
        if(d.content == "ぴんぐ"){
            await fetch("https://discord.com/api/v10/channels/"+d.channel_id+"/messages", {
                "headers": {
                    "authorization": "Bot " + token,
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({content: "ぽんぐ "+await get_status(),
                    message_reference: {
                        type: 0,
                        message_id: d.id
                }}),
                "method": "POST"
            })
        }
    }else if(op == 10){
        setInterval(_=>{
            ws.send(JSON.stringify({op:1, d:null}))
        }, d.heartbeat_interval)
    }
}

ws.onopen = function(){
  const data = JSON.stringify({
        "op": 2, 
        "d": {
          "token": token, 
          "intents": (1 << 9) | (1 << 12) | (1 << 15),
          "properties": {
            "os": "linux",  
            "device": "docker"
          }, 
        "presence": {
          "status": "online", 
          "activities" : [
                {
                  "name": "さくら", 
                  "type": 0
                }
        ],
  }}})
  ws.send(data)
}

ws.onerror = function(err){
    console.log(err)
}

ws.onclose = async function(){
    await fetch(process.env.WEBHOOK, {headers: {"Content-Type": "application/json"}, method: "POST", body: JSON.stringify({"content": "終了"})})
}


async function get_status() {
    const {status, message} = await fetch("https://secure.sakura.ad.jp/cloud/api/apprun/1.0/apprun/api/applications/"+process.env.APPLICATION_ID+"/status", {
        headers: {
            authorization: "Basic "+btoa(process.env.ACCESS_TOKEN+":"+process.env.ACCESS_TOKEN_SECRET)
    }}).then(async r=>await r.json())
    return "\nstatus: "+status + "\nmessage: " + message
}