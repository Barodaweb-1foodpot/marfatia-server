const Withdraw = require("../models/WithdrawMarfatiaModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync")
const withdrowData = require("../Data/WithdrawMarfatia.json")

exports.getAMCcategory = catchAsync(async (req, res, next) => {
  const recordExists = await AMCcategory.find({ deleted: false });
  if (recordExists.length === 0) {
    res.status(204).end();
  } else {
    res.status(200).send({ data: recordExists });
  }
})

exports.addNewWithdrow = catchAsync(async (req, res, next) => {
    try {
      // Create an array to store the promises for creating new categories
      const createCategoryPromises = [];
    
      for (const element of withdrowData) {
        createCategoryPromises.push(Withdraw.create(element));
      }
  
      const createdCategories = await Promise.all(createCategoryPromises);
  
      res.status(201).json({
        data: createdCategories,
        message: "AMC categories added successfully",
      });
    } catch (error) {
      // Handle any errors that may occur during the process
      next(error);
    }
  });
