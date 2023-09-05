const AMCcategory = require("../models/amcCategoryMasterModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync")

exports.getAMCcategory = catchAsync(async (req, res, next) => {

  const recordExists = await AMCcategory.find({ deleted: false });
  if (recordExists.length === 0) {
    res.status(204).end();
  } else {
    res.status(200).send({ data: recordExists });
  }

})

exports.addNewAMCcategory = catchAsync(async (req, res, next) => {
    const { CategoryName } = req.body;
  
    // Create an array to store the promises for creating new categories
    const createCategoryPromises = [];
  
    for (const element of CategoryName) {
    //   const AMCcategoryIsUnique = (await AMCcategory.find({ CategoryName: element, deleted: false }).count()) === 0;
      
     // if (AMCcategoryIsUnique) {
        // Push the promise for creating a new category into the array
       // createCategoryPromises.push(AMCcategory.create({ CategoryName: element }));
     // } else {
       // return next(new appError(`AMCcategory with name '${element}' already exists in categories`, 400));
      //}
    }
  
    // Use Promise.all to execute all the create category promises concurrently
    Promise.all(createCategoryPromises)
      .then((createdCategories) => {
        res.status(201).json({
          data: createdCategories,
          message: "AMC categories added successfully",
        });
      })
      .catch((error) => {
        next(error); // Handle any errors that occurred during category creation
      });
  });
  

  



exports.getAMCcategoryById = catchAsync(async (req, res, next) => {
  const recordExists = await AMCcategory.findById(req.params.id);
  if (!recordExists || recordExists.deleted) {
    next(new appError(`AMCcategory not found`, 400))
  } else {
    res.status(200).send({ data: recordExists });
  }
})

exports.updateAMCcategory = catchAsync(async (req, res, next) => {
  const AMCcategoryId = req.params.id;
  const AMCcategoryToUpdate = await AMCcategory.findById(AMCcategoryId);

  if (!AMCcategoryToUpdate || AMCcategoryToUpdate.deleted) {
    next(new appError(`AMCcategory not found`, 400))
  }

  const updateData = {};
  // Check if any changes are made before updating the 'updatedAt' field.
  if (AMCcategoryToUpdate.CategoryName !== req.body.CategoryName) {
    updateData.CategoryName = req.body.CategoryName;
  }
  if (AMCcategoryToUpdate.description !== req.body.description) {
    updateData.description = req.body.description;
  }

  if (Object.keys(updateData).length === 0) {
    // No changes were made to the AMCcategory data.
    next(new appError(`No changes were made to the AMCcategory data`, 400))
  }
  updateData.updatedAt = Date.now();
  await AMCcategory.findByIdAndUpdate(AMCcategoryId, updateData);

  // Fetch the updated AMCcategory from the database.
  const updatedAMCcategory = await AMCcategory.findById(AMCcategoryId);
  res
    .status(200)
    .json({
      message: "AMCcategory updated successfully",
      data: updatedAMCcategory,
    });

})

exports.deleteAMCcategory = catchAsync((req, res, next) => {
  AMCcategory
    .findByIdAndUpdate(
      req.params.id,
      { deleted: true, deletedAt: Date.now() },
      { new: true }
    )
    .then((updateAMCcategory) => {
      if (!updateAMCcategory) {
        res.status(404).json({ error: { message: "record not Found" } });
      } else {
        res.status(204).end();
      }
    })
    .catch((error) => {
      console.error("Error while deleting  AMCcategory", error);
      res.status(500).json({ error: { message: "Server error" } });
    });
})

exports.getAllIncDelAMCcategory = catchAsync(async (req, res, next) => {
  const recordExists = await AMCcategory.find();
  if (recordExists.length === 0) {
    res.status(204).end();
  } else {
    res.status(200).send({ data: recordExists });
  }
})
