const helmet = require('helmet')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { errorHandle } = require("src/middleware/Error");


const app = express()
const port = process.env.PORT || 8080
app.use(cors({
    origin: ['http://localhost:5173']
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.use(morgan('combined'))
app.use(require("src/routers"));
app.use(errorHandle)
require("src/databases/ModelSynchronized");

require('@services/VNPayService').VNPayService.generateUrl(
    10000
)



module.exports = app
