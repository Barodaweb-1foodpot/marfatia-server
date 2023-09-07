const transfersModel = require("../models/TrnsferModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync")
const withdrowData = require("../Data/ TransferMarfatia.json")


exports.addNewTransfer = catchAsync(async (req, res, next) => {
    try {
      // Create an array to store the promises for creating new categories
      const createCategoryPromises = [];
    
      for (const element of withdrowData) {
        createCategoryPromises.push(transfersModel.create(element));
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
