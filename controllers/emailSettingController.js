const emailModel = require("../models/emailSettingModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getEmails = catchAsync(async (req, res, next) => {
  const recordExists = await emailModel.find({ deleted: false }).lean();
  if (recordExists.length === 0) {
    return res.status(204).end();
  }
  return res.status(200).json({ data: recordExists });
});

exports.addNewEmail = catchAsync(async (req, res, next) => {
  const body = {
    mailerName: req.body.mailerName,
    emailAddress: req.body.emailAddress,
    emailPassword: req.body.emailPassword,
    adminEmailAddress: req.body.adminEmailAddress,
    outgoingServer: req.body.outgoingServer,
    sslType: req.body.sslType,
    outgoingPort: req.body.outgoingPort
  };

  console.log(body)
  const ItemIsUnique =
    (await emailModel.find({
        emailAddress: req.body.emailAddress,
      deleted: false,
    }).count()) === 0;
  if (ItemIsUnique) {
    const newRecordAdded = await emailModel.create(body);
    res.status(201).json({
      data: newRecordAdded,
      message: "Email added successfully",
    });
  } else {
    return next(
      new appError(`record with email :-'${body.emailAddress}' alrady exist`, 400)
    );
  }
});

exports.getEmailById = catchAsync(async (req, res, next) => {
  const recordExists = await emailModel.findById(req.params.id);
  if (!recordExists || recordExists.deleted) {
    return next(new appError(`Email  not found`, 400));
  } else {
    res.status(200).send({ data: recordExists });
  }
});

exports.updateEmail = catchAsync(async (req, res, next) => {
  const DownloadId = req.params.id;
  const RecordToUpdate = await emailModel.findById(DownloadId);

  if (!RecordToUpdate || RecordToUpdate.deleted) {
    return next(new appError(`Email item not found`, 400));
  }
  const updateData = {

    mailerName: req.body.mailerName,
    emailAddress: req.body.emailAddress,
    emailPassword: req.body.emailPassword,
    adminEmailAddress: req.body.adminEmailAddress,
    sslType: req.body.sslType,
    outgoingPort: req.body.outgoingPort,
    active: req.body.active,
    updatedAt: Date.now(),
  };


  await emailModel.findByIdAndUpdate(DownloadId, updateData);
  const updatedRecord = await emailModel.findById(DownloadId);
  res.status(200).json({
    message: "Email updated successfully",
    data: updatedRecord,
  });
});

exports.deleteEmail = catchAsync(async (req, res, next) => {
  const record = await emailModel.findByIdAndUpdate(
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
  const recordExists = await emailModel.find().lean();

  if (recordExists.length === 0) {
    return res.status(204).end();
  }

  return res.status(200).json({ data: recordExists });
});
