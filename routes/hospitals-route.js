/*
Route: /api/hospitals-route
*/
const hospitalController = require('../controllers/hospitals-controller');
const {validateFields} = require('../middlewares/validate-fields');
const {Router} = require('express');
const {check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

    router.get('/', validateJWT, hospitalController.getHospitals);
    router.post('/',[   
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        //check('user','User is required').not().isEmpty(),
        //check('email','This is not a valid email').isEmail(),
        validateFields,
        ] ,
        hospitalController.createHospital);
    router.put('/:id',[
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),        
        //check('email','This is not a valid email').isEmail(),
        //check('role', 'Role is required').not().isEmpty(),
        validateFields,
        ],
        hospitalController.updateHospital);
    router.delete('/:id', validateJWT,hospitalController.deleteHospital);

module.exports = router