const withdraw = require("../models/WithdrawMarfatiaModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getWithdraw = catchAsync(async (req, res, next) => {
  const recordExists = await withdraw.find({ deleted: false });
  if (recordExists.length === 0) {
    res.status(204).end();
  } else {
    res.status(200).send({ data: recordExists });
  }
});

exports.addNewWithdraw = catchAsync(async (req, res, next) => {
  const body = {
    ClientCode: req.body.clinetCode,

    Segment: req.body.segment,
    Name: req.body.name,
    Email: req.body.email,  
    ContactNo: req.body.contactNumber,
    PAN: req.body.panNo,
    Amount: req.body.withdraw,
  };

  // if (WithdrawIsUnique) {
    const newWithdrawAdded = await withdraw.create(body);
    res.status(201).json({
      data: newWithdrawAdded,
      message: "Withdraw added successfully",
    });
  // }
});

exports.getWithdrawById = catchAsync(async (req, res, next) => {
  const recordExists = await withdraw.findById(req.params.id);
  if (!recordExists || recordExists.deleted) {
    next(new appError(`Withdraw not found`, 400));
  } else {
    res.status(200).send({ data: recordExists });
  }
});

exports.updateWithdraw = catchAsync(async (req, res, next) => {
  const WithdrawId = req.params.id;
  const WithdrawToUpdate = await withdraw.findById(WithdrawId);

  if (!WithdrawToUpdate || WithdrawToUpdate.deleted) {
    next(new appError(`Withdraw not found`, 400));
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
    next(new appError(`No changes were made to the Withdraw data`, 400));
  }
  updateData.updatedAt = Date.now();
  await withdraw.findByIdAndUpdate(WithdrawId, updateData);
  const updatedWithdraw = await withdraw.findById(WithdrawId);
  res.status(200).json({
    message: "Withdraw updated successfully",
    data: updatedWithdraw,
  });
});

exports.deleteWithdraw = catchAsync(async (req, res, next) => {
  const amcCategoryToUpdate = await withdraw.findById(req.params.id);

  if (!amcCategoryToUpdate || amcCategoryToUpdate.deleted) {
    next(new appError(`Category not found`, 400));
  }

  const updateData = {
    deleted: true,
    deletedAt: Date.now(),
  };
  await withdraw.findByIdAndUpdate(req.params.id, updateData);
});

exports.getAllIncDelWithdraw = catchAsync(async (req, res, next) => {
  const recordExists = await withdraw.find();
  if (recordExists.length === 0) {
    res.status(204).end();
  } else {
    res.status(200).send({ data: recordExists });
  }
});
