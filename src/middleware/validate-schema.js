const { failed } = require('../config/response');

exports.validateSchema =
  (schema = [], properties = 'body') =>
  async (req, res, next) => {
    if (typeof schema !== 'object') {
      return failed(req, res, `schema supported array only`);
    }
    let errorList = {};
    const length = schema.length;
    for (let key = 0; key < length; key++) {
      const { error, value } = schema[key].validate(req[properties]);
      console.log('error:', error);
      req.validatedBody = value;
      if (error) {
        errorList.push({
          message: error.details[0].message,
        });
      }
    }
    if (errorList.length > 0) {
      return failed(req, res, errorList);
    }
    next();
  };
