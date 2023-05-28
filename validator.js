//ver1

// const { check } = require(`express-validator`);

// const colors = [`red`, `blue`, `yellow`];

// exports.contactValidation = [
//   check(`firstName`, `First name is required.`).notEmpty(),
//   check(`lastName`, `Last name is required.`).notEmpty(),
//   check(`email`, `Email is not valid`)
//     .notEmpty()
//     .isEmail()
//     .normalizeEmail({ gmail_remove_dots: true }),
//   check(`favoriteColor`, `Color is not a valid color`).isIn(colors),
//   check(`birthday`, `Birthday is not a valid birthday`).notEmpty().isISO8601().toDate()
// ];

// const {body, validationResult} = require('express-validator');
// const userValidationRules = () => {
//     return [
//         body('firstName').not().isEmpty(),
//         body('email').isEmail()
//     ]
// }

// const validate = (req, res, next) => {
//     const errors = validationResult(req)
//     if(errors.isEmpty()){
//         return next()
//     }
//     const extractedErrors =[]
//     errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))

//     return res.status(422).json({
//         errors: extractedErrors
//     })
// }

// module.exports ={
//     userValidationRules,
//     validate
// }


// ver2
const {body} = require("express-validator");
const validationResult = require("express-validator");
const validator = require('./validation');
// const saveContact = (req, res, next) => {
//   const validationRule = {
//     firstName: 'required|string',
//     email: 'required|email'
//   };
//   validator(req.body, validationRule, {}, (err, status) => {
//     if (!status) {
//       res.status(412).send({
//         success: false,
//         message: 'Validation failed',
//         data: err
//       });
//     } else {
//       next();
//     }
//   });
// };

const saveContact = [
  body('email').notEmpty().isEmail().withMessage('invalid email'),
  body('firstName').notEmpty().withMessage('name is missing'),
  validator,
];

module.exports = {
  saveContact
};