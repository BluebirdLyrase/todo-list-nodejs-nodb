exports.success = (res, message, result = {}, code = 200) => {
  return res.status(code).json({ success: true, message, result });
};

exports.failed = (res, apiMessage, error = {}, code = 400) => {
  const { message } = error;
  const obj = { success: false, message: message || apiMessage, error };
  return res.status(code).json(obj);
};
