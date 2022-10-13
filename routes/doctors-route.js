/*
Route: /api/doctors-route
*/
const doctorController = require('../controllers/doctors-controller');
const { validateFields } = require('../middlewares/validate-fields');
const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/', validateJWT, doctorController.getDoctors);
router.post('/',
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('hospital', 'Hospital must be valid').isMongoId(),
        validateFields,
    ] ,
    doctorController.createDoctor);
router.put('/:id',[
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),        
       /* check('email','This is not a valid email').isEmail(),
        check('role', 'Role is required').not().isEmpty(),*/
        validateFields,
    ],
    doctorController.updateDoctor);
router.delete('/:id', validateJWT, doctorController.deleteDoctor);


module.exports = router;