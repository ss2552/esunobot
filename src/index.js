console.log("開始")

await fetch("https://discord.com/api/webhooks/1407672039971623024/OSi9zlaxx1bUU4age8LcPikx_iKKJgMK19Cm4MpV34zj5ezFDh5L5n4j1j-QDNHQkNzS", {
  headers: {"Content-Type": "application/json"}, method: "POST", body: JSON.stringify({"content": "テスト実行"})
})

const token = process.env.TOKEN
if(!token){
  console.error("トークンがありません")
  close()
}

const ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json")

ws.onmessage = function({data}){
  const {op, d, s, t} = JSON.parse(data)
  if(op == 10){
    setInterval(_=>{
      console.log("recv")
      ws.send(JSON.stringify({op:1, d:null}))
    }, d.heartbeat_interval)
}}

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
                  "name": "テスト実行", 
                  "type":0
                }
        ],
  }}})
  ws.send(data)
}

ws.onerror = function(err){
  console.log(err)
}

// ping => Nping DATETIME