const axios = require("axios");
const { trading_script_code, base_url_hft, access_token } = require("../config/config");

const url = `${base_url_hft}/v2/order/place`;
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization:
    `Bearer ${access_token}`,
};

const placeOrder = async (type , quantity, currentLTP) => {
  const data = {
    quantity: quantity,
    product: "D",
    validity: "DAY",
    price: currentLTP,
    tag: "string",
    instrument_token: trading_script_code,
    order_type: "LIMIT",
    transaction_type: type,
    disclosed_quantity: 0,
    trigger_price: 0,
    is_amo: false,
  };

  axios
    .post(url, data, { headers })
    .then((response) => {
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.error("Error:", JSON.stringify(error.response.data));
    });
};

module.exports = { placeOrder };
