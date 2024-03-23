exports.success = (res) => {
  return {
    ok(result, message = `OK`) {
      return res.status(200).json({ success: true, message, result });
    },
    create(result, message = `Create Success`) {
      return res.status(201).json({ success: true, message, result });
    },
  };
};

exports.failed = (res) => {
  return {
    clientError(error, message) {
      const obj = { success: false, message: message, error };
      return res.status(400).json(obj);
    },
    serverError(error) {
      console.error(error); //* pretend this is a function for monitoring system;
      const obj = { success: false, message: `Internal Server Error` };
      return res.status(500).json(obj);
    },
  };
};
