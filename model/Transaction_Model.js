const Transaction_Schema = require('../model_schema/Transaction_Schema');

const saveTransaction =async(data)=>{
    const newTransaction = new Transaction_Schema(data);
    const res = await newTransaction.save();
    if(res){
        return 'ok';
    }
}

const allTransactions = async()=>{
    const allreqs = await Transaction_Schema.find().sort({_id:-1});
    return allreqs;
}


const updateTransactions = async(bookie,data)=>{
    const allreqs = await Transaction_Schema.updateOne({code:bookie}, {$set:data});
    
}

const allWins = async()=>{
    const allresolved = await Transaction_Schema.find({color: 'green'}).countDocuments();
    return allresolved;
}
const allLoss = async()=>{
    const allresolved = await Transaction_Schema.find({color: 'red'}).countDocuments();
    return allresolved;
}
const allPendings = async()=>{
    const allresolved = await Transaction_Schema.find({color: 'white'}).countDocuments();
    return allresolved;
}

const allUnresolved = async()=>{
    const allresolved = await Transaction_Schema.find({color: 'white'}).sort({_id:-1})
    return allresolved;
}

const allresolved = async()=>{
    const allresolved = await Transaction_Schema.find({status: 'resolved'}).sort({_id:-1}).limit(5)
    return allresolved;
}
module.exports.saveTransaction = saveTransaction;
module.exports.allTransactions = allTransactions;
module.exports.updateTransactions = updateTransactions;
module.exports.allWins = allWins;
module.exports.allLoss = allLoss;
module.exports.allPendings = allPendings;
module.exports.allUnresolved = allUnresolved;
module.exports.allresolved = allresolved;
