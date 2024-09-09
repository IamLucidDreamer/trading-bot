// data/database.js
const { MongoClient } = require('mongodb');
const config = require('../config/config');
const logger = require('../utils/logger');

const client = new MongoClient(config.db.uri);

let db;

const connect = async () => {
  try {
    logger.info('Connecting to MongoDB');
    await client.connect();
    db = client.db(config.db.name);
    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
};

const close = async () => {
  if (client.isConnected()) {
    await client.close();
    logger.info('Disconnected from MongoDB');
  }
};

module.exports = {
  connect,
  getDb,
  close,
};
