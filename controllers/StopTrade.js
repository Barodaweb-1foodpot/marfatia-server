const stopTrade = require("../models/StopTrade");
const nodemailer = require("nodemailer");

exports.createStopTrade = async (req, res) => {
    try {
        const { clientCode, registeredEmail, contactNo }  = req.body;
        const add = await new stopTrade(req.body).save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "marwiz.tech@gmail.com",
              pass: "abuoxineboamaqkm",
            },
          });

          let mailOptions = {
            from: 'marwiz.tech@gmail.com', 
            to: 'yunus@marfatia.net',
            subject: 'Request to Stop Trading',
            text: `Please stop trading on the account with the following details:\n
                   Client Code: ${clientCode}\n
                   Registered Email: ${registeredEmail}\n
                   Contact Number: ${contactNo}`
          };
      
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              return res.status(500).send('Error sending email');
            } else {
              console.log('Email sent: ' + info.response);
              res.json(add);
            }
          });
    } catch (error) {
        console.log(error)
      return res.status(500).send(error);
    }
  };