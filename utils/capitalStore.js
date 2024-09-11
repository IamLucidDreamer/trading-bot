const { getDb } = require("../config/db");

async function setCapitalInDb(amount) {
  const capitalCollection = getDb().collection("capital");
  await capitalCollection.updateOne(
    { name: "capital" },
    { $set: { amount, updatedAt: new Date() } },
    { upsert: true }
  );
  console.log("Capital saved to MongoDB");
}

async function getCapitalFromDb() {
  const capitalCollection = getDb().collection("capital");
  const capitalDoc = await capitalCollection.findOne({ name: "capital" });
  return capitalDoc ? capitalDoc.amount : null;
}

module.exports = { setCapitalInDb, getCapitalFromDb };
