import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadHtml = async (templatePath, data = {}) => {
  const fullPath = path.join(__dirname, "../../services", templatePath);

  return await ejs.renderFile(fullPath, data);
};

export default loadHtml;