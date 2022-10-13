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
// Read and parse of body
app.use(express.json());

app.use('/api/users',require('./routes/users-route.js'));
app.use('/api/search',require('./routes/searchs-route.js'));
app.use('/api/upload',require('./routes/uploads-route.js'));
app.use('/api/hospitals',require('./routes/hospitals-route.js'));
app.use('/api/doctors',require('./routes/doctors-route.js'));
app.use('/api/login',require('./routes/login-route.js'));


/*app.get('/', (req,res) => {
    res.status(400).json({
       ok: true,
       msg:'Hello World' 
    })
});
*/
//const port = 3000;
app.listen(process.env.PORT, () => {
    console.log('server running in port ' + process.env.PORT)
}); 