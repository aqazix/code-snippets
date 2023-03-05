const NoObligatoryFieldError = require("../errors/Common/NoObligatoryFieldError");
const ValidationUtil = require("../utils/Validation");

module.exports = class BaseFunction {
  validate(data, requiredFields) {
    ValidationUtil.validate(data, requiredFields);
  }

  validateOptional(data, requiredFields) {
    const fields = Object.keys(data).filter(
      (key) =>
        requiredFields.includes(key) && !ValidationUtil.isUndefinedOrNull(data, key)
    );
    
    if (!fields.length) throw new NoObligatoryFieldError(requiredFields);

    const newData = {};

    requiredFields.forEach((field) => {
      newData[field] = data[field];
    });

    return newData;
  }
}