const express = require('express');
const router = new express.Router();
router.use(express.json({}));
const epensesController=require('../controller/expense');


router.post('/',epensesController.addExpenses);
router.get('/',epensesController.viewExpenses);


module.exports = router;
