const UserSchema = require('../model_schema/User_Schema');

const signup =async(data)=>{
    const newUser = new UserSchema(data);
    const res = await newUser.save();
}

const checkEmail = async(data)=>{
    const user = await UserSchema.findOne(data);
    return user;
}

const getDetails = async function(data){
    const userdata = await UserSchema.findOne(data);
    return userdata;
}

const getAllUsers = async function(){
    const userdata = await UserSchema.find({role : 'Admin'}).countDocuments();
    return userdata;
}

const superAdmin = async function(){
    const userdata = await UserSchema.findOne({role: 'Superadmin'});
    return userdata;
}

const updateBalance = async function(value){
    const userdata = await UserSchema.updateOne({role: 'Superadmin'},{$set : {balance: value}});
    return userdata;
}





module.exports.signup = signup;
module.exports.checkEmail = checkEmail;
module.exports.getDetails = getDetails;
module.exports.getAllUsers = getAllUsers;
module.exports.superAdmin = superAdmin;
module.exports.updateBalance = updateBalance;
