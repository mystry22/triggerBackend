const express = require('express');
const router = express.Router();
const { allTransactions,saveTransaction,updateTransactions,allWins,allPendings,allLoss, allUnresolved,allresolved } = require('../model/Transaction_Model');
const { getAllUsers, superAdmin, updateBalance } = require('../model/UserModel');
const { signToken, checkLogin } = require('../functions/jwt');
const { comparePassword } = require('../functions/encrypt');
const { toDate, contact, } = require('../functions/Helper_functions');



router.get('/alladmins', async (req, res) => {

    const allAdminUsers = await getAllUsers();
    res.json(allAdminUsers);

});

router.get('/sharevalue', async (req, res) => {

    const divide = await getAllUsers();
    const superData = await superAdmin();
    const balance = superData.balance;
    const sharevalue = parseInt(balance / divide);
    res.json({ msg: sharevalue });
});

router.post('/deduct', async (req, res) => {
    const superData = await superAdmin();
    const balance = superData.balance;
    const amount = req.body.amount;
    const name = req.body.name;

    const data = {
        color: 'yellow',
        status : 'deduct',
        amount: amount,
        code: name,
        trans_date: toDate()
    }

    const value = balance - amount;

    if (value < 0) {
        res.status(200).json({ msg: 'You cannot withdraw more than your available balance' });
    } else {
        await saveTransaction(data);
        await updateBalance(value);

        res.status(200).json({ msg: 'Deduction successful, a notification mail will be sent to all Admins' });


    }

})

router.post('/addition', async (req, res) => {
    const superData = await superAdmin();
    const balance = superData.balance;
    const amount = req.body.amount;
    const name = req.body.name;

    const data = {
        color: 'blue',
        status : 'add',
        amount: amount,
        code: name,
        trans_date: toDate()
    }

    const value = parseInt(balance) + parseInt(amount);


    await updateBalance(value);
    await saveTransaction(data);

    res.status(200).json({ msg: 'Addition successful, a notification mail will be sent to all Admins' });


})

router.get('/transactions', async(req,res)=>{
    const transactions = await allTransactions();
    res.status(200).json(transactions);
    
});

router.post('/play', async(req,res)=>{
    const booking_code = req.body.booking_code;
    const amount  = req.body.amount;
    const superData = await superAdmin();
    const balance = superData.balance;
    const value = balance - amount;

    const data = {
        color: 'white',
        status : 'bookie',
        amount: amount,
        code: booking_code,
        trans_date: toDate(),
        balance: value,
        odd: req.body.odd,
        potential_win: req.body.potential_win,
    }

    await updateBalance(value);
    await saveTransaction(data);


    res.status(200).json({msg:'Bookie placed successfuly'});


})

router.post('/updatebookie',async(req,res)=>{

    const booking_code = req.body.booking_code;
    const amount  = req.body.potential_win;
    const superData = await superAdmin();
    const balance = superData.balance;
    
    const determinant = req.body.determinant;

    if(determinant == 'win'){
        const value = balance + parseInt(amount);
        
        const data = {
            color: 'green',
            status : 'resolved',
            balance: value,
        }
        await updateBalance(value);
        await updateTransactions(booking_code,data);

        res.status(200).json({msg: 'Result updated'});

    }else if(determinant == 'loss'){
        
        const data = {
            color: 'red',
            status : 'resolved',
        
        }
        await updateTransactions(booking_code,data);

        res.status(200).json({msg: 'Result updated'});
    }

})

router.post('/allplays',async(req,res)=>{
    const wins = await allWins();
    const loss = await allLoss();
    const pendings = await allPendings();
    const stats = {wins:wins,loss:loss,pendings:pendings};
    res.status(200).json(stats);
    
})

router.get('/allunresolved',async(req,res)=>{
    const unresolved = await allUnresolved();
    res.status(200).json(unresolved);
})

router.get('/allresolved',async(req,res)=>{
    const resolved = await allresolved();
    res.status(200).json(resolved);
})





module.exports = router;