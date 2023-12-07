const Joi = require('joi');
const { asscesstoken, refreshtoken } = require('../config/');
const jwt = require('jsonwebtoken');
const { User } = require('../models/');
(exports.signUpSellerValidation = (req, res, next) => {
  const validateUser = (user) => {
    const JoiSchema = Joi.object({
      fullName: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      password: Joi.string().min(6).max(30).required(),
    }).or('fullName', 'email', 'phone');
    return JoiSchema.validate(user);
  };

  const response = validateUser(req.body);
  if (response.error) {
    res.status(400).json({
      message: response.error.details[0].message,
      status: 400,
      success: false,
    });
  } else {
    next();
  }
}),
  (exports.loginsellerValidation = (req, res, next) => {
    const loginUser = (user) => {
      const JoiSchema = Joi.object({
        phone: Joi.string(),
        email: Joi.string().email().min(5).max(50),
        password: Joi.string(),
      }).options({ abortEarly: false });
      return JoiSchema.validate(user);
    };
    const response = loginUser(req.body);
    if (response.error) {
      res.status(400).json({
        message: response.error.details[0].message,
        status: 400,
        success: false,
      });
    } else {
      next();
    }
  });

(exports.accessTokenVarify = (req, res, next) => {
  const token = req.headers.authorization;
  // const token = req.headers.token
  // console.log(token)
  if (!token) {
    return res.status(400).json({
      message: 'A token is required for authentication',
      status: 400,
      success: false,
    });
  } else {
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    jwt.verify(token, asscesstoken, async (error, payload) => {
      if (error) {
        res.status(400).json({
          message: 'invalid token',
          status: 400,
          success: false,
        });
      } else {
        const userid = payload.aud;
        const result = await User.findOne({ _id: userid });
        if (result.role === 'admin') {
          next();
        } else {
          res.status(400).json({
            message: 'you are not admin',
            success: false,
          });
        }
      }
    });
  }
}),
  (exports.adderssValidation = (req, res, next) => {
    const validateUser = (user) => {
      const JoiSchema = Joi.object({
        fullName: Joi.string().max(30).required(),
        phone: Joi.string().required(),
        country: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        pincode: Joi.number().required(),
        landmark: Joi.string().required(),
        houseNo: Joi.string().required(),
        addressType: Joi.string().required(),
      }).or('fullName', 'phone');
      return JoiSchema.validate(user);
    };

    const response = validateUser(req.body);
    if (response.error) {
      res.status(400).json({
        message: response.error.details[0].message,
        status: 400,
        success: false,
      });
    } else {
      next();
    }
  });
