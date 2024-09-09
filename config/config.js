const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  code: process.env.CLIENT_CODE,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: process.env.REDIRECT_URI,
  grant_type: "authorization_code",
  base_url: process.env.BASE_URL,
  base_url_hft: process.env.BASE_URL_HFT,
  db: {
    uri: process.env.MONGO_URI,
    name: process.env.MONGO_DB_NAME,
  },
};
