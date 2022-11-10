const config = require("./config.json")
const client = require('discord-rich-presence')(config.RPCID);
require("dotenv").config()                      //the id of the discord app
const WebSocket = require('ws');

const url = `wss://app.hyperate.io/socket/websocket?token=${config.key}`
const connection = new WebSocket(url)                       //hyperate application token

const msg = {
            //by default its my id (ferny)
  "topic": `hr:${config.HRID}`, // id from config file
  "event": "phx_join",
  "payload": {},
  "ref": 0
}

const msg2 = {
  "topic": "phoenix",
	"event": "heartbeat",
	"payload": {},
	"ref": 0
}

connection.on("open", () =>{
  console.log("opened") // make sure it opened correctly
  connection.send(JSON.stringify(msg))
})

setInterval(function(){ // gotta keep the server HB alive
  connection.send(JSON.stringify(msg2))
  console.log("refresh!")
}, 10000); // 10 second delay between "heartbeats"

connection.on("message", async message => {
  
  var xd = JSON.parse(message)
  console.log(xd.payload) // logs the payload response
  
  if(!xd.payload.hr) return;

  client.updatePresence({
    state: `heart rate`,
    details: `${xd.payload.hr}`, //the actual HR update
    largeImageKey: config.LargeIcon, // the big image use for the whole thing
    smallImageKey: config.SmallIcon, // the small image used in the corner
    instance: true, //no clue what this does tbh
  });
})
