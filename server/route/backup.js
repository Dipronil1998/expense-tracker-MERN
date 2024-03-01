const express = require('express');
const router = new express.Router();
router.use(express.json({}));
const backupController=require('../controller/backup');


router.post('/',backupController.backupDB);
router.get('/updateAmountToZero',backupController.updateAmountToZero);

module.exports = router;
