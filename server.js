const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

var working = true;

var effects = [
    {
        "name": "Fire",
        "speed": 200,
        "scale": 20,
        "brightness": 80
    }
];

var alarms = [
    {
        "time": "07:00",
        "color": "red",
        "enabled": true
    }
];



const sendState = (connection) => {
  connection.sendUTF(JSON.stringify({working: working, effects: effects, alarms: alarms}))
}

const saveState = (object) => {
  effects = object.effects;
  alarms = object.alarms;
  working = object.working;
}

wsServer.on('request', function(request) {
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  sendState(connection);
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log(message);
      const dataFromClient = JSON.parse(message.utf8Data);
      saveState(dataFromClient);
    }
  });
  // user disconnected
  connection.on('close', function(connection) {
    console.log((new Date()) + " Peer disconnected.");
  });
});