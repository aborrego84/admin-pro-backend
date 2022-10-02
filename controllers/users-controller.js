//Import to improve work with code
const { response } = require('express');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/users-model');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req,res) => {
    const users = await UserModel.find({},'name email role google');

    res.status(400).json({
       ok: true,
       users,uid:req.uid,
    })
} 

const createUser = async (req, res = response) => { 
    const {name,password,email} = req.body;
    const user = new UserModel(req.body);  
    
    
    try {
        const emailExist = await UserModel.findOne({email})
        if (emailExist)
        {
            return res.status(400).json({
                ok: false,
                msg: 'This email is already register.'
            });
        }
        //encrypt pass
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password,salt);
        //const token = await generateJWT(userExist.id);
        //save user
        await user.save();
            const token = await generateJWT(user.id);
            //user.token = token;
            res.status(400).json({
                ok: true,
                user,                
                token
    })

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg : "Unexpected error.... check logs "           
        })
    }
    
} 
const updateUser = async (req, res = response) =>{
    // validate token and check if is the user
    const uid = req.params.id;
    try {
        //check user exist in DB
        const userDBExist = await UserModel.findById(uid); 
        if(! userDBExist)
        {
            return res.status(404).json({
                ok: false,
                msg: 'The user not exists in our system',
            });
        }
        //Updates
        const {password, google, email,...fields} = req.body;
        if(userDBExist.email !== email)
        {
            const emailExist = await UserModel.findOne({email})
            if (emailExist)
            {
                return res.status(400).json({
                    ok: false,
                    msg: 'This email is already register.'
                });
            }
        }        
        fields.email = email;
        const userUpdate = await UserModel.findByIdAndUpdate(uid,fields,{new:true});

        res.json({
            ok: true,
            user: userUpdate
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        })
    }
}
 const deleteUser = async (req,res = response) => {
   /* const uid = req.params.id;
    try {
        const user = await UserModel.findByIdAndDelete({_id:uid});
        return res.status(400).json({
        ok: true,
        msg:'The user was delete.'
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
    
        })
    } */
    const uid = req.params.id;
    try {
        console.log(uid);
        const userDBExist = await UserModel.findById(uid); 
        if(! userDBExist)
        {
            return res.status(404).json({
                ok: false,
                msg: 'The user with this id not exists in our system',
            });
        }
       
        await UserModel.findByIdAndDelete(uid);
        res.json({
            ok:true,
            msg:'The user was deleted.'
        });
        
    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        })
    }
}
    


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser

}