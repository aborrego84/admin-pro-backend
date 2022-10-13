const jwt = require('jsonwebtoken');
//const { response } = require('express');

const validateJWT = (req,resp,next) => {
    //read token
    const token = req.header('x-token');
    //console.log(token);
    if(! token)
    {
        return resp.status(401).json({
            ok: false,
            msg:'There is not token.'
        });
    }
    try {
        const {uid} = jwt.verify(token,process.env.JWT_SECRET);
        req.uid = uid;
        next();  
    } catch (error) {
        console.log(error);
        return resp.status(401).json({
            ok: false,
            msg:'Token is not valid.'
        });
    }    
}
module.exports = {
    validateJWT
}