const { loadDataToBigQuery, saveDataToFile } = require('./bigquery')
const { datasetId, tableId } = require('./config/config.json')

// ==> Server setup
const port = 80
const url = `http://localhost:${port}/`
const versionName = 'apple1'
const express = require('express')
const app = express()
app.use(require('cors')()) // allows for self-made requests
app.use(express.urlencoded({ extended: false })) // allows for url encoding
app.use(express.json()) // allows for json parsing

function processRequest(req, res, method) {
    const target = JSON.stringify(req.body)
    console.log(method + '\n', {'data': target}, '\n')
    const filepath = __dirname + saveDataToFile(target)

    loadDataToBigQuery(filepath, datasetId, tableId)
    res.json(JSON.stringify({ version: versionName, message: 'data added', data: target }))
}

app.listen(port, () => console.log(`==> listening on port: ${port}\n ${url}`))

app.get('/', (req, res, nxt) => res.send(`codeword: "${versionName}"`)) // just to check it's working

app.post('/', (req, res) => processRequest(req, res, 'POST'))
