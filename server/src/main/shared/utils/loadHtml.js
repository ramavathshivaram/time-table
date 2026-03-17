import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import logger from "#configs/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadHtml = async (templatePath, data = {}) => {
  try {
    const fullPath = path.join(__dirname, "../../services", templatePath);

    const html = await ejs.renderFile(fullPath, data, {
      async: true,
    });

    return html;
  } catch (error) {
    logger.error("Template render failed", error);
    throw error;
  }
};

export default loadHtml;