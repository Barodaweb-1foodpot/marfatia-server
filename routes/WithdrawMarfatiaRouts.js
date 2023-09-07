const express = require('express');
const {getWithdraw,addNewWithdraw,getWithdrawById,updateWithdraw,deleteWithdraw,getAllIncDelWithdraw} = require('../controllers/withdrowMarfatiaController') 
const router = express.Router();


router.get('/',getWithdraw)
router.post('/',addNewWithdraw)
router.get('/all',getAllIncDelWithdraw)
router.get('/:id',getWithdrawById)
router.put('/:id',updateWithdraw)
router.delete('/:id',deleteWithdraw)


module.exports = router;