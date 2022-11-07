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
const tradeController = require("../controllers/tradeController");

const adminMiddleware = require("../middlewares/admin");
const commonMiddleware = require("../middlewares/common");
const membershipMiddleware = require("../middlewares/membership");
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
router.post("/profile/update", [profileValidator.update, commonMiddleware], userController.update);

router.get("/user/users", [commonMiddleware, adminMiddleware], userController.users);
router.get("/user/:id", [commonMiddleware, adminMiddleware], userController.getuser);
router.post("/user/update", [commonMiddleware, adminMiddleware], userController.updateuser);
router.post("/user/create", [commonMiddleware, adminMiddleware], userController.createuser);
router.get("/user/delete/:id", [commonMiddleware, adminMiddleware], userController.delete);

router.post("/membership/saveproposal", [commonMiddleware], membershipController.saveproposal);
router.get("/membership/memberships", [commonMiddleware, adminMiddleware], membershipController.memberships);
router.get("/membership/proposals", [commonMiddleware, adminMiddleware], membershipController.proposals);
router.post("/membership/updateuserplan", [commonMiddleware, adminMiddleware], membershipController.updateuserplan);

router.post("/signal/spot", [commonMiddleware, membershipMiddleware], signalController.spot);
router.get("/signal/market", [commonMiddleware, membershipMiddleware], signalController.market);
router.get("/signal/kucoin", [commonMiddleware, membershipMiddleware], signalController.kucoin);
router.get("/signal/bitfinex", [commonMiddleware, membershipMiddleware], signalController.bitfinex);
router.get("/signal/ftx", [commonMiddleware, membershipMiddleware], signalController.ftx);
router.get("/signal/future", [commonMiddleware, membershipMiddleware], signalController.future);

router.get("/trade/balance", [commonMiddleware], tradeController.balance);


module.exports = router;
