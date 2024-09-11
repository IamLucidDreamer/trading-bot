const { connect } = require("./config/db");
const { setCapitalInDb, getCapitalFromDb } = require("./utils/capitalStore");

const hii = async () => {
  connect()
    .then(async () => {
      const capital = await getCapitalFromDb();
      if (!capital) {
        console.log("No capital found. Setting capital to 50000...");
        await setCapitalInDb("50000");
      }
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB:", err);
      process.exit(1);
    });
};


hii()