const ComplainModela = require("../models/complainModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getComplains = catchAsync(async (req, res, next) => {
  const recordExists = await ComplainModela.find({ deleted: false }).lean();
  if (recordExists.length === 0) {
    return res.status(204).end();
  }
  return res.status(200).json({ data: recordExists });
});

exports.addComplains = catchAsync(async (req, res, next) => {
    console.log("called")
  const randomFourDigitNumber = Math.floor(1000 + Math.random() * 9000);

  const body = {
    complainNo: "M0" + randomFourDigitNumber.toString(),
    name: req.body.name,
    email: req.body.email,
    contactNo: req.body.contactNo,
    department: req.body.department,
    status: req.body.status,
    description: req.body.description,
  };
  const newRecordAdded = await ComplainModela.create(body);
  res.status(201).json({
    data: newRecordAdded,
    message: "complain added",
  });
});

exports.getComplainsbyId = catchAsync(async (req, res, next) => {
  const recordExists = await ComplainModela.findById(req.params.id);
  if (!recordExists || recordExists.deleted) {
    return next(new appError(`Gallary Category not found`, 400));
  } else {
    res.status(200).send({ data: recordExists });
  }
});

exports.updateComplain = catchAsync(async (req, res, next) => {
  const Complain = req.params.id;
  const RecordToUpdate = await ComplainModela.findById(Complain);

  if (!RecordToUpdate || RecordToUpdate.deleted) {
    return next(new appError(`gallary Category item not found`, 400));
  }
  const updateData = {
   
    status: req.body.status,
    description: req.body.description,
    active: req.body.active,
    updatedAt: Date.now(),
  };

  if (req.file) {
    updateData.imagePath = req.file.filename;
  }
  await ComplainModela.findByIdAndUpdate(Complain, updateData);
  const updatedRecord = await ComplainModela.findById(Complain);
  res.status(200).json({
    message: "Record updated successfully",
    data: updatedRecord,
  });
});

exports.deleteGallaeyCat = catchAsync(async (req, res, next) => {
  const record = await ComplainModela.findByIdAndUpdate(
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
  const recordExists = await ComplainModela.find().lean();

  if (recordExists.length === 0) {
    return res.status(204).end();
  }

  return res.status(200).json({ data: recordExists });
});
