const AMCMaster = require("../models/amcMasterModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAmc = catchAsync(async (req, res, next) => {
  const recordExists = await AMCMaster.find({ deleted: false }).lean();
  if (recordExists.length === 0) {
    return res.status(204).end();
  }
  return res.status(200).json({ data: recordExists });
});

exports.addNewAmc = catchAsync(async (req, res, next) => {
  const body = {
    AMCName: req.body.AMCName,
  };
  const CategoryIsUnique =
    (await AMCMaster.find({
      AMCName: req.body.AMCName,
      deleted: false,
    }).count()) === 0;
  if (CategoryIsUnique) {
    const newCategoryAdded = await AMCMaster.create(body);
    res.status(201).json({
      data: newCategoryAdded,
      message: "Category added successfully",
    });
  } else {
    return next(
      new appError(
        `category with name '${body.AMCName}' alrady exist in categories`,
        400
      )
    );
  }
});

exports.getAmcById = catchAsync(async (req, res, next) => {
  const recordExists = await AMCMaster.findById(req.params.id);
  if (!recordExists || recordExists.deleted) {
    return next(new appError(`Amc not found`, 400));
  } else {
    res.status(200).send({ data: recordExists });
  }
});

exports.updateAmc = catchAsync(async (req, res, next) => {
  const AmcId = req.params.id;
  const AmcToUpdate = await AMCMaster.findById(AmcId);

  if (!AmcToUpdate || AmcToUpdate.deleted) {
    return next(new appError(`Amc not found`, 400));
  }

  const updateData = {
    AMCName: req.body.AMCName,
    updatedAt: Date.now(),
  };

  await AMCMaster.findByIdAndUpdate(AmcId, updateData);
  const updatedAmc = await AMCMaster.findById(AmcId);
  res.status(200).json({
    message: "Amc updated successfully",
    data: updatedAmc,
  });
});

exports.deleteAmc = catchAsync(async (req, res, next) => {
  const amcCategoryToUpdate = await AMCMaster.findById(req.params.id);

  if (!amcCategoryToUpdate || amcCategoryToUpdate.deleted) {
    return next(new appError(`Category not found`, 400));
  }

  const updateData = {
    deleted: true,
    deletedAt: Date.now(),
  };
  await AMCMaster.findByIdAndUpdate(req.params.id, updateData);
  return res.status(204).end();
});

exports.getAllIncDelAmc = catchAsync(async (req, res, next) => {
  const recordExists = await AMCMaster.find().lean();

  if (recordExists.length === 0) {
    return res.status(204).end();
  }

  return res.status(200).json({ data: recordExists });
});
