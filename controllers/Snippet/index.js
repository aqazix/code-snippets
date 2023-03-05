const crypto = require("crypto");

const BaseController = require("..");
const CreateSnippetUseCase = require("../../functions/Snippet/CreateSnippet");
const GetSnippetUseCase = require("../../functions/Snippet/GetSnippet");

const Snippet = require("../../models/Snippet");
const logger = require("../../utils/Logger");

module.exports = class SnippetController extends BaseController {
  async create() {
    try {
      logger.info({ message: "[SNIPPET] Received a request", payload: this._body, origin: this._origin });

      const createSnippetUseCase = new CreateSnippetUseCase();
      const snippet = await createSnippetUseCase.execute(this._body);

      logger.info({ message: "[SNIPPET] Created a snippet", snippet })

      return this.created(snippet)
    } catch (error) {
      return this.error(error);
    }
  }

  async get() {
    try {
      logger.info({ message: "[SNIPPET] Received a request", userId: this.userId, origin: this._origin });

      const getSnippetUseCase = new GetSnippetUseCase();
      const snippet = await getSnippetUseCase.execute({ _id: this._id, language: this.language, userId: this.userId });

      logger.info({ message: "[SNIPPET] Returned snippet(s)", snippet });

      return this.success(snippet);
    } catch (error) {
      return this.error(error);
    }
  }
}