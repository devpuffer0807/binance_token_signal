var express = require('express');
var router = express.Router();
var { Joi, validate } = require('express-validation');

/**
 * API: /auth/login
 */
router.post("/login", validate({
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
}, {}, {}), function (req, res, next) {
    const {
        email,
        password
    } = req.body;

    res.json({

    });
});

/**
 * API : /auth/register
 */

const RegisterValidation = {
        body: Joi.object({
            fisrtName : Joi.string().required(),
            lastName : Joi.string().required(),
            userEmail : Joi.string().email().required(),
            userPassword : Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
            // userConfirmPassword : Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
        })
};

router.post("/register", validate(RegisterValidation, {}, {}), function (req, res, next) {
    const data = req.body;
    console.log(data);
});

module.exports = router;