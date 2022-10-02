const { response } = require('express');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/users-model');
const { generateJWT } = require('../helpers/jwt');


const login = async (req,res = response ) => {
    try {
        const {email,password} = req.body;
        const userExist = await UserModel.findOne({email});
        //check email
        if (!userExist)
        {
            return res.status(400).json({
                ok: false,
                msg: 'This email is not register.'
            });
        }
        //check passwords are same
        const pass = bcrypt.compareSync(password,userExist.password); 
        if(! pass)
        {
            return res.status(400).json({
                ok: false,
                msg: 'Password not valid.'
            });
        }
        //generate token -JWT
        const token = await generateJWT(userExist.id);
        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Unexpected error'
        })
    }

}
module.exports = {
    login
}