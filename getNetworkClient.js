const axios = require("axios");
const getAuthToken = require("./getAuthToken");

module.exports = (async () => {
  const token = await getAuthToken;
  const instance = axios.create({
    baseURL: process.env.URL,
    // timeout: 1000,
    headers: { Authorization: "Bearer " + token },
  });
  instance.interceptors.request.use((config) => {
    if (!config.url) {
      return config;
    }
    const currentUrl = new URL(config.baseURL + config.url);
    // parse pathName to implement variables
    Object.entries(config.urlParams || {}).forEach(([k, v]) => {
      currentUrl.pathname = currentUrl.pathname.replace(
        `:${k}`,
        encodeURIComponent(v)
      );
    });

    const authPart =
      currentUrl.username && currentUrl.password
        ? `${currentUrl.username}:${currentUrl.password}`
        : "";
    return {
      ...config,
      baseURL: `${currentUrl.protocol}//${authPart}${currentUrl.host}`,
      url: currentUrl.pathname + currentUrl.search,
    };
  });

  return instance;
})();
