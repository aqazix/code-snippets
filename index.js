const SnippetController = require("./controllers/Snippet");

module.exports.createSnippetHandler = async (event, _context) => {
  const snippetController = new SnippetController(event);

  return snippetController.create();
};

module.exports.getSnippetHandler = async (event) => {
  const snippetController = new SnippetController(event);

  return snippetController.get();
}
