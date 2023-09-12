const contentModela = require("../models/contentModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getContents = catchAsync(async (req, res, next) => {
  const recordExists = await contentModela.find({ deleted: false }).lean();
  if (recordExists.length === 0) {
    return res.status(204).end();
  }
  return res.status(200).json({ data: recordExists });
});

exports.addContents = catchAsync(async (req, res, next) => {

  const body = {
    contentType: req.body.contentType,
    content: req.body.content
  };
  const newRecordAdded = await contentModela.create(body);
  res.status(201).json({
    data: newRecordAdded,
    message: "Content added",
  });
});

exports.getContentsbyId = catchAsync(async (req, res, next) => {
  const recordExists = await contentModela.findById(req.params.id);
  if (!recordExists || recordExists.deleted) {
    return next(new appError(`Content not found`, 400));
  } else {
    res.status(200).send({ data: recordExists });
  }
});

exports.updateContent = catchAsync(async (req, res, next) => {
  const Content = req.params.id;
  const RecordToUpdate = await contentModela.findById(Content);

  if (!RecordToUpdate || RecordToUpdate.deleted) {
    return next(new appError(`gallary Category item not found`, 400));
  }
  const updateData = {
   
    contentType: req.body.contentType,
    content: req.body.content,
    active: req.body.active,
    updatedAt: Date.now(),
  };

 
  await contentModela.findByIdAndUpdate(Content, updateData);
  const updatedRecord = await contentModela.findById(Content);
  res.status(200).json({
    message: "Record updated successfully",
    data: updatedRecord,
  });
});

exports.deleteContent = catchAsync(async (req, res, next) => {
  const record = await contentModela.findByIdAndUpdate(
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
  const recordExists = await contentModela.find().lean();

  if (recordExists.length === 0) {
    return res.status(204).end();
  }

  return res.status(200).json({ data: recordExists });
});
