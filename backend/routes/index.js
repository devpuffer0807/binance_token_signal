var express = require('express');
const authController = require('../controllers/authController');
var { Joi, validate } = require('express-validation');
const userController = require('../controllers/userController');
const uploadController = require('../controllers/uploadController');
const authValidator = require("../middlewares/validators/auth");
const profileValidator = require("../middlewares/validators/profile");
const scanController = require('../controllers/scanController');
const membershipController = require("../controllers/membershipController");
const signalController = require("../controllers/signalController");
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

router.get("/user/users", userController.users);
router.get("/user/:id", userController.getuser);
router.post("/user/update", userController.updateuser);
router.post("/user/create", userController.createuser);
router.get("/user/delete/:id", userController.delete);

// router.post("/scan",scanController.scan);
router.post("/membership/saveproposal", membershipController.saveproposal);
router.get("/membership/memberships", membershipController.memberships);
router.get("/membership/proposals", membershipController.proposals);
router.post("/membership/updateuserplan", membershipController.updateuserplan);

router.post("/signal/spot", signalController.spot);
router.get("/signal/market", signalController.market);
router.get("/signal/kucoin", signalController.kucoin);
router.get("/signal/bitfinex", signalController.bitfinex);
router.get("/signal/ftx", signalController.ftx);
router.get("/signal/future", signalController.future);


module.exports = router;
