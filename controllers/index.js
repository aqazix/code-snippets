const { default: { InvalidParameter } } = require("dynamoose/dist/Error");

const NoObligatoryFieldError = require("../errors/Common/NoObligatoryFieldError");
const logger = require("../utils/Logger");

module.exports = class BaseController {
  constructor(event) {
    if (event.headers) {
      const contentType = event?.headers["content-type"];

      if (contentType === "application/json") {
        this._body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
      } else if (contentType === "application/x-www-form-urlencoded") {
        this._body = this.#decodeFormUrlEncoded(event.body);
      }

      this._origin = event.headers.origin;
    }

    if (event.queryStringParameters) {
      Object.keys(event.queryStringParameters)
        .forEach(
          (key) => this[key] = event.queryStringParameters[key]
        );
    }
  }

  #decodeFormUrlEncoded(value) {
    return Object.fromEntries(
      value
        .split("&")
        .map((keyValuePair) => keyValuePair.split("="))
        .map((keyValuePair) => keyValuePair.map(decodeURIComponent))
    );
  }

  created(value) {
    return {
      statusCode: 201,
      body: JSON.stringify(value),
      headers: {
        "content-type": "application/json",
      },
    }
  }

  success(value) {
    return {
      statusCode: 200,
      body: JSON.stringify(value),
      headers: {
        "content-type": "application/json",
      },
    }
  }

  error(error) {
    if (error instanceof InvalidParameter) {
      logger.error({ message: "[ERROR] No snippet found with the provided userId", error, message: error.message, stack: error.stack, userId: this.userId });

      return {
        statusCode: 404,
        body: JSON.stringify({
          code: "D01404",
          message: error.message,
        }),
        headers: {
          "content-type": "application/json",
        },
      };
    }

    if (error instanceof NoObligatoryFieldError) {
      logger.error({ message: "[ERROR] No obligatory field informed in the request", error, fields: error.fields, message: error.message, stack: error.stack })

      return {
        statusCode: error.status,
        body: JSON.stringify({
          code: error.code,
          fields: error.fields,
          message: error.message,
        }),
        headers: {
          "content-type": "application/json",
        },
      };
    }

    logger.error({ message: "[ERROR] Unexpected Error", error, message: error.message, stack: error.stack })

    return {
      statusCode: 500,
      body: JSON.stringify({
        code: "U01500",
        message: "An unexpected error occurred"
      }),
      headers: {
        "content-type": "application/json",
      },
    }
  }
}