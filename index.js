const client = require('discord-rich-presence')('863142243586277386');
require("dotenv").config()                      //the id of the discord app
const WebSocket = require('ws');
const config = require("./config.json")
const url = `wss://app.hyperate.io/socket/websocket?token=${process.env.KEY}`
const connection = new WebSocket(url)                       //special key :3

const msg = {
            //ferny's id (me) 7B50
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
    //console logging go brrrrrr
  console.log("opened") // make sure it opened correctly
  connection.send(JSON.stringify(msg))
})

setInterval(function(){ // gotta keep the server HB alive
  connection.send(JSON.stringify(msg2))
  console.log("refresh!")
}, 28000); // 28 seconds to have a 2 sec delay for ping

connection.on("error", error => {
  console.log(error)  //check the error :)
  connection.close(); //close on error
})

connection.on("message", async message => {
  var xd = JSON.parse(message)
              //hahah funny XD
  console.log(xd.payload) // console spam go  BRRRRRRRRRRRRRRRRR

  client.updatePresence({
    state: `heart rate`,
    details: `${xd.payload.hr}`, //the actual HR update
    largeImageKey: 'bloodrose', // the big image use for the whole thing
    smallImageKey: 'heart', // the small image used in the corner
    instance: true, //no clue what this does tbh
  });
})
