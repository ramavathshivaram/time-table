import env from "#configs/env.js";
import axios from "axios";

const workflowApi = axios.create({
   baseURL: env.WORKFLOW_SERVICE_URL,
});

export default workflowApi;