const {
  signUpSellerValidation,
  loginsellerValidation,
  accessTokenVarify,
  adderssValidation,
} = require('./seller.middleware');
const { adminValidation } = require('./admin.middleware');

module.exports = {
  signUpSellerValidation,
  loginsellerValidation,
  adminValidation,
  accessTokenVarify,
  adderssValidation,
};
