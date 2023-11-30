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
    await client.post("carts/mine", {});
    console.log('Quote created');
    await Promise.all([addItemToCart(client), addItemToCart(client)]);
    console.log('Items added');
    await shippingInfo(client);
    console.log('Shipping details');
    await createOrder(client);
    console.log("Order placed")
  } catch (e) {
    console.error(e.response.data);
  }
})();

const addItemToCart = async (client) => {
  await client.post("carts/mine/items", {
    cartItem: {
      sku: "p1",
      qty: 1,
    },
  });
};

const shippingInfo = async (client) => {
  await client.post("carts/mine/shipping-information", {
    addressInformation: {
      shipping_address: {
        region: "New York",
        region_id: 43,
        region_code: "NY",
        country_id: "US",
        street: ["123 Oak Ave"],
        postcode: "10577",
        city: "Purchase",
        firstname: "Jane",
        lastname: "Doe",
        email: "jdoe@example.com",
        telephone: "512-555-1111",
      },
      billing_address: {
        region: "New York",
        region_id: 43,
        region_code: "NY",
        country_id: "US",
        street: ["123 Oak Ave"],
        postcode: "10577",
        city: "Purchase",
        firstname: "Jane",
        lastname: "Doe",
        email: "jdoe@example.com",
        telephone: "512-555-1111",
      },
      shipping_carrier_code: "flatrate",
      shipping_method_code: "flatrate",
    },
  });
};

const createOrder = async (client) => {
  await client.post("carts/mine/payment-information", {
    paymentMethod: {
      method: "checkmo",
    },
    billing_address: {
      email: "jdoe@example.com",
      region: "New York",
      region_id: 43,
      region_code: "NY",
      country_id: "US",
      street: ["123 Oak Ave"],
      postcode: "10577",
      city: "Purchase",
      telephone: "512-555-1111",
      firstname: "Jane",
      lastname: "Doe",
    },
  });
};
