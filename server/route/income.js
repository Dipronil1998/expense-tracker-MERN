const express = require('express');
const router = new express.Router();
router.use(express.json({}));
const incomeController=require('../controller/income');


router.post('/', incomeController.addIncome);


module.exports = router;
