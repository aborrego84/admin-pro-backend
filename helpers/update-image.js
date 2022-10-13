//const { response } = require('express');
const fs = require('fs');
const UserModel = require('../models/users-model');
const DoctorModel = require('../models/doctors-model');
const HospitalModel = require('../models/hospitals-model');

const updateImage = async (table,id,fileName) => {
    let data;
    switch( table){
        case 'users': 
            data = await UserModel.findById(id);                
        break;
        case 'hospitals':
            data = await HospitalModel.findById(id);                
        break;
        case 'doctors':
            data = await DoctorModel.findById(id);
        break;            
    }
    if(!data)
    {
        return false;
    }
    const oldPath = `./uploads/${table}/${data.img}`;
    if(fs.existsSync(oldPath))
    {
        //delete old image
        fs.unlinkSync(oldPath);
    }
    data.img = fileName;
    await data.save();
    return true;
}

module.exports = {
    updateImage
} 