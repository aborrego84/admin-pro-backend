const { response } = require('express');
//const bcrypt = require('bcryptjs');
const DoctorModel = require('../models/doctors-model');
//const { generateJWT } = require('../helpers/jwt');

const getDoctors = async (req,res) => {
    const doctors = await DoctorModel.find()
                                     .populate('user','name img')
                                     .populate('hospital','name img')

    res.status(400).json({
       ok: true,
       doctors,uid:req.uid, 
    })
} 

const createDoctor = async (req, res = response) => { 
    //const {name} = req.body;    
    const uid = req.uid;
    const hospital = req.hospital;
    const doctor = new DoctorModel({
        user: uid,
        hospital:hospital,
        ...req.body
    });           
    try {        
        /*const nameDoctorExist = await DoctorModel.findOne({name})
        console.log({nameDoctorExist});       
        if (nameDoctorExist)
        {
            console.log({name});
            return res.status(400).json({
                ok: false,
                msg: 'This name is already register.'
            });
        }*/
        await doctor.save();        
        res.status(400).json({
            ok: true,
            doctor:doctor
        })
    }catch (error){        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg : "Unexpected error.... check logs "           
        })
    }    
} 
const updateDoctor = async (req, res = response) =>{
    // validate token and check if is the hoctor
    const uid = req.params.id;
    try {
        //check hoctor exist in DB
        const doctorDBExist = await DoctorModel.findById(uid); 
        if(! doctorDBExist)
        {
            return res.status(404).json({
                ok: false,
                msg: 'The doctor not exists in our system',
            });
        }
        //Updates
        const {name,...fields} = req.body;
        if(doctorDBExist.name !== name)
        {
            console.log(name);
            const nameDoctorExist = await DoctorModel.findOne({name})
            if (nameDoctorExist)
            {
                return res.status(400).json({
                    ok: false,
                    msg: 'This name is already register.'
                });
            }
        }        
        fields.name = name;
        const doctorUpdate = await DoctorModel.findByIdAndUpdate(uid,fields,{new:true});

        res.json({
            ok: true,
            doctor: doctorUpdate
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        })
    }
}
 const deleteDoctor = async (req,res = response) => {
    const uid = req.params.id;
    try {
        console.log(uid);
        const doctorDBExist = await DoctorModel.findById(uid); 
        if(! doctorDBExist)
        {
            return res.status(404).json({
                ok: false,
                msg: 'The doctor with this id not exists in our system',
            });
        }
       
        await DoctorModel.findByIdAndDelete(uid);
        res.json({
            ok:true,
            msg:'The doctor was deleted.'
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
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,

}