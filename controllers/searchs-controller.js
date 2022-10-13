const { response } = require('express');
const UserModel = require('../models/users-model');
const DoctorModel = require('../models/doctors-model');
const HospitalModel = require('../models/hospitals-model');
const { selectFields } = require('express-validator/src/select-fields');

const getSearch = async (req, res = response) =>{
    const search = req.params.search;
    const regExp = new RegExp(search,'i');    
    if (!search)
    {
        return res.status(404).json({
            ok: false,
            msg: 'There are nothing to search',
        });
    }
    try{
    const [users,hospitals,doctors] = await Promise.all([
        UserModel.find({name:regExp},'name email role google'),
        HospitalModel.find({name:regExp},'name user img'),
        DoctorModel.find({name:regExp},'name user hospital img'),            
    ])
    res.json({
        ok: true,
        users,
        hospitals,
        doctors,
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        })
    }
}
const getTableSearch = async (req, res = response) =>{
    const table = req.params.table;
    const search = req.params.search;
    const regExp = new RegExp(search,'i');    
    if (!search)
    {
        return res.status(404).json({
            ok: false,
            msg: 'There are not criteria to search',
        });
    }    
    try{
        let data;
        switch( table){
            case 'users':
                data = await UserModel.find({name:regExp},'name email role google');
            break;
            case 'hospitals':
                data = await HospitalModel.find({name:regExp},'name user img')
                                          .populate('user','name img');
            break;
            case 'doctors':
                data = await DoctorModel.find({name:regExp},'name user hospital img')
                                        .populate('user','name img')
                                        .populate('hospital','name img');
            break;
            default:
                return res.status(404).json({
                    ok: false,
                    msg: 'There are nothing to search',
                }); 
        } 
        res.json({
            ok: true,
            results:data
        });     
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        })
    }
}



module.exports = {
    getSearch,
    getTableSearch
}