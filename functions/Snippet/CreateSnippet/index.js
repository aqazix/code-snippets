const crypto = require("crypto");

const BaseFunction = require("../..");

const Snippet = require("../../../models/Snippet");

module.exports = class CreateSnippetUseCase extends BaseFunction {
  requiredFields = ["snippet", "language"];

  async execute(data) {
    this.validate(data, this.requiredFields);

    const _id = crypto.randomUUID();

    return Snippet.create({
      ...data,
      _id,
    });
  }
}