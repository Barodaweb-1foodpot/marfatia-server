const newsModela = require("../models/newsModel");

exports.getNews = async (req, res, next) => {
  try {
    const recordExists = await newsModela.find({ deleted: false }).lean();

    if (recordExists.length === 0) {
      return res.status(204).end(); 
    }

    return res.status(200).json({ data: recordExists }); // Respond with 200 OK and the data
  } catch (error) {
    console.error('Error fetching news:', error.message,error.stackTree);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.addNews = catchAsync(async (req, res, next) => {

  const body = {
    newsTitle: req.body.newsTitle,
    newsFeed: req.body.newsFeed,
    date: req.body.date,
    imagePath: req.file ? req.file.filename : "",
    description:req.body.description,
    news: req.body.news
  };
  const newRecordAdded = await newsModela.create(body);
  res.status(201).json({
    data: newRecordAdded,
    message: "News added successfully",
  });
});

exports.getNewsbyId = catchAsync(async (req, res, next) => {
  const recordExists = await newsModela.findById(req.params.id);
  if (!recordExists || recordExists.deleted) {
    return next(new appError(`News not found`, 400));
  } else {
    res.status(200).send({ data: recordExists });
  }
});

exports.updateNews = catchAsync(async (req, res, next) => {
  const News = req.params.id;
  const RecordToUpdate = await newsModela.findById(News);

  if (!RecordToUpdate || RecordToUpdate.deleted) {
    return next(new appError(`News Id  not found`, 400));
  }
  const updateData = {
   
    newsTitle: req.body.newsTitle,
    newsFeed: req.body.newsFeed,
    date: req.body.date,
    news: req.body.news,
    imagePath: req.file ? req.file.filename : "",
    description:req.body.description,

    updatedAt: Date.now(),
  };

 
  await newsModela.findByIdAndUpdate(News, updateData);
  const updatedRecord = await newsModela.findById(News);
  res.status(200).json({
    message: "Record updated successfully",
    data: updatedRecord,
  });
});

exports.deleteNews = catchAsync(async (req, res, next) => {
  const record = await newsModela.findByIdAndUpdate(
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
  const recordExists = await newsModela.find().lean();

  if (recordExists.length === 0) {
    return res.status(204).end();
  }

  return res.status(200).json({ data: recordExists });
});
