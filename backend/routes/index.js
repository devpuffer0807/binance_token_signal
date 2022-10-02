var express = require('express');
const authController = require('../controllers/authController');
var { Joi, validate } = require('express-validation');
const userController = require('../controllers/userController');
const uploadController = require('../controllers/uploadController');
const multer = require('multer');
const teamController = require('../controllers/teamController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Register API. */
router.post("/auth/register", validate({
  body: Joi.object({
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    userEmail : Joi.string().email().required(),
    userPassword : Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
  })
}, {}, {allowUnknown: true, abortEarly: false}), authController.register);

/** Login API */
router.post("/auth/login", validate({
  body: Joi.object({
    userEmail : Joi.string().email().required(),
    userPassword : Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
  })
}, {}, {allowUnknown: true, abortEarly: false}), authController.login);

/** Get Profile data API */
// router.post("/profile/getdata", validate({
//   body: Joi.object({
//     userEmail : Joi.string().email().required(),
//   })
// }, {}, {allowUnknown: true, abortEarly: false}), authController.login);

/** Profile update API */
router.post("/profile/update", validate({
  body: Joi.object({
    userEmail : Joi.string().email().required(),
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
  })
}, {}, {allowUnknown: true, abortEarly: false}), userController.update);

/** Profile update API */
router.post("/profile/update", validate({
  body: Joi.object({
    userEmail : Joi.string().email().required(),
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
  })
}, {}, {allowUnknown: true, abortEarly: false}), userController.update);


/** Profile update API */
router.post("/team",  teamController.team);
router.get("/teams",  teamController.teams);

/** Image Upload API */
router.post('/upload', uploadController.upload);

/** Get Users API */
router.get("/users", userController.users);


module.exports = router;
