const express = require('express');
const cors = require('cors')
const port = 3000
const app = express()

const server = app.use(express.static('public'))
app.use(cors)
app.listen(port, ()=>console.log(`Nigga ${port}`))