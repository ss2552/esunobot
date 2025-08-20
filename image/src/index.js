console.log("開始")

await fetch("https://discord.com/api/webhooks/1407672039971623024/OSi9zlaxx1bUU4age8LcPikx_iKKJgMK19Cm4MpV34zj5ezFDh5L5n4j1j-QDNHQkNzS", {
  headers: {"Content-Type": "application/json"}, method: "POST", body: JSON.stringify({"content": "テスト実行"})
})

let ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json")

ws.onmessage(({data}) =>{
            const {op, d, s, t} = JSON.parse(data)
            if(op==10)setInterval(_=>ws.send(JSON.stringify({op:1, d:null})), d.heartbeat_interval)
})

ws.onopen(_=>ws.send(JSON.stringify({
            "op": 2, "d": {"token": process.env.TOKEN, "properties": {"os": "linux",  "device": "docker"}, 
            "presence": {"status": "online", "activities" : [
                        {"state": "テスト実行", "type":4, "emoji": {"name": "😃"}}
            ],
            "intents": (1 << 9),
}}})))

// ping => Nping DATETIME