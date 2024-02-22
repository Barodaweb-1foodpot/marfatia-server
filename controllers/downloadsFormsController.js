const DownloadFormModel = require("../models/DownloadsFormModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getDownloads = catchAsync(async (req, res, next) => {
  const recordExists = await DownloadFormModel.find({ deleted: false }).lean();
  if (recordExists.length === 0) {
    return res.status(204).end();
  }
  return res.status(200).json({ data: recordExists });
});

exports.addNewDownload = catchAsync(async (req, res, next) => {
  const body = {
    fileName: req.body.fileName,
    description: req.body.description,
    filePath: req.file ? req.file.filename : "",
  };

  const ItemIsUnique =
    (await DownloadFormModel.find({
      fileName: req.body.fileName,
      deleted: false,
    }).count()) === 0;
  if (ItemIsUnique) {
    const newRecordAdded = await DownloadFormModel.create(body);
    res.status(201).json({
      data: newRecordAdded,
      message: "Download added successfully",
    });
  } else {
    return next(
      new appError(`record with name '${body.fileName}' alrady exist`, 400)
    );
  }
});

exports.getDownloadById = catchAsync(async (req, res, next) => {
  const recordExists = await DownloadFormModel.findById(req.params.id);
  if (!recordExists || recordExists.deleted) {
    return next(new appError(`Download Category not found`, 400));
  } else {
    res.status(200).send({ data: recordExists });
  }
});

exports.updateDownload = catchAsync(async (req, res, next) => {
  const DownloadId = req.params.id;
  const RecordToUpdate = await DownloadFormModel.findById(DownloadId);

  if (!RecordToUpdate || RecordToUpdate.deleted) {
    return next(new appError(`Download Category item not found`, 400));
  }
  const updateData = {

    fileName: req.body.fileName,
    description: req.body.description,
    filePath: req.file ? req.file.filename : "",

    active: req.body.active,
    updatedAt: Date.now(),
  };

  if (req.file) {
    updateData.filePath = req.file.filename;
  }
  await DownloadFormModel.findByIdAndUpdate(DownloadId, updateData);
  const updatedRecord = await DownloadFormModel.findById(DownloadId);
  res.status(200).json({
    message: "Record updated successfully",
    data: updatedRecord,
  });
});

exports.deleteDownload = catchAsync(async (req, res, next) => {
  const record = await DownloadFormModel.findByIdAndUpdate(
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
  const recordExists = await DownloadFormModel.find().lean();

  if (recordExists.length === 0) {
    return res.status(204).end();
  }

  return res.status(200).json({ data: recordExists });
});
