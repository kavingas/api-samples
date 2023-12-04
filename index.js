require("dotenv").config();
const log = require("./log");
const util = require("util");
const fs = require("fs");
const getNetworkClient = require("./getNetworkClient");


(async () => {
  try {
    const client = await getNetworkClient;
    let promises = [];
    for(let x=12;x<22;x++){
      promises.push(createSpecialPrice(client,
        {"prices":[{"price_from":"2023-12-27 21:01:00","price_to":"2023-12-28 21:30:00","price":17.5,"store_id":0,"sku":"product_dynamic_"+x}]}
        ))
    }
    await Promise.all(promises)
  } catch (e) {
    console.error(e.response);
  }
})();

const createSpecialPrice = async (client,data)=>{
  await client
  .post('rest/V1/products/special-price',data)
  .then(r=>{
    console.log('success ' + data)
  })
  .catch(e=>{
    console.log(e.response.data.message + e.config.data)
  })
}