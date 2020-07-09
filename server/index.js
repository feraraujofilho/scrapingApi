const express = require('express')
const app = express()
const port = 3000

const bodyParser = require("body-parser")

const scrapers = require('./scrapers')
const db = require("./db")

app.use(bodyParser.json())

app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    next()
})

app.get('/creators', async (req, res) =>{
    const creators = await db.getAllCreators()
    res.send(creators)
})

app.post('/creators', async (req, res) =>{
    const channelData = await scrapers.scrapeChannel(req.body.channelUrl)
    const creators = await db.insertCreator(channelData.name, channelData.avatarUrl, req.body.channelUrl)

    res.send(creators)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))