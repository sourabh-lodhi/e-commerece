const express = require('express');
const { route } = require('express/lib/application');
const router = express();
const {
  sellerVarified,
  sellerLogin,
  verifiedOtp,
  createAccessRefreshToken,
  signUPSeller,
  logoutSelller,
} = require('../controller/');
const {
  signUpSellerValidation,
  loginsellerValidation,
} = require('../middleware/');

/**
 * @swagger
 * /auth/seller/register:
 *   post:
 *     summary: create a new seller
 *     tags: [seller]
 *     requestBody:
 *         required: true
 *         content:
 *          application/json:
 *            schema:
 *                required:
 *                   - fullName
 *                   - email
 *                   - phone
 *                   - password
 *                properties:
 *                   fullname:
 *                      type:string
 *                   email:
 *                      type: email
 *                   phone:
 *                      type:number
 *                   password:
 *                      type: password
 *                example:
 *                   fullName: sourabh
 *                   email: sourabh@gmail.com
 *                   phone: "9546845896"
 *                   password: "123456"
 *
 *     responses:
 *       200:
 *         description: signup successfully
 *
 *
 *
 */

router.post('/register', signUpSellerValidation, signUPSeller);

/**
 * @swagger
 * /auth/seller/login:
 *   post:
 *     summary: seller login
 *     tags: [seller]
 *     requestBody:
 *         required: true
 *         content:
 *          application/json:
 *            schema:
 *                required:
 *                   - email
 *                   - phone
 *                   - password
 *                properties:
 *                   email:
 *                      type: email
 *                   phone:
 *                      type:number
 *                   password:
 *                      type: password
 *                example:
 *                   email/phone: sourabh@gmail.com/9546845896
 *                   password: "123456"
 *
 *     responses:
 *       200:
 *         description: login successfully
 *
 *
 *
 */
router.post('/login', loginsellerValidation, sellerLogin);

/**
 * @swagger
 * /auth/seller/varifiedotp:
 *   post:
 *     summary: seller verify by otp
 *     tags: [seller]
 *     requestBody:
 *         required: true
 *         content:
 *          application/json:
 *            schema:
 *                required:
 *                   - phone:
 *                   - otp
 *                properties:
 *                   phone:
 *                      type:string
 *                   otp:
 *                      type:string
 *                example:
 *                   phone: "9302807262"
 *                   otp: "123456"
 *
 *     responses:
 *       200:
 *         description: signup successfully
 *
 *
 *
 */
router.post('/varifiedotp', verifiedOtp);

/**
 * @swagger
 * /auth/seller/logout:
 *   post:
 *     summary: logout seller
 *     tags: [seller]
 *     requestBody:
 *         required: true
 *         content:
 *          application/json:
 *            schema:
 *                required:
 *                   - id
 *                properties:
 *                   id:
 *                      type:string
 *                example:
 *                   id: 123456fdffeerwer
 *
 *     responses:
 *       200:
 *         description: signup successfully
 *
 *
 *
 */
router.post('/logout', logoutSelller);

/**
 * @swagger
 * /auth/seller/{token}:
 *   get:
 *     security:
 *       - jwt: []
 *     summary: verifyed seller by token
 *     tags: [seller]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: verified
 *       404:
 *         description: not verified
 */
router.get('/:token', sellerVarified);
router.post('/createNewPairOfToken', createAccessRefreshToken);

module.exports = router;
