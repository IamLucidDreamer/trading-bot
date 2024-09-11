// const logg
const { connect } = require("./config/db");
const logger = require("./utils/logger");
const { openDialogAndGrantAccess } = require("./auth");
const { getToken } = require("./utils/tokenStore");
const {
  webscoketConnection,
} = require("./websocket/market_data/websocket_client");

const startBot = async () => {
  try {
    connect()
      .then(async () => {
        logger.info("Connected to MongoDB");
        const accessToken = await getToken();
        if (!accessToken) {
          console.log(
            "No access token found. Opening dialog to grant access..."
          );
          await openDialogAndGrantAccess();
          initializeBot();
        } else {
          initializeBot();
        }
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

const initializeBot = () => {
  logger.info("Initializing bot...");
  webscoketConnection("NSE_FP|7C48444");
};
