const jwt = require('jsonwebtoken');
const { User } = require('./../models/');
const { admin, seller } = require('./../config/');

const { accessToken, bcryptPasswordMatch, fields } = require('../services/');
// const {fields } = require('./../services/')

exports.adminLogin = async (req, res) => {
  debugger;
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      req.body.role = admin;
      const createAdmin = await User.create(req.body);
      const userId = createAdmin.id;
      const accesstoken = await accessToken(userId);
      return res.status(200).json({
        message: 'login1 successfully',
        accesstoken: accesstoken,
        success: true,
      });
    } else {
      const foundAdmin = await User.findOne({ email: req.body.email });
      if (foundAdmin.role === 'admin') {
        const db_pass = foundAdmin.password;
        const user_pass = req.body.password;
        const match = await bcryptPasswordMatch(user_pass, db_pass);
        if (match === true) {
          const userId = foundAdmin.id;
          const accesstoken = await accessToken(userId);
          return res.status(200).json({
            success: true,
            accToken: accesstoken,
            message: 'login successfully',
          });
        } else {
          res.status(400).json({
            success: false,
            message: 'invalid login details',
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: 'Role must be admin',
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

exports.verifiedByAdmin = async (req, res) => {
  try {
    const id = req.body.id;
    const result = await User.findOne({ _id: id });
    if (!result) {
      return res.send('invalid user');
    } else {
      const admin = await User.updateOne({ _id: id }, { isApproved: true });
      res.status(200).json({
        messsage: 'approve by admin',
      });
    }
  } catch (err) {
    res.status(400).json({
      messsage: 'invalid id',
    });
  }
};

exports.getAllseller = async (req, res) => {
  const { page = 1, limit = 2 } = req.query;
  const { email = '' } = req.body;
  const allfields = fields(req);
  const result = await User.find(
    { email: { $regex: email, $options: '$i' }, role: seller },
    allfields,
  )
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });
  res.status(200).json({
    message: 'getAllseller',
    result: result,
  });
};
