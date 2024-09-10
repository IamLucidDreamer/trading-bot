// const logg
const { connect } = require("./config/db");
const logger = require("./utils/logger");
const { openDialogAndGrantAccess } = require("./auth");
const { getToken } = require("./utils/tokenStore");

const startBot = async () => {
  try {
    connect()
      .then(async () => {
        logger.info("Connected to MongoDB");
        const accessToken = await getToken();
        if (!accessToken) {
          console.log("No access token found. Opening dialog to grant access...");
          openDialogAndGrantAccess();
        }
        console.log(accessToken);
      })
      .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
      });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

startBot();