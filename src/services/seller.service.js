const nodemailer = require('nodemailer');
const twilio = require('twilio');
const { mailEmail, mailPassword } = require('../config');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const {
  accountSid,
  authToken,
  contact,
  asscesstoken,
  refreshtoken,
} = require('../config/');
const jwt = require('jsonwebtoken');
require('../config');
// const {User} = require('../models/')

(exports.mailfunction = (email, link) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mailEmail,
      pass: mailPassword,
    },
  });

  const mailOption = {
    from: mailEmail,
    to: email,
    subject: 'testing and testing',
    html: `<h1>signUP successfully please verify and login</h1><br><h2> click this link and verify your email </h2><br>
      <a style="color:blue" href=${link}>click here </a>`,
  };

  return transporter.sendMail(mailOption);
}),
  (exports.bcryptPassword = async (password) => {
    const pass = await bcrypt.hash(password, 10);
    return pass;
  }),
  (exports.bcryptPasswordMatch = async (user_pass, db_pass) => {
    const matchpass = await bcrypt.compare(user_pass, db_pass);
    return matchpass;
  }),
  (exports.crypto_string = () => {
    return crypto.randomBytes(64).toString('hex');
  });

exports.createOtp = async (req, res) => {
  const phone = req.body.phone;
  // console.log("+91".concat(phone),"6766746765784",phone)
  if (phone.length === 10) {
    const client = new twilio(accountSid, authToken);
    let Otp = Math.floor(Math.random() * 1000000 + 1);
    await client.messages.create({
      body: `hello your verification code is : ${Otp} and will expires in 10 min`,
      to: '+91'.concat(phone),
      from: contact,
    });
    return Otp;
  } else {
    return 'please try this formate +919454754844';
  }
};

(exports.sendMsg = async (req) => {
  const phone = req.body.phone;
  const client = new twilio(accountSid, authToken);
  let Otp = Math.floor(Math.random() * 1000000 + 1);
  await client.messages.create({
    body: `you are approved by admin now you can login`,
    to: '+919302807262',
    from: contact,
  });
}),
  (exports.sellerPresent = async (req) => {
    try {
      if (req.body.phone) {
        const user = await sellerModel.findOne({ phone: req.body.phone });
        return user;
      } else if (req.body.email) {
        const user = await sellerModel.findOne({ email: req.body.email });
        return user;
      }
    } catch (err) {
      return err;
    }
  });

(exports.accessToken = async (userId) => {
  const userid = userId;
  return new Promise((resolve, reject) => {
    const options = {
      expiresIn: '1h',
      issuer: 'sourabh@gmail.com',
      audience: userid,
    };
    const paylod = {};
    jwt.sign(paylod, asscesstoken, options, (err, token) => {
      if (err) {
        return reject({ message: 'Invalid operation!' });
      } else {
        resolve(token);
      }
    });
  });
}),
  (exports.refreshToken = (userId) => {
    const userid = userId;
    return new Promise((resolve, reject) => {
      const options = {
        expiresIn: '1d',
        issuer: 'sourabh@gmail.com',
        audience: userid,
      };
      const paylod = {};
      jwt.sign(paylod, refreshtoken, options, (err, token) => {
        if (err) {
          reject({ message: 'Invalid operation!' });
        } else {
          resolve(token);
        }
      });
    });
  }),
  (exports.refreshTokenVarify = (refreshVarify) => {
    const token = refreshVarify;
    if (!token) {
      return { message: 'A token is required for authentication' };
    } else {
      const token = refreshVarify;
      const paylod = jwt.verify(token, refreshtoken, (error, payload) => {
        if (payload) {
          return payload;
        } else {
          return { message: error };
        }
      });

      return paylod;
    }
  });

exports.sendMsgBymail = (email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mailEmail,
      pass: mailPassword,
    },
  });

  const mailOption = {
    from: mailEmail,
    to: email,
    subject: 'testing and testing',
    text: 'your application approved by admin now you can login',
  };

  transporter
    .sendMail(mailOption)
    .then((res) => {
      // console.log('mail send successfully')
    })
    .catch((err) => {
      console.log('oops! error');
    });
};

exports.verifyEmail = (req) => {
  const email = req.body.email;
  console.log(email.slice(7,email.length))
  console.log('=======>',email.length)
  if (
    email.slice(email.length - 10, email.length) === '@gmail.com' ||
    email.slice(email.length - 12, email.length) === '@yopmail.com'
  ) {
    return true;
  }
  return false;
};

// exports.returnUser = async (req) => {
//   if (req.body.phone) {
//     const user = await User.findOne({ phone: req.body.phone });
//     return user;
//   } else {
//     const user = await User.findOne({ email: req.body.email });
//     return user;
//   }
// };
