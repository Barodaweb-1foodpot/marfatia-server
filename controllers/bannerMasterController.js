const BannerMasterModel = require("../models/bannerModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getBanner = catchAsync(async (req, res, next) => {
  const recordExists = await BannerMasterModel.find({ deleted: false }).lean();
  if (recordExists.length === 0) {
    return res.status(204).end();
  }
  return res.status(200).json({ data: recordExists });
});

exports.addNewBanner = catchAsync(async (req, res, next) => {
  const body = {
    bannerTitle: req.body.bannerTitle,
    description: req.body.description,
    bannerText: req.body.bannerText,
    imagePath: req.file ? req.file.filename : "not given",
  };
  const BannerIsUnique =
    (await BannerMasterModel.find({
      bannerTitle: req.body.bannerTitle,
      deleted: false,
    }).count()) === 0;
  if (BannerIsUnique) {
    const newBannerAdded = await BannerMasterModel.create(body);
    res.status(201).json({
      data: newBannerAdded,
      message: "Banner added successfully",
    });
  } else {
    return next(
      new appError(`banner with name '${body.bannerTitle}' alrady exist`, 400)
    );
  }
});

exports.getBannerById = catchAsync(async (req, res, next) => {
  const recordExists = await BannerMasterModel.findById(req.params.id);
  if (!recordExists || recordExists.deleted) {
    return next(new appError(`Banner not found`, 400));
  } else {
    res.status(200).send({ data: recordExists });
  }
});

exports.updateBanner = catchAsync(async (req, res, next) => {
  const BannerId = req.params.id;
  const BannerToUpdate = await BannerMasterModel.findById(BannerId);

  if (!BannerToUpdate || BannerToUpdate.deleted) {
    return next(new appError(`Banner not found`, 400));
  }
  const updateData = {
    bannerTitle: req.body.bannerTitle,
    description: req.body.description,
    bannerText: req.body.bannerText,
    active:req.body.active,
    updatedAt: Date.now(),
  };
  if (req.file) {
    updateData.imagePath = req.file.filename;
  }
  await BannerMasterModel.findByIdAndUpdate(BannerId, updateData);
  const updatedBanner = await BannerMasterModel.findById(BannerId);
  res.status(200).json({
    message: "Banner updated successfully",
    data: updatedBanner,
  });
});

exports.deleteBanner = catchAsync(async (req, res, next) => {
  const banner = await BannerMasterModel.findByIdAndUpdate(
    req.params.id,
    {
      deleted: true,
      deletedAt: new Date(),
    },
    { new: true }
  );

  if (!banner) {
    return res.status(404).json({ message: "Banner not found" });
  }

  return res.status(204).end();
});

exports.getAllIncDelBanner = catchAsync(async (req, res, next) => {
  const recordExists = await BannerMasterModel.find().lean();

  if (recordExists.length === 0) {
    return res.status(204).end();
  }

  return res.status(200).json({ data: recordExists });
});
