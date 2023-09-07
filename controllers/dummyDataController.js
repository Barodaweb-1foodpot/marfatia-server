// const AMCModel = require("../models/amcMasterModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync")
const AMCcategoryData = require("../Data/amcCategoryMaster.json")
const AMCMasterData = require("../Data/amcMaster.json")

const amcSchemeModel = require("../models/amcSchemeModel")

exports.addNewWithdrow = catchAsync(async (req, res, next) => {
    try {
      const createCategoryPromises = [];
      //loop thrugh data
      for (const element of AMCMasterData) {

        createCategoryPromises.push(AMCModel.create(element));
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
