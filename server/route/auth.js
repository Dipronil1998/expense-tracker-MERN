const express = require('express');
const router = new express.Router();
router.use(express.json({}));
const authController=require('../controller/auth');


router.post('/', authController.auth);

module.exports = router;
