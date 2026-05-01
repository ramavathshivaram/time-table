import morgan from "morgan";
import logger from "#configs/logger.js";

const morganMiddleware = morgan((tokens, req, res) => {
  const status = Number(tokens.status(req, res));

  const log = {
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status,
    responseTime: tokens["response-time"](req, res),
    contentLength: tokens.res(req, res, "content-length"),
  };

  const message = `${log.method} ${log.url} ${log.status} ${log.responseTime} ms - ${log.contentLength}`;

  if (status >= 500) {
    logger.error(message);
  } else if (status >= 400) {
    logger.warn(message);
  } else {
    logger.info(message);
  }

  return null; // prevent default logging
});

export default morganMiddleware;
