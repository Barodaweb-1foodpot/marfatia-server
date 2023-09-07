const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync")
const AMCSchemeData = require("../Data/amcSchemeMaster.json")
const AMCMasterData = require("../Data/amcMaster.json")

const amcSchemeModel = require("../models/amcSchemeModel")

// exports.addNewScheme = catchAsync(async (req, res, next) => {
//     try {
//       const createSchemePromises = [];
//       for (const element of AMCSchemeData) {

//         createSchemePromises.push(amcSchemeModel.create(element));
//       }
  
//       const createdCategories = await Promise.all(createSchemePromises);
  
//       res.status(201).json({
//         data: createdCategories,
//         message: "AMC categories added successfully",
//       });
//     } catch (error) {
//       next(error);
//     }
//   });


exports.getScheme = catchAsync(async (req, res, next) => {

  const recordExists = await amcSchemeModel.find({ deleted: false });
  if (recordExists.length === 0) {
    res.status(204).end();
  } else {
    res.status(200).send({ data: recordExists });
  }

})

exports.addNewScheme = catchAsync(async (req, res, next) => {

  const body = {
    SchemeName: req.body.SchemeName
  };

  const SchemeIsUnique = (await amcSchemeModel.find({ SchemeName: req.body.SchemeName, deleted: false }).count()) === 0;
  if (SchemeIsUnique) {
    const newSchemeAdded = await amcSchemeModel.create(body);
    res
      .status(201)
      .json({
        data: newSchemeAdded,
        message: "Schemeadded successfully",
      });
  } else {
    next(new appError(`Scheme with name '${body.SchemeName}' alrady exist in categories`, 400))
  }
})

exports.getSchemeById = catchAsync(async (req, res, next) => {
  const recordExists = await amcSchemeModel.findById(req.params.id);
  if (!recordExists || recordExists.deleted) {
    next(new appError(`Scheme not found`, 400))
  } else {
    res.status(200).send({ data: recordExists });
  }
})

exports.updateScheme = catchAsync(async (req, res, next) => {
  const SchemeId = req.params.id;
  const SchemeToUpdate = await amcSchemeModel.findById(SchemeId);

  if (!SchemeToUpdate || SchemeToUpdate.deleted) {
    next(new appError(`Scheme not found`, 400))
  }

  const updateData = {};
  // Check if any changes are made before updating the 'updatedAt' field.
  if (SchemeToUpdate.name !== req.body.name) {
    updateData.name = req.body.name;
  }
  if (SchemeToUpdate.description !== req.body.description) {
    updateData.description = req.body.description;
  }

  if (Object.keys(updateData).length === 0) {
    // No changes were made to the Scheme data.
    next(new appError(`No changes were made to the Scheme data`, 400))
  }
  updateData.updatedAt = Date.now();
  await amcSchemeModel.findByIdAndUpdate(SchemeId, updateData);

  // Fetch the updated Scheme from the database.
  const updatedScheme = await amcSchemeModel.findById(SchemeId);
  res
    .status(200)
    .json({
      message: "Scheme updated successfully",
      data: updatedScheme,
    });

})

exports.deleteScheme = catchAsync((req, res, next) => {
  Scheme
    .findByIdAndUpdate(
      req.params.id,
      { deleted: true, deletedAt: Date.now() },
      { new: true }
    )
    .then((updateScheme) => {
      if (!updateScheme) {
        res.status(404).json({ error: { message: "record not Found" } });
      } else {
        res.status(204).end();
      }
    })
    .catch((error) => {
      console.error("Error while deleting  Scheme", error);
      res.status(500).json({ error: { message: "Server error" } });
    });
})

exports.getAllIncDelScheme = catchAsync(async (req, res, next) => {
  const recordExists = await Scheme.find();
  if (recordExists.length === 0) {
    res.status(204).end();
  } else {
    res.status(200).send({ data: recordExists });
  }
})
