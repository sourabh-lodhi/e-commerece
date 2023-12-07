const {
  mailfunction,
  bcryptPasswordMatch,
  crypto_string,
  createOtp,
  sellerPresent,
  refreshToken,
  accessToken,
  refreshTokenVarify,
  sendMsg,
  sendMsgBymail,
  verifyEmail,
} = require('./seller.service');
const { fields } = require('./admin.service');

module.exports = {
  mailfunction,
  bcryptPasswordMatch,
  crypto_string,
  createOtp,
  sellerPresent,
  accessToken,
  refreshToken,
  refreshTokenVarify,
  sendMsg,
  sendMsgBymail,
  verifyEmail,
  fields,
};
