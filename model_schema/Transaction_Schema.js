const mongoose = require('mongoose');

const Transaction_Schema = new mongoose.Schema({
    trans_date: {
        type: String,
        min: 2,
        max: 1005
    },
    color: {
        type: String,
        min: 2,
        max: 1005
    },
    status: {
        type: String,
        min: 2,
        max: 1005
    },
    code: {
        type: String,
        min: 2,
        max: 1005
    },
    amount: {
        type: Number,
        
    },
    balance: {
        type: Number,
        
    },
    odd: {
        type: Number,
    },
    potential_win: {
        type: Number,
    },
    



    
    
 
});

module.exports = mongoose.model('Transactions',Transaction_Schema);