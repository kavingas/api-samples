require("dotenv").config();
const getNetworkClient = require("./getNetworkClient");
const payload = require("./payload.json");
const uuid = require("uuid");
const textToImage = require("text-to-image");

(async () => {
  try {
    const client = await getNetworkClient;
    for (let x = 0; x < 50; x++) {
      let uid = uuid.v4();
      payload.entry.file = uid + "jpg";
      payload.entry.label = uid + "jpg";
      payload.entry.content.name = uuid + ".jpg";
      client
        .post("rest/V1/products/p1/media", payload)
        .then((r) => {
          console.info(`success: ${r.data}`);
        })
        .catch((e) => {
          console.error(e.response.data);
        });
    }
  } catch (e) {
    console.error(e.response.data);
  }
})();
