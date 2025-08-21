console.log("開始")

await fetch(process.env.WEBHOOK, {
  headers: {"Content-Type": "application/json"}, method: "POST", body: JSON.stringify({"content": "開始"})
})

const token = process.env.TOKEN
if(!token){
  console.error("トークンがありません")
  close()
}

const ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json")

ws.onmessage = async function({data}){
    const {op, d, s, t} = JSON.parse(data)
    if(op == 10){
        setInterval(_=>{
            ws.send(JSON.stringify({op:1, d:null}))
        }, d.heartbeat_interval)
    }else if(op == 0){
        if(d.content == "めぅ"){
            await fetch("https://discord.com/api/v10/channels/"+d.channel_id+"/messages", {
                "headers": {
                    "authorization": "Bot " + token,
                    "Content-Type": "application/json"
                },
                "body": d.content,
                "method": "POST"
            })
        }
    }
}

ws.onopen = function(){
  const data = JSON.stringify({
        "op": 2, 
        "d": {
          "token": token, 
          "intents": (1 << 9),
          "properties": {
            "os": "linux",  
            "device": "docker"
          }, 
        "presence": {
          "status": "online", 
          "activities" : [
                {
                  "status": "さくら", 
                  "type": 4,
                  "emoji": {
                    "name": "😀"
                  }
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
