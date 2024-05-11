var express = require('express');
var aboutController = require('../controllers/about-controller');
var router = express.Router();
// to display about page
router.get('/about', aboutController.goToAbout);
module.exports = router;