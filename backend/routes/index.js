var express = require('express');
const authController = require('../controllers/authController');
var { Joi, validate } = require('express-validation');
const userController = require('../controllers/userController');
const uploadController = require('../controllers/uploadController');
const authValidator = require("../middlewares/validators/auth");
const profileValidator = require("../middlewares/validators/profile");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/** Image Upload API */
router.post('/upload', uploadController.upload);

router.post("/auth/register", authValidator.register, authController.register);
router.post("/auth/login", authValidator.login, authController.login);
router.post("/auth/forgot", authValidator.forgot, authController.forgot);
router.post("/auth/reset", authValidator.reset, authController.reset);
router.post("/profile/update", profileValidator.update, userController.update);
router.get("/users", userController.users);

module.exports = router;
