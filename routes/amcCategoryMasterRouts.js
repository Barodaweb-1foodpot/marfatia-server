const express = require('express');
const {getAMCcategory,getAMCcategoryById,addNewAMCcategory,getAllIncDelAMCcategory,updateAMCcategory, deleteAMCcategory} = require('../controllers/amcCategoryMasterControler') 
const router = express.Router();


router.get('/',getAMCcategory)
router.get('/all',getAllIncDelAMCcategory)
router.post('/',addNewAMCcategory)
router.get('/:id',getAMCcategoryById)
router.put('/:id',updateAMCcategory)
router.delete('/:id',deleteAMCcategory)


module.exports = router;