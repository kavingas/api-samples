const axios = require('axios')
let token = null
module.exports = (async () => {
    if (token) {
        return token
    }
    const currentUrl = new URL( process.env.URL + "rest/V1/integration/admin/token");
    const response = await axios.post(currentUrl, {
        username: "admin",
        password: "123123q",
    })
    token = response.data
    console.info(`auth token: ${token}`)
    return token
})();
