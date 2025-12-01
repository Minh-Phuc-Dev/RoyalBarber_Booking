require("module-alias/register");
const express = require('express')
const port = process.env.PORT || 8080
const app = require("src/app")


app.listen(port)
