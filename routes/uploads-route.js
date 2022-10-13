/*
 route: api/upload
*/
const uploadController = require('../controllers/uploads-controller');
//const { validateFields } = require('../middlewares/validate-fields');
const { Router, application } = require('express');
const expressfileUpload = require('express-fileupload');
//const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();
router.use(expressfileUpload());

router.put('/:table/:id', validateJWT, uploadController.fileUpload);
router.get('/:table/:fileName', validateJWT, uploadController.getFile);

module.exports = router;