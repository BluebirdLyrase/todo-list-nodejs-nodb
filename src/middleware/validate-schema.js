const { failed } = require('../config/response');

exports.validateSchema =
  (param = []) =>
  async (req, res, next) => {
    let errorList = [];
    const length = param.length;
    for (let index = 0; index < length; index++) {
      const { schema, key = 'body' } = param[index];
      const { error, value } = schema.validate(req[key]);
      req.payload = { ...req.payload, ...value };
      if (error) {
        errorList.push(error.details[0].message);
      }
    }
    if (errorList.length > 0) {
      return failed(res).clientError(errorList, `Payload Error`);
    }
    next();
  };
