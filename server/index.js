const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require("cors")
const db = require('./db/conn');
db.dbConnect();

const app = express();
app.use(bodyParser.json());

const whitelist = ['http://localhost:3000', 'https://dipronil-expenses.netlify.app'];
const corsOptions = {
  origin(origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));


const {pageNotFound} = require('./utils/PageNotFound');
const {errorHandler} = require('./utils/ErrorHandler');
const expensesRoute=require('./route/expense');
const authRoute=require('./route/auth');
const backupRoute=require('./route/backup');
const reminderRoute=require('./route/reminder');
const { updateAmountToZero } = require('./helper/updateAmountToZero');
const port = process.env.port;
// updateAmountToZero();
app.get('/', (req,res)=>{
    res.status(200).json({"message":"index"})
})
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/expenses', expensesRoute);
app.use('/api/v1/backup', backupRoute);
app.use('/api/v1/reminder', reminderRoute);
app.use(pageNotFound);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log("Dip");
    console.log(`Server started at ${port}`);
})