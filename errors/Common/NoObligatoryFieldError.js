module.exports = class NoObligatoryFieldError extends Error {
  constructor(fields) {
    super("NoObligatoryFieldError");

    this.name = "NoObligatoryFieldError";
    this.fields = fields;
    this.code = "C01422";

    Object.setPrototypeOf(this, NoObligatoryFieldError.prototype);
  }

  status = 422;
}