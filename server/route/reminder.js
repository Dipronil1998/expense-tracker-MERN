const express = require('express');
const router = new express.Router();
router.use(express.json({}));
const reminderController=require('../controller/reminder');


router.post('/', reminderController.create);

module.exports = router;
