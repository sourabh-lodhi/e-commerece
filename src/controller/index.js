const {
  verifiedByAdmin,
  adminLogin,
  getAllseller,
} = require('./admin.controller');
const {
  sellerVarified,
  signUPSeller,
  sellerLogin,
  verifiedOtp,
  createAccessRefreshToken,
  logoutSelller,
} = require('./seller.controller');
const {
  signUPUser,
  userLogin,
  userVarified,
  userVerifiedOtp,
  logoutUser,
  createAccessRefreshTokenToUser,
} = require('./user.controller');
const {
  createAddress,
  updateAddress,
  showAddress,
  deleteAddress,
  axiosTest,
} = require('./address.controller');

module.exports = {
  sellerVarified,
  signUPSeller,
  sellerLogin,
  verifiedOtp,
  verifiedByAdmin,
  adminLogin,
  createAccessRefreshToken,
  getAllseller,
  logoutSelller,
  signUPUser,
  userLogin,
  userVarified,
  userVerifiedOtp,
  logoutUser,
  createAccessRefreshTokenToUser,
  createAddress,
  updateAddress,
  showAddress,
  deleteAddress,
  axiosTest,
};
