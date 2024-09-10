const { getDb } = require("../config/db");

let accessToken = null;
const TWELVE_HOURS = 12 * 60 * 60 * 1000;
const now = new Date();

const setToken = (token) => {
  saveTokenToDb(token);
  accessToken = token;
};

const getToken = () => accessToken || getTokenFromDb();

async function saveTokenToDb(token) {
  const tokensCollection = getDb().collection("tokens");
  await tokensCollection.updateOne(
    { name: "accessToken" },
    { $set: { token, updatedAt: new Date() } },
    { upsert: true }
  );
  console.log("Token saved to MongoDB");
}

async function getTokenFromDb() {
  const tokensCollection = getDb().collection("tokens");
  const tokenDoc = await tokensCollection.findOne({ name: "accessToken" });
  return tokenDoc && now - new Date(tokenDoc.updatedAt) < TWELVE_HOURS
    ? tokenDoc.token
    : null;
}

module.exports = { setToken, getToken, saveTokenToDb, getTokenFromDb };
