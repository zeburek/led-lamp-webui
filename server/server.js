const webSocketsServerPort = 8000
const webSocketServer = require('websocket').server
const http = require('http')
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
  effects: [
    {
      id: 'SparklesEffect',
      name: 'Sparkles',
      speed: 121,
      scale: 12,
      brightness: 255,
    },
    {
      id: 'FireEffect',
      name: 'Fire',
      speed: 37,
      scale: 1,
      brightness: 80,
      useSpectrometer: false,
    },
    {
      id: 'VerticalRainbowEffect',
      name: 'Vertical rainbow',
      speed: 100,
      scale: 18,
      brightness: 80,
    },
    {
      id: 'HorizontalRainbowEffect',
      name: 'Horizontal rainbow',
      speed: 100,
      scale: 18,
      brightness: 80,
    },
    {
      id: 'ColorsEffect',
      name: 'Color change',
      speed: 112,
      scale: 1,
      brightness: 80,
    },
    {
      id: 'MadnessNoiseEffect',
      name: 'Madness 3D',
      speed: 50,
      scale: 100,
      brightness: 80,
    },
    {
      id: 'CloudNoiseEffect',
      name: 'Clouds 3D',
      speed: 1,
      scale: 100,
      brightness: 80,
    },
    {
      id: 'LavaNoiseEffect',
      name: 'Lava 3D',
      speed: 1,
      scale: 100,
      brightness: 80,
    },
    {
      id: 'PlasmaNoiseEffect',
      name: 'Plasma 3D',
      speed: 1,
      scale: 100,
      brightness: 80,
    },
    {
      id: 'RainbowNoiseEffect',
      name: 'Rainbow 3D',
      speed: 1,
      scale: 52,
      brightness: 80,
    },
    {
      id: 'RainbowStripeNoiseEffect',
      name: 'Rainbow stripe 3D',
      speed: 1,
      scale: 47,
      brightness: 80,
    },
    {
      id: 'ZebraNoiseEffect',
      name: 'Zebra 3D',
      speed: 1,
      scale: 26,
      brightness: 80,
    },
    {
      id: 'ForestNoiseEffect',
      name: 'Forest 3D',
      speed: 1,
      scale: 64,
      brightness: 80,
    },
    {
      id: 'OceanNoiseEffect',
      name: 'Ocean 3D',
      speed: 1,
      scale: 24,
      brightness: 80,
    },
    {
      id: 'ColorEffect',
      name: 'Single color',
      speed: 10,
      scale: 1,
      brightness: 80,
      useSpectrometer: false,
      color: 0,
    },
    {
      id: 'SnowEffect',
      name: 'Snow',
      speed: 255,
      scale: 33,
      brightness: 80,
      useSpectrometer: false,
      color: 16777215,
    },
    {
      id: 'MatrixEffect',
      name: 'Matrix',
      speed: 255,
      scale: 25,
      brightness: 80,
    },
    {
      id: 'LightersEffect',
      name: 'Lighters',
      speed: 127,
      scale: 10,
      brightness: 80,
    },
    {
      id: 'ClockEffect',
      name: 'Clock vertical',
      speed: 250,
      scale: 1,
      brightness: 80,
      hoursColor: 10565,
      minutesColor: 6627,
    },
    {
      id: 'ClockHorizontal1Effect',
      name: 'Clock horizontal colored',
      speed: 250,
      scale: 1,
      brightness: 80,
      hoursColor: 10565,
      minutesColor: 6627,
    },
    {
      id: 'ClockHorizontal2Effect',
      name: 'Clock horizontal',
      speed: 250,
      scale: 1,
      brightness: 80,
      hoursColor: 10565,
      minutesColor: 6627,
    },
    {
      id: 'ClockHorizontal3Effect',
      name: 'Clock horizontal single',
      speed: 250,
      scale: 1,
      brightness: 80,
      hoursColor: 10565,
      minutesColor: 6627,
    },
    {
      id: 'SoundEffect',
      name: 'Sound spectrometer',
      speed: 1,
      scale: 50,
      brightness: 236,
      color: 255,
      heatColor: true,
    },
    {
      id: 'StarfallEffect',
      name: 'Starfall',
      speed: 80,
      scale: 100,
      brightness: 80,
      useSpectrometer: false,
      tailStep: 100,
      saturation: 150,
    },
    {
      id: 'DiagonalRainbowEffect',
      name: 'DiagonalRainbow',
      speed: 100,
      scale: 20,
      brightness: 80,
    },
    {
      id: 'WaterfallEffect',
      name: 'Waterfall',
      speed: 68,
      scale: 88,
      brightness: 80,
      cooling: 20,
      sparkling: 40,
    },
    {
      id: 'TwirlRainbowEffect',
      name: 'Twirl Rainbow',
      speed: 100,
      scale: 20,
      brightness: 80,
      hueStep: 8,
      twirlFactor: 300,
    },
    {
      id: 'PulseCirclesEffect',
      name: 'Pulsing circles',
      speed: 100,
      scale: 20,
      brightness: 80,
      mode: 1,
    },
    {
      id: 'AnimationEffect',
      name: 'Aqarium',
      speed: 100,
      scale: 20,
      brightness: 80,
    },
    {
      id: 'StormEffect',
      name: 'Storm',
      speed: 100,
      scale: 20,
      brightness: 80,
      isColored: false,
      snowDensity: 32,
    },
    {
      id: 'Matrix2Effect',
      name: 'Matrix 2',
      speed: 100,
      scale: 20,
      brightness: 80,
    },
    {
      id: 'TrackingLightersEffect',
      name: 'Tracking Lighters',
      speed: 100,
      scale: 20,
      brightness: 80,
      tails: 1,
    },
    {
      id: 'LightBallsEffect',
      name: 'Light Balls',
      speed: 100,
      scale: 20,
      brightness: 80,
      thickness: 1,
    },
    {
      id: 'MovingCubeEffect',
      name: 'Moving Cube',
      speed: 100,
      scale: 20,
      brightness: 80,
      randomColor: true,
    },
    {
      id: 'WhiteColorEffect',
      name: 'White Color',
      speed: 100,
      scale: 20,
      brightness: 80,
    },
    {
      id: 'PulsingCometEffect',
      name: 'Pulsing Comet',
      speed: 100,
      scale: 20,
      brightness: 80,
    },
    {
      id: 'DoubleCometsEffect',
      name: 'Double Comet',
      speed: 100,
      scale: 20,
      brightness: 80,
    },
    {
      id: 'TripleCometsEffect',
      name: 'Triple Comet',
      speed: 100,
      scale: 20,
      brightness: 80,
    },
    {
      id: 'RainbowCometEffect',
      name: 'Rainbow Comet',
      speed: 100,
      scale: 20,
      brightness: 80,
    },
    {
      id: 'ColorCometEffect',
      name: 'Color Comet',
      speed: 100,
      scale: 20,
      brightness: 80,
    },
    {
      id: 'MovingFlameEffect',
      name: 'Moving Flame',
      speed: 100,
      scale: 20,
      brightness: 80,
    },
    {
      id: 'FractorialFireEffect',
      name: 'Fractorial Fire',
      speed: 100,
      scale: 20,
      brightness: 80,
    },
    {
      id: 'RainbowKiteEffect',
      name: 'Rainbow Kite',
      speed: 100,
      scale: 20,
      brightness: 80,
    },
    {
      id: 'BouncingBallsEffect',
      name: 'Bouncing Balls',
      speed: 100,
      scale: 20,
      brightness: 80,
      isColored: false,
    },
    {
      id: 'SpiralEffect',
      name: 'Spiral',
      speed: 100,
      scale: 20,
      brightness: 80,
      spirocount: 1,
    },
    {
      id: 'MetaBallsEffect',
      name: 'Meta Balls',
      speed: 100,
      scale: 20,
      brightness: 80,
    },
    {
      id: 'SinusoidEffect',
      name: 'Sinusoid',
      speed: 100,
      scale: 20,
      brightness: 80,
    },
    {
      id: 'WaterfallPaletteEffect',
      name: 'Waterfall Pallete',
      speed: 100,
      scale: 20,
      brightness: 80,
      sparkling: 80,
    },
    {
      id: 'RainEffect',
      name: 'Rain',
      speed: 100,
      scale: 20,
      brightness: 80,
    },
    {
      id: 'PrismataEffect',
      name: 'Prismata',
      speed: 100,
      scale: 20,
      brightness: 80,
    },
    {
      id: 'FlockEffect',
      name: 'Flock',
      speed: 100,
      scale: 20,
      brightness: 80,
      havePredator: false,
    },
    {
      id: 'WhirlEffect',
      name: 'Whirl',
      speed: 100,
      scale: 20,
      brightness: 80,
      oneColor: true,
      ff_speed: 1,
      ff_scale: 26,
    },
    {
      id: 'WaveEffect',
      name: 'Wave',
      speed: 65,
      scale: 5,
      brightness: 80,
    },
    {
      id: 'Fire12Effect',
      name: 'Fire 12',
      speed: 52,
      scale: 20,
      brightness: 80,
      cooling: 70,
      sparking: 130,
      fireSmoothing: 80,
    },
    {
      id: 'Fire18Effect',
      name: 'Fire 18',
      speed: 100,
      scale: 20,
      brightness: 80,
    },
    {
      id: 'RainNeoEffect',
      name: 'Rain Neo',
      speed: 100,
      scale: 20,
      brightness: 80,
      rainColor: 3952730,
      lightningColor: 4737104,
      backgroundDepth: 60,
      maxBrightness: 200,
      spawnFreq: 50,
      tailLength: 30,
      splashes: false,
      clouds: false,
      storm: false,
    },
    {
      id: 'TwinklesEffect',
      name: 'Twinkles',
      speed: 100,
      scale: 44,
      brightness: 80,
      mult: 6,
    },
    {
      id: 'SoundStereoEffect',
      name: 'Sound stereo spectrometer',
      speed: 1,
      scale: 50,
      brightness: 236,
    },
  ],
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
