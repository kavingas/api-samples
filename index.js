require("dotenv").config();
const log = require("./log");
const util = require("util");
const fs = require("fs");
const getNetworkClient = require("./getNetworkClient");
// const payload = require("./payload.json");
const payload = require("./payload2.json");

(async () => {
  try {
    const client = await getNetworkClient;
    client
      // .post("rest/shp_fra_fr/V1/products", payload)
      .get(
        "rest/view2/V1/products/?searchCriteria[filterGroups][0][filters][0][field]=tax_class_id&searchCriteria[filterGroups][0][filters][0][value]=0&searchCriteria[filterGroups][1][filters][0][field]=type_id&searchCriteria[filterGroups][1][filters][0][value]=simple",
        {}
      )
      .then((r) => {
        console.log(JSON.stringify(r.data));
        fs.writeFileSync("response.json", JSON.stringify(r.data));
      })
      .catch((e) => {
        console.error(e.response.data);
      });
  } catch (e) {
    console.error(e.response.data);
  }
})();

//rest/45/V1/products/?searchCriteria[filterGroups][0][filters][0][field]=tax_class_id&searchCriteria[filterGroups][0][filters][0][condition_type]=0&searchCriteria[filterGroups][1][filters][0][field]=type_id&searchCriteria[filterGroups][1][filters][0][value]=simple