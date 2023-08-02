const axios = require('axios')
let token = null
module.exports = (async () => {
    if (token) {
        return token
    }
    const currentUrl = new URL(
      process.env.URL + "rest/V1/integration/admin/token"
    );
    console.info(`Trying to retrieve auth token from ${currentUrl}`);
    const response = await axios.post(currentUrl, {
      username: process.env.ADMIN_USER,
      password: process.env.ADMIN_PASS,
    });
    token = response.data
    console.info(`auth token: ${token}`)
    return token
})();
