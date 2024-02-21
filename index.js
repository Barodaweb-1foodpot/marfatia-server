const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express()
const cors = require('cors');
const category = require('./routes/categoryRoutes');
const role = require('./routes/roleRoutes');
const auth = require('./routes/authRouts');
const user = require('./routes/userRouts');
const globleErrorHandler = require('./controllers/errorController')
const AMCcategoryMaster = require('./routes/amcCategoryMasterRouts')
const amcSchemeRouter = require('./routes/amcSchemeRoutes')
const withdraw = require('./routes/WithdrawMarfatiaRouts')
const transfer = require('./routes/TransferRouts')
const banner = require('./routes/bannerRouts')
const gallery = require('./routes/galleryMasterRouts')
const galleryCategory = require('./routes/galleryCategoryRouts')
const Downloads = require('./routes/DownloadsRouts')
const Complain = require('./routes/complainRouts')
const Content = require('./routes/contentRouts')
const News = require('./routes/newsRouts')
const Email = require('./routes/emailSettingRouts')
const quickContect = require('./routes/quickContectRouts')
const Feedback = require("./routes/feedbackRouts")
const DownloadForm = require("./routes/DownloadFormsRouts")

const appError = require('./utils/appError')

var morgan = require('morgan')
app.use(morgan( "dev",
":method :url :status :res[content-length] - :response-time ms - [:date[clf]]"));

app.use(cors())

// -----------database connection--------------
const mongoString = 'mongodb+srv://barodaweb:Barodaweb-mongo2022@cluster0.jruibih.mongodb.net/marfatia_database?retryWrites=true&w=majority';
mongoose.connect(mongoString,{autoIndex:true})
.then(()=>console.log('connected to Database....')).catch(e=>console.log('oops..',e))

app.use(express.json());


app.use('/api/user-images',express.static('images'))
app.use('/api/banner-images',express.static('images/banner'))
app.use('/api/gallery-images',express.static('images/gallery'))
app.use('/api/downloads',express.static('images/downloads'))
app.use('/api/category/',category)
app.use('/api/role/',role)
app.use('/api/auth/',auth)
app.use('/api/user/',user)
app.use('/api/amc-category/',AMCcategoryMaster)
app.use('/api/withdrow',withdraw)
app.use('/api/amc-scheme',amcSchemeRouter)
app.use('/api/transfer',transfer)
app.use('/api/banner',banner)
app.use('/api/gallery',gallery)
app.use('/api/gallery-category',galleryCategory)
app.use('/api/downloads',Downloads)
app.use('/api/complain',Complain)
app.use('/api/content-master',Content)
app.use('/api/news-master',News)
app.use('/api/email-settings',Email)
app.use('/api/quick-connect',quickContect)
app.use('/api/feedback',Feedback)
app.use('/api/download-form',DownloadForm)

app.all('*',(req,res,next)=>{

    return next(new appError(`route ${req.originalUrl} not found!`, 400));

});

app.use(globleErrorHandler)


// -----------starting server--------------
var port = process.env.PORT || 3200;
const server = app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})

process.on('unhandledRejection',err=>{
    console.log(err.name,err.message)
    console.log("UNHANDELED REHJECTION! (0.0) shutting down...");
    server.close(()=>{
        process.exit(1);  
    })
})

