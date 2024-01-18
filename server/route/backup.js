const express = require('express');
const router = new express.Router();
router.use(express.json({}));
const backupController=require('../controller/backup');


router.post('/',backupController.backupDB);

module.exports = router;
