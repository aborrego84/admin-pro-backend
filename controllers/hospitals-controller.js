const { response } = require('express');
const HospitalModel = require('../models/hospitals-model');

const getHospitals = async (req,res) => {
    const hospitals = await HospitalModel.find()
                                         .populate('user','name img')
        res.status(400).json({
       ok: true,
       hospitals,uid:req.uid, 
    })
} 

const createHospital = async (req, res = response) => { 
    const {name} = req.body;
    const uid = req.uid;
    const hospital = new HospitalModel({
        user: uid,
        ...req.body
    });        
    try {
        const nameHospExist = await HospitalModel.findOne({name})
        if (nameHospExist)
        {
            return res.status(400).json({ 
                ok: false,
                msg: 'This name is already register.'
            });
        }              
        await hospital.save();            
            res.status(400).json({
                ok: true,
                hospital       
            })
    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg : "Unexpected error.... check logs "           
        })
    }        
} 
const updateHospital = async (req, res = response) =>{
    // validate token and check if is the hospital
    const uid = req.params.id;
    try {
        //check hospital exist in DB
        const hospitalDBExist = await HospitalModel.findById(uid); 
        if(! hospitalDBExist)
        {
            return res.status(404).json({
                ok: false,
                msg: 'The hospital not exists in our system',
            });
        }
        //Updates
        const {name,...fields} = req.body;
        if(hospitalDBExist.name !== name)
        {
            console.log(name);
            const nameHospExist = await HospitalModel.findOne({name})
            if (nameHospExist)
            {
                return res.status(400).json({
                    ok: false,
                    msg: 'This name is already register.'
                });
            }
        }        
        fields.name = name;
        const hospitalUpdate = await HospitalModel.findByIdAndUpdate(uid,fields,{new:true});

        res.json({
            ok: true,
            hospital: hospitalUpdate
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        })
    }
}
 const deleteHospital = async (req,res = response) => {
    const uid = req.params.id;
    try {
        console.log(uid);
        const hospitalDBExist = await HospitalModel.findById(uid); 
        if(! hospitalDBExist)
        {
            return res.status(404).json({
                ok: false,
                msg: 'The hospital with this id not exists in our system',
            });
        }
       
        await HospitalModel.findByIdAndDelete(uid);
        res.json({
            ok:true,
            msg:'The hospital was deleted.'
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
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital,

}