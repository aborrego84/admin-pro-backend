const mongoose = require('mongoose');
//const dotenv = require ('dotenv').config();

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN/*,{
               // useCreteIndex:true,
            }*/);
            console.log('DB Online');
    }
    catch(error){
        console.log(error);
        throw new Error ('Error start DB see logs');
    }
}
module.exports = {
    dbConnection
}