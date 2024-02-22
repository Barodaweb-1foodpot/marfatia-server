const contectModel = require("../models/quickContect");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getContect = catchAsync(async (req, res, next) => {
  const recordExists = await contectModel.find();
  if (recordExists.length === 0) {
    res.status(204).end();
  } else {
    res.status(200).send({ data: recordExists });
  }
});

exports.addNewcontect = catchAsync(async (req, res, next) => {
  
    const newcontectModelAdded = await contectModel.create(req.body);
    res.status(201).json({
      data: newcontectModelAdded,
      message: "operation success thanks for reaching us.",
    });
});

exports.getcontectModelById = catchAsync(async (req, res, next) => {
  const recordExists = await contectModel.findById(req.params.id);
  if (!recordExists || recordExists.deleted) {
    next(new appError(`contectModel not found`, 400));
  } else {
    res.status(200).send({ data: recordExists });
  }
});

exports.updatecontectModel = catchAsync(async (req, res, next) => {
  const contectModelId = req.params.id;
  const contectModelToUpdate = await contectModel.findById(contectModelId);

  if (!contectModelToUpdate || contectModelToUpdate.deleted) {
    next(new appError(`contectModel not found`, 400));
  }

  const updateData = {
    ClientCode: req.body.ClientCode,
    Segment: req.body.Segment,
    Name: req.body.Name,
    Email: req.body.Email,
    ContactNo: req.body.ContactNo,
    PAN: req.body.PAN,
    Amount: req.body.Amount,
  };
  if (Object.keys(updateData).length === 0) {
    next(new appError(`No changes were made to the contectModel data`, 400));
  }
  updateData.updatedAt = Date.now();
  await contectModel.findByIdAndUpdate(contectModelId, updateData);
  const updatedcontectModel = await contectModel.findById(contectModelId);
  res.status(200).json({
    message: "contectModel updated successfully",
    data: updatedcontectModel,
  });
});

exports.deletecontectModel = catchAsync(async (req, res, next) => {
  const amcCategoryToUpdate = await contectModel.findById(req.params.id);

  if (!amcCategoryToUpdate || amcCategoryToUpdate.deleted) {
    next(new appError(`Category not found`, 400));
  }

  const updateData = {
    deleted: true,
    deletedAt: Date.now(),
  };
  await contectModel.findByIdAndUpdate(req.params.id, updateData);
});

exports.getAllIncDelcontectModel = catchAsync(async (req, res, next) => {
  const recordExists = await contectModel.find();
  if (recordExists.length === 0) {
    res.status(204).end();
  } else {
    res.status(200).send({ data: recordExists });
  }
});
