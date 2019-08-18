const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
// Spinning the http server and the websocket server.

const requestHandler = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	res.setHeader('Access-Control-Allow-Headers', '*');
	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
  }
  let body = '';
  req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
  });
  req.on('end', () => {
      res.end('ok');
  });
  console.log(req.url);
  res.end('Hello Node.js Server!');
}

const server = http.createServer(requestHandler);
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

var state = {
  "working":true,
  "activeEffect": 0,
  "effects":[
    {"name":"Sparkles","speed":255,"scale":13,"brightness":25},
    {"name":"Fire","speed":44,"scale":1,"brightness":36},
    {"name":"Vertical rainbow","speed":34,"scale":19,"brightness":41},
    {"name":"Horizontal rainbow","speed":125,"scale":23,"brightness":46},
    {"name":"Color change","speed":156,"scale":1,"brightness":207},
    {"name":"Madness 3D","speed":1,"scale":29,"brightness":107},
    {"name":"Clouds 3D","speed":1,"scale":64,"brightness":23},
    {"name":"Lava 3D","speed":1,"scale":18,"brightness":255},
    {"name":"Plasma 3D","speed":1,"scale":23,"brightness":255},
    {"name":"Rainbow 3D","speed":1,"scale":22,"brightness":255},
    {"name":"Rainbow stripe 3D","speed":1,"scale":19,"brightness":255},
    {"name":"Zebra 3D","speed":1,"scale":24,"brightness":255},
    {"name":"Forest 3D","speed":1,"scale":17,"brightness":255},
    {"name":"Ocean 3D","speed":1,"scale":19,"brightness":255},
    {"name":"Single color","speed":1,"scale":23,"brightness":255},
    {"name":"Snow","speed":255,"scale":33,"brightness":255},
    {"name":"Matrix","speed":227,"scale":10,"brightness":255},
    {"name":"Lighters","speed":255,"scale":68,"brightness":64},
    {"name":"Clock vertical","speed":255,"scale":255,"brightness":255},
    {"name":"Clock horizontal colored","speed":255,"scale":255,"brightness":255},
    {"name":"Clock horizontal","speed":255,"scale":255,"brightness":255},
    {"name":"Clock horizontal single","speed":255,"scale":255,"brightness":255}
  ],
  "alarms":[],
}



const sendState = (connection) => {
  connection.sendUTF(JSON.stringify(state))
}

const updateEffects = (data) => {
  const array = state.effects.map((item, _) => {
    if (data.name == item.name) {
      return data;
    }
    return item;
  });
  state.effects = array;
}

const updateWorking = (status) => {
  state.working = status
}

const updateActiveEffect = (status) => {
  state.activeEffect = status
}

const EVENTS = {
  EFFECTS_CHANGED: updateEffects,
  ALARMS_CHANGED: "",
  WORKING: updateWorking,
  ACTIVE_EFFECT: updateActiveEffect,
}

wsServer.on('request', function(request) {
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  sendState(connection);
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log(message);
      const data = JSON.parse(message.utf8Data);
      EVENTS[data.event](data.data);
    }
  });
  // user disconnected
  connection.on('close', function(connection) {
    console.log((new Date()) + " Peer disconnected.");
  });
});