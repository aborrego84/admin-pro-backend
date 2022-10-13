/*
 route: api/search
*/
const searchController = require('../controllers/searchs-controller');
//const { validateFields } = require('../middlewares/validate-fields');
const { Router } = require('express');
//const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/:search', validateJWT, searchController.getSearch);
router.get('/:table/:search', validateJWT, searchController.getTableSearch);

module.exports = router;