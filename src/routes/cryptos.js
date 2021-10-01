const router = require('express').Router();
const Crypto = require('../models/crypto');

// Api for posting cypto data
router.post('/', (req,res) => {
   let cryptoData = [];
   console.log("cryptos");
   let count = 10;
   
    for (const key in cryptos) {
        let crypto = cryptos[key];
        if (count >= 1) {
            cryptoData.push({
                name: crypto.name,
                last: crypto.last,
                buy: crypto.buy,
                sell: crypto.sell,
                volume: crypto.volume,
                base_unit: crypto.base_unit
            })
        }
        count--;
    }

    Crypto.create(cryptoData, (err, cryptos) => {
       if (err) {
           res.status(500).send(err);
       }
       else {
           res.status(200).send(cryptos);
       }
   });
   return res.status(200).send("Your data has been saved to Database!")
});


// Api for getting data from database
router.get("/", (req, res) => {
    Crypto.find({}, (err, data) => {
        res.status(200).send(data);
    })
})

module.exports = router;