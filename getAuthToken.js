const axios = require('axios')
let token = process.env.ACCESS_TOKEN;
module.exports = (async () => {
    if (token) {
        return token
    }
    const apiURL = new URL(
      process.env.URL + "integration/customer/token"
    );
    console.info(`Trying to retrieve auth token from ${apiURL}`);
    // console.log(process.env.CUSTOMER_EMAIL);
    // console.log(process.env.CUSTOMER_PASS);
    const response = await axios.post(apiURL, {
      username: process.env.CUSTOMER_EMAIL,
      password: process.env.CUSTOMER_PASS,
    });
    
    token = response.data
    console.info(`auth token: ${token}`)
    return token
})();
