module.exports = class NoSnippetFoundWithUserIdError extends Error {
  constructor() {
    super("NoSnippetFoundWithUserIdError");

    this.name = "NoSnippetFoundWithUserIdError";
    
    Object.setPrototypeOf(this, NoSnippetFoundWithUserIdError.prototype);
  }

  status = 404;
}