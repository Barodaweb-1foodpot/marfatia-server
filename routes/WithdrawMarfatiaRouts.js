const express = require('express');
const {addNewWithdrow} = require('../controllers/withdrowMarfatiaController') 
const router = express.Router();


router.get('/',addNewWithdrow)


module.exports = router;