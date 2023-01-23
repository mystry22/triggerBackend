const express = require('express');
const router = express.Router();
const {signup,checkEmail,getDetails,getAllUsers} = require('../model/UserModel');
const {encrypty} = require('../functions/encrypt');
const {signToken,checkLogin} = require('../functions/jwt');
const {toDate} = require('../functions/Helper_functions');

router.post('/register',async(req,res)=>{
  
  try{
        const pass = req.body.pass;
        const hashedPassword = await encrypty(pass);
        const email = req.body.email;
      
        const check = {email:req.body.email};
        const data = {
          first_name : req.body.first_name,
          last_name : req.body.last_name,
          phone: req.body.phone,
          email: req.body.email,
          balance: req.body.balance,
          role: req.body.role,
          reg_date : toDate(),
          uniquekey: hashedPassword
        }
        const payload = {email : email};
      
        const signedUp = await checkEmail(check);
          if(signedUp){
            res.json({msg:'user already has an account'});
          }else{
            signup(data);
            const token = await signToken(payload);
            //welcome(email);
            res.json({msg:'registration okay', token:token});
          }

      }catch(err){
        res.status(404).json('Oga try send correct thing na');
      }
   
    
  });

  



  module.exports = router;


