const BaseFunction = require("../..");

const Snippet = require("../../../models/Snippet");

module.exports = class GetSnippetUseCase extends BaseFunction {
  optionalFields = ["_id", "language", "userId"];

  async execute(data) {
    const { _id, language, userId } = this.validateOptional(data, this.optionalFields);

    if (_id)
      return Snippet.get(_id);

    if (userId)
      return Snippet.query({ "userId": { "contains": userId } }).exec();

    return Snippet.scan(language).exec();
  }
}
