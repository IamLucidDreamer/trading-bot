// const logg 
const { connect } = require("./config/db");
const logger = require('../utils/logger');

const startBot = async () => {
  try {
    connect()
      .then(() => {
        logger.info("Connected to MongoDB");
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