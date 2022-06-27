const credentials = require('./config/ecomm-data-and-analytics-a7a255fb1e58.json')
const createUniqueId = require('uuid').v4

'use strict'

// [START bigquery_client_json_credentials]
// Creates a BigQuery client explicitly using service account credentials by specifying the private key file.
const { BigQuery } = require('@google-cloud/bigquery')

const options = {
  keyFilename: './ecomm-data-and-analytics-a7a255fb1e58.json',
  projectId: credentials.project_id
}

const bigquery = new BigQuery(options)
// [END bigquery_client_json_credentials]

async function loadDataToBigQuery(pathToLocalFile, datasetId, tableId) {

  const filename = pathToLocalFile // '/path/to/file.csv'

  // Loads data from a local file into the table
  const [job] = await bigquery
    .dataset(datasetId)
    .table(tableId)
    .load(filename)

  console.log(`Job ${job.id} completed.`)

  // Checks the job's status for errors
  const errors = job.status.errors
  if (errors && errors.length > 0) {
    throw errors
  }
}

function saveDataToFile(data) {
  const fs = require('fs')
  const filename = `/${createUniqueId()}.json`
  const filepath = `.${filename}`

  fs.writeFileSync(filepath, data)

  return filename
}

module.exports = {
  loadDataToBigQuery,
  saveDataToFile
}
