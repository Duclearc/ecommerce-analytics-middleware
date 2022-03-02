const express = require('express');
const app = express();
const port = 1111
const url = `http://localhost:${port}/`;
// allows for self-made requests
app.use(require('cors')());
// allows for url encoding
app.use(express.urlencoded({ extended: false }));
// allows for json parsing
app.use(express.json());
// all dummy addresses
const dummyData = require('./dummyData');
// checks if data is present
if (dummyData.length) console.log('data is available', { 'itemsCount': dummyData.length });

app.listen(port, () => console.log(`==> listening on port: ${port}\n ${url}`))

// return all addresses
app.get('/', (req, res, nxt) => res.sendFile('./dummyData.json', {
    root: './'
}))

// return only addresses containing x
app.post('/address', (req, res, nxt) => {
    const target = req.body; // what the user inputs
    const potentialPlaces = [];
    for (const place of dummyData) {
        const apiAddress = place.vicinity;
        const userAddress = JSON.parse(target.address);
        const condition = apiAddress.toLocaleLowerCase().includes(userAddress.toLocaleLowerCase());
        // console.log({condition, address: apiAddress, inputtedAddress: userAddress})
        if (condition) {
            potentialPlaces.push(
                {
                    name: place.name,
                    address: apiAddress
                }
            )
        };

    }
    res.json(potentialPlaces);
})