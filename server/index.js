const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require("cors")
const db = require('./db/conn');
db.dbConnect();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const {pageNotFound} = require('./utils/PageNotFound');
const {errorHandler} = require('./utils/ErrorHandler');
const expensesRoute=require('./route/expense');
const port = process.env.port;

app.use('/api/v1/expenses', expensesRoute);
app.use(pageNotFound);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server started at ${port}`);
})