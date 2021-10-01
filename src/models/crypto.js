const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name:{
        type:String
    },
    last:{
        type:Number
    },
    buy:{
        type:Number
    },
    sell:{
        type:Number
    },
    volume:{
        type:Number
    },
    base_unit:{
        type:String
    }

});

cryptoSchema.index({location: '2dsphere'}, {sparse: true});

module.exports = mongoose.model('Crypto', cryptoSchema);