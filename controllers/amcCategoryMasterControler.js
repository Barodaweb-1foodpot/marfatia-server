const amcCategory = require("../models/amcCategoryMasterModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getamcCategory = catchAsync(async (req, res, next) => {
  const recordExists = await amcCategory.find({ deleted: false });
  if (recordExists.length === 0) {
    res.status(204).end();
  } else {
    res.status(200).send({ data: recordExists });
  }
});

exports.addNewAmcCategory = catchAsync(async (req, res, next) => {
  const body = {
    CategoryName: req.body.CategoryName,
  };
  const amcCategoryIsUnique =
    (await amcCategory.find({ body, deleted: false }).count()) === 0;
  if (amcCategoryIsUnique) {
    const newamcCategoryAdded = await amcCategory.create(req.body);
    res.status(201).json({
      data: newamcCategoryAdded,
      message: "amcCategory added successfully",
    });
  } else {
    next(
      new appError(
        `amcCategory with name '${body.CategoryName}' alrady exist in categories`,
        400
      )
    );
  }
});

exports.getaAcCategoryById = catchAsync(async (req, res, next) => {
  const recordExists = await amcCategory.findById(req.params.id);
  if (!recordExists || recordExists.deleted) {
    next(new appError(`amcCategory not found`, 400));
  } else {
    res.status(200).send({ data: recordExists });
  }
});

exports.updateAmcCategory = catchAsync(async (req, res, next) => {
  const amcCategoryId = req.params.id;
  const amcCategoryToUpdate = await amcCategory.findById(amcCategoryId);

  if (!amcCategoryToUpdate || amcCategoryToUpdate.deleted) {
    next(new appError(`amcCategory not found`, 400));
  }

  const updateData = {
    CategoryName: req.body.CategoryName,
    updatedAt: Date.now(),
  };
  await amcCategory.findByIdAndUpdate(amcCategoryId, updateData, { new: true });

  // Fetch the updated amcCategory from the database.
  const updatedamcCategory = await amcCategory.findById(amcCategoryId);
  res.status(200).json({
    message: "amcCategory updated successfully",
    data: updatedamcCategory,
  });
});

exports.deleteamcCategory = catchAsync(async (req, res, next) => {
  const amcCategoryToUpdate = await amcCategory.findById(req.params.id);

  if (!amcCategoryToUpdate || amcCategoryToUpdate.deleted) {
    next(new appError(`Category not found`, 400));
  }

  const updateData = {
    deleted: true,
    deletedAt: Date.now(),
  };
  await amcCategory.findByIdAndUpdate(req.params.id, updateData);
});

exports.getAllIncDelAmcCategory = catchAsync(async (req, res, next) => {
  const recordExists = await amcCategory.find();
  if (recordExists.length === 0) {
    res.status(204).end();
  } else {
    res.status(200).send({ data: recordExists });
  }
});
