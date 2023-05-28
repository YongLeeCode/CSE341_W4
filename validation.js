const Validator = require('express-validator');
const {validationResult} = require("express-validator");

// const validator = (body, rules, customMessages, callback) => {
//   const validation = new Validator(body, rules, customMessages);
//   validation.passes(() => callback(null, true));
//   validation.fails(() => callback(validation.errors, false));
// };

const validator = (req, res, next) =>{
    const error = validationResult(req);
    if(error.isEmpty()){
        return next();
    }
    return res.status(400).json({message: error.array()[0].msg});
}
module.exports = validator;