//console.log("Hello World");

const express = require('express');
//require ('dotenv').config();
const dotenv = require ('dotenv').config();
const {dbConnection} = require ('./database/config');

const cors = require ('cors');
//create server express
const app = express();
//database
dbConnection();
//Route
//config CORS 
app.use( cors() );


app.get('/', (req,res) => {
    res.status(400).json({
       ok: true,
       msg:'Hello World' 
    })
});
//const port = 3000;
app.listen(process.env.PORT, () => {
    console.log('server running in port ' + process.env.PORT)
}); 