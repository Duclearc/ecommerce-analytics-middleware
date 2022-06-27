# info
- loads selected data from Magento/Google Analytics and uploads it (aggregated) to this NodeJS middleware to be shown in a Data-Model
- confidential info (such as credentials) should be kept in the `./config/` folder

# internal documentation from hackathon
https://lemundo.atlassian.net/wiki/spaces/DT/pages/2011758615/Ecommerce+Analytics

# example data
```
{"ga_users":"5327","ga_newusers":"4427","ga_sessions":"6229","orders_number":"32","items_ordered":"49","items_per_order":1.53125,"average_order_value":"45.43468750","revenue_month":"679.3900","revenue_year":"1453.9100","revenue_all_time":"1453.9100","data_source":"magento","created_at":"2021-12-22 15:35:20"}
```

# steps taken
- [x] successfully gathered data from Magento and GA
- [x] got a dummy server working with GET and POST requests. It runs locally and is available through ngrok - Online in One Line.
    - [[Source](https://stackoverflow.com/questions/30188582/ngrok-command-not-found#comment69090313_36759493)] there was a problem installing it on my machine. I’ve followed the instructions and ended up with `zsh: command not found: ngrok`. This was solved by typing this on the Terminal:
```
sudo mv ngrok /usr/local/bin
```
- [x] successfully sent JSON-encoded data to it through a POST request
- [x] successfully connected the node.js app to the BigQuery project.
- [x] created Table and Dataset in the Google Cloud project
- [x] programmed an NodeJS local function to receive GA data and send it to Google Cloud

# requirements:
- JSON file with credentials
- `@google-cloud/bigquery` npm package
- [sample code used](https://github.com/googleapis/nodejs-bigquery/blob/main/samples/clientJSONCredentials.js)
- user permissions granted to the Google Project’s `client_email` (you can see it in the JSON file)