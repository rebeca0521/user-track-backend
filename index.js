const express = require('express')
const path = require('path')
const PORT = 8000

express()
  .get('/', (req, res) => res.send('Hello World!'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
