const NoObligatoryFieldError = require("../errors/Common/NoObligatoryFieldError");

module.exports = class ValidationUtil {
  static #verify(data, requiredFields) {
    return requiredFields.filter((field) => {
      if (field.includes(".")) {
        const [root, ...path] = field.split(".");

        return this.#verify(data[root], path).length;
      }

      return (
        data[field] !== false &&
        (data[field] === undefined || data[field] === null || !data)
      );
    });
  }

  static validate(data, requiredFields) {
    const missingFields = this.#verify(data, requiredFields);

    if (missingFields.length) throw new NoObligatoryFieldError(missingFields);
  }

  static isUndefinedOrNull(object, key) {
    return (
      object[key] === undefined ||
      object[key] === null ||
      object[key] === "" ||
      !object
    );
  }
}