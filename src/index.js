const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const axios = require('axios');
const port = 3000;

const bodyParser = require('body-parser');



// To allow everything to use the api
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    next();
});


// buitin middleware
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));


// Connecting with Database
mongoose.connect(process.env.DB_CONNECT).then(
    () => {
        console.log("Database Connected")
    },
    err => { console.log(err); }
);


// Parser to set `req.body`
app.use(require('body-parser').json());


app.get('/cryptosdata', (req, res) => {
    let data;
    let config = {
        method: 'get',
        url: 'https://api.wazirx.com/api/v2/tickers',
        headers: {}
    };

    axios(config)
        .then((response) => {
            //   console.log(JSON.stringify(response.data));
            data = JSON.stringify(response.data);
            res.redirect(307, '/cryptos', data);
        })
        .catch((error) => {
            console.log(error);
        });
    // return res.status(200).send('Data Fetched and stored In Database succesfully');
})


// Setting up the size limit of request
app.use(express.json({
    limit: '50mb'
}));



// Import Routes
const cryptoRoute = require('./routes/cryptos');


// Route Middlewares
app.use('/cryptos', cryptoRoute);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})