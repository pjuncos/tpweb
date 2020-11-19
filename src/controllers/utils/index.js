const { VALIDATION } = require('../../helpers/errors');
const logger = require('../../logger');

const isEmptyJSON = (obj) => JSON.stringify(obj) === JSON.stringify({});

const handleMongooseValidationError = (req, res, error) => {
  if (error.name === 'ValidationError') {
    const errors = {};
    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });
    res.status(400).send({
      message: VALIDATION.MISSING_FIELDS,
      errors,
    });
  } else {
    logger.error(error);
    if (error.code === 11000) {
      res.status(500).send({
        message: 'Duplicated value',
        errors: error.keyValue,
      });
    } else {
      res.status(500).send({ message: error.message });
    }
  }
};

module.exports = { isEmptyJSON, handleMongooseValidationError };
