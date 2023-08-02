require("dotenv").config();
const log = require("./log");
const util = require("util");
const getNetworkClient = require("./getNetworkClient");
// const payload = require("./payload.json");
const payload = require("./payload2.json");

(async () => {
  try {
    const client = await getNetworkClient;
    client
      // .post("rest/shp_fra_fr/V1/products", payload)
      .post("rest/view2/V1/products", payload)
      .then((r) => {
        console.info(util.inspect(r.data));
      })
      .catch((e) => {
        console.error(e.response.data);
      });
  } catch (e) {
    console.error(e.response.data);
  }
})();
