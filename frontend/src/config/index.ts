const { VITE_NPM_PACKAGE_VERSION, VITE_BASE_URL, VITE_API_URL, VITE_LOG_OUT_AFTER_DAYS, VITE_ENV } =
  import.meta.env;

const baseUrl = VITE_BASE_URL || "http://localhost:3500";
const apiUrl = VITE_API_URL || "http://localhost:8095";
const env = VITE_ENV || "development";

const config = {
  env,
  apiUrl,
  app: {
    baseUrl
  },
  version: VITE_NPM_PACKAGE_VERSION,
  logOutAfterDays: +VITE_LOG_OUT_AFTER_DAYS || 7
};

export default config;
