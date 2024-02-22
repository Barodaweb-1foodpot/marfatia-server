const feedbackModel = require("../models/feedbackModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getFeedback = catchAsync(async (req, res, next) => {
  const recordExists = await feedbackModel.find();
  if (recordExists.length === 0) {
    res.status(204).end();
  } else {
    res.status(200).send({ data: recordExists });
  }
});

exports.addNewFeedback = catchAsync(async (req, res, next) => {
  
    const newFeedbackAdded = await feedbackModel.create(req.body);
    res.status(201).json({
      data: newFeedbackAdded,
      message: "Feedback added successfully",
    });
});

exports.getFeedbackById = catchAsync(async (req, res, next) => {
  const recordExists = await feedbackModel.findById(req.params.id);
  if (!recordExists || recordExists.deleted) {
    next(new appError(`Feedback not found`, 400));
  } else {
    res.status(200).send({ data: recordExists });
  }
});

exports.updateFeedback = catchAsync(async (req, res, next) => {
  const FeedbackId = req.params.id;
  const FeedbackToUpdate = await feedbackModel.findById(FeedbackId);

  if (!FeedbackToUpdate || FeedbackToUpdate.deleted) {
    next(new appError(`Feedback not found`, 400));
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
    next(new appError(`No changes were made to the Feedback data`, 400));
  }
  updateData.updatedAt = Date.now();
  await feedbackModel.findByIdAndUpdate(FeedbackId, updateData);
  const updatedFeedback = await feedbackModel.findById(FeedbackId);
  res.status(200).json({
    message: "Feedback updated successfully",
    data: updatedFeedback,
  });
});

exports.deleteFeedback = catchAsync(async (req, res, next) => {
  const amcCategoryToUpdate = await feedbackModel.findById(req.params.id);

  if (!amcCategoryToUpdate || amcCategoryToUpdate.deleted) {
    next(new appError(`Category not found`, 400));
  }

  const updateData = {
    deleted: true,
    deletedAt: Date.now(),
  };
  await feedbackModel.findByIdAndUpdate(req.params.id, updateData);
});

exports.getAllIncDelFeedback = catchAsync(async (req, res, next) => {
  const recordExists = await feedbackModel.find();
  if (recordExists.length === 0) {
    res.status(204).end();
  } else {
    res.status(200).send({ data: recordExists });
  }
});
