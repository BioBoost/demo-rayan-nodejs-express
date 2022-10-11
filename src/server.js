const express = require('express')
const mqtt = require('mqtt')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! From NodeJS by Rayan')
})

const client  = mqtt.connect('mqtt://mqtt.devbit.be')

client.on('connect', function () {
  client.subscribe('test/soundboard/esp1', function (err) {
    if (!err) console.log('Connected to broker')
  })
})

client.on('message', function (topic, message) {    // message is Buffer
  console.log(`${message.toString()} @ ${topic}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})