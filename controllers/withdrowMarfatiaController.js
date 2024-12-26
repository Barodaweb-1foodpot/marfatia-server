const withdraw = require("../models/WithdrawMarfatiaModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const nodemailer = require("nodemailer");

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

    if(newWithdrawAdded){

      // var transporter = nodemailer.createTransport({
      //   host: "http://smtp-mail.outlook.com/",
      //   port: 587,
      //   auth: {
      //     user: "web@marfatia.net",
      //     pass: "8_fPiz078@1234",
      //   },
      // });
      // const mailOptions = {
      //   from: "web@marfatia.net",
      //   // to: "account@marfatia.net",
      //   to: "dharvi.marwiz@gmail.com",
      //   subject: "Withdraw Funds From Marfatia",
      //   html: "Withdraw Funds request",
      // };
    
      // const sentMail = await transporter.sendMail(mailOptions);
      // console.log(sentMail);

      // const transporter = nodemailer.createTransport({
      //   host: "smtp.gmail.com",
      //     port: 587,
      //     secure: false,
      //     auth: {
      //       user: "web@marfatia.net",
      //       pass: "8_fPiz078@1234",
      //   },
      // });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "marwiz.tech@gmail.com",
          pass: "abuoxineboamaqkm",
        },
      });

      let mailOptions = {
        from: 'marwiz.tech@gmail.com', 
        to: 'account@marfatia.net',
        subject: 'Withdraw Funds From Marfatia',
        text: `Please withdraw funds from marfatia with the following details:\n
               Client Code: ${newWithdrawAdded.ClientCode}\n
               Name: ${newWithdrawAdded.Name}\n
               Email: ${newWithdrawAdded.Email}\n
               Contact Number: ${newWithdrawAdded.ContactNo}\n
               PAN Number: ${newWithdrawAdded.PAN}\n
               Amount: ${newWithdrawAdded.Amount}\n
               Segment: ${newWithdrawAdded.Segment}\n`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).send(error);
        } else {
          console.log('Email sent: ' + info.response);
          // res.json(add);
          res.status(201).json({
            data: newWithdrawAdded,
            message: "Withdraw added successfully",
          });
        }
      });
    }
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
