const dynamoose = require("dynamoose");

const validLanguages = ["javascript", "typescript"];

const { Schema } = dynamoose;
const SnippetSchema = new Schema(
  {
    _id: { type: String, hashKey: true, required: true },
    snippet: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true,
      validate: (value) => validLanguages.includes(value),
    },
    userId: {
      type: String,
      index: {
        global: true,
        rangeKey: "language"
      }
    },
  },
  {
    timestamps: true,
  }
);

module.exports = dynamoose.model("devnautas-code-snippets-snippet", SnippetSchema, { create: false, expires: 60 * 60 * 24 * 7 * 1000 })
