const DownloadsModel = require("../models/DownloadsModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getDownloads = catchAsync(async (req, res, next) => {
  const recordExists = await DownloadsModel.find({ deleted: false }).lean();
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
    (await DownloadsModel.find({
      fileName: req.body.fileName,
      deleted: false,
    }).count()) === 0;
  if (ItemIsUnique) {
    const newRecordAdded = await DownloadsModel.create(body);
    res.status(201).json({
      data: newRecordAdded,
      message: "Download added successfully",
    });
  } else {
    return next(
      new appError(`record with name '${body.DownloadTitle}' alrady exist`, 400)
    );
  }
});

exports.getDownloadById = catchAsync(async (req, res, next) => {
  const recordExists = await DownloadsModel.findById(req.params.id);
  if (!recordExists || recordExists.deleted) {
    return next(new appError(`Download Category not found`, 400));
  } else {
    res.status(200).send({ data: recordExists });
  }
});

exports.updateDownload = catchAsync(async (req, res, next) => {
  const DownloadId = req.params.id;
  const RecordToUpdate = await DownloadsModel.findById(DownloadId);

  // if (!RecordToUpdate || RecordToUpdate.deleted) {
  //   return next(new appError(`Download Category item not found`, 400));
  // }
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
  await DownloadsModel.findByIdAndUpdate(DownloadId, updateData);
  const updatedRecord = await DownloadsModel.findById(DownloadId);
  res.status(200).json({
    message: "Record updated successfully",
    data: updatedRecord,
  });
});

exports.deleteDownload = catchAsync(async (req, res, next) => {
  const record = await DownloadsModel.findByIdAndUpdate(
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
  const recordExists = await DownloadsModel.find().lean();

  if (recordExists.length === 0) {
    return res.status(204).end();
  }

  return res.status(200).json({ data: recordExists });
});
