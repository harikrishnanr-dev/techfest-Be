
//Import dotenv
require('dotenv').config()
//import express  cors module etc..
const express = require('express')

require('./DB/connection')
const cors = require('cors')
const router=require('./Router/router')
//create server using express
const tfServer = express()
//inject cors to pfServer
tfServer.use(cors())
//middleware to covert json to object
tfServer.use(express.json())
 tfServer.use(router)
//provide port
const PORT = 4000;

//server Run
tfServer.listen(PORT, () => {
    console.log(`tfServer ${PORT}`);
    
})

tfServer.get('/', (req, res) => {
    res.send("Server For Project")
})