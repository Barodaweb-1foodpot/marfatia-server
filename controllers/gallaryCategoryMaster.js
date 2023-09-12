const gallaryCategoryModel = require("../models/galleryCategoryMasterModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getGallaryCategories = catchAsync(async (req, res, next) => {
  const recordExists = await gallaryCategoryModel.find({ deleted: false }).lean();
  if (recordExists.length === 0) {
    return res.status(204).end();
  }
  return res.status(200).json({ data: recordExists });
});

exports.addNewGallaryCategory = catchAsync(async (req, res, next) => {
  const body = {
    gallaryCategoryTitle: req.body.gallaryCategoryTitle,
    description: req.body.description,
    imagePath: req.file ? req.file.filename : "",
  };
  const ItemIsUnique =
    (await gallaryCategoryModel.find({
        gallaryCategoryTitle: req.body.gallaryCategoryTitle,
      deleted: false,
    }).count()) === 0;
  if (ItemIsUnique) {
    const newRecordAdded = await gallaryCategoryModel.create(body);
    res.status(201).json({
      data: newRecordAdded,
      message: "image added in gallary added successfully",
    });
  } else {
    return next(
      new appError(`record with name '${body.gallaryCategoryTitle}' alrady exist`, 400)
    );
  }
});

exports.getGallaryCatById = catchAsync(async (req, res, next) => {
  const recordExists = await gallaryCategoryModel.findById(req.params.id);
  if (!recordExists || recordExists.deleted) {
    return next(new appError(`Gallary Category not found`, 400));
  } else {
    res.status(200).send({ data: recordExists });
  }
});

exports.updateGallaryCat = catchAsync(async (req, res, next) => {
  const GallaryId = req.params.id;
  const RecordToUpdate = await gallaryCategoryModel.findById(GallaryId);

  if (!RecordToUpdate || RecordToUpdate.deleted) {
    return next(new appError(`gallary Category item not found`, 400));
  }
  const updateData = {
    gallaryCategoryTitle: req.body.gallaryCategoryTitle,
    description: req.body.description,
    active:req.body.active,
    updatedAt: Date.now(),
  };

  if (req.file) {
    updateData.imagePath = req.file.filename;
  }
  await gallaryCategoryModel.findByIdAndUpdate(GallaryId, updateData);
  const updatedRecord = await gallaryCategoryModel.findById(GallaryId);
  res.status(200).json({
    message: "Record updated successfully",
    data: updatedRecord,
  });
});

exports.deleteGallaeyCat = catchAsync(async (req, res, next) => {
  const record = await gallaryCategoryModel.findByIdAndUpdate(
    req.params.id,
    {
      deleted: true,
      deletedAt: new Date(),
    },
    { new: true }
  );

  if (!record) {
    return res.status(404).json({ message: "record not found" });
  }

  return res.status(204).end();
});

exports.getAllIncDel = catchAsync(async (req, res, next) => {
  const recordExists = await gallaryCategoryModel.find().lean();

  if (recordExists.length === 0) {
    return res.status(204).end();
  }

  return res.status(200).json({ data: recordExists });
});
