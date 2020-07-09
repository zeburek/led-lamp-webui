const webSocketsServerPort = 8000
const webSocketServer = require('websocket').server
const http = require('http')
const effects = require('../public/effects')
// Spinning the http server and the websocket server.

const requestHandler = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
  res.setHeader('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }
  let body = ''
  req.on('data', (chunk) => {
    body += chunk.toString() // convert Buffer to string
  })
  req.on('end', () => {
    res.end('ok')
  })
  console.log(req.url)
  res.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)
server.listen(webSocketsServerPort)
const wsServer = new webSocketServer({
  httpServer: server,
})

var state = {
  working: true,
  activeEffect: 0,
  effects,
  alarms: [],
}

const sendState = (connection) => {
  connection.sendUTF(JSON.stringify(state))
}

const updateEffects = (data) => {
  const array = state.effects.map((item, _) => {
    if (data.name == item.name) {
      return data
    }
    return item
  })
  state.effects = array
}

const updateWorking = (status) => {
  state.working = status
}

const updateActiveEffect = (status) => {
  state.activeEffect = status
}

const EVENTS = {
  EFFECTS_CHANGED: updateEffects,
  ALARMS_CHANGED: '',
  WORKING: updateWorking,
  ACTIVE_EFFECT: updateActiveEffect,
}

wsServer.on('request', function (request) {
  console.log(
    new Date() +
      ' Recieved a new connection from origin ' +
      request.origin +
      '.'
  )
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin)
  sendState(connection)
  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log(message)
      const data = JSON.parse(message.utf8Data)
      EVENTS[data.event](data.data)
    }
  })
  // user disconnected
  connection.on('close', function (connection) {
    console.log(new Date() + ' Peer disconnected.')
  })
})
