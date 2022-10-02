/*
Route: /api/users-route
*/
const userController = require('../controllers/users-controller');
const {validateFields} = require('../middlewares/validate-fields');
const {Router} = require('express');
const {check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/', validateJWT, userController.getUsers);
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('password','Password is required').not().isEmpty(),
        check('email','This is not a valid email').isEmail(),
        validateFields,
    ] ,
    userController.createUser);
router.put('/:id',[
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),        
        check('email','This is not a valid email').isEmail(),
        check('role', 'Role is required').not().isEmpty(),
        validateFields,
    ],
    userController.updateUser);
router.delete('/:id', validateJWT, userController.deleteUser);


module.exports = router;