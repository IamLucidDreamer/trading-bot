// utils/logger.js
const { createLogger, format, transports } = require('winston');

// Define custom log format
const customFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
);

// Create the logger instance
const logger = createLogger({
  level: 'info',
  format: customFormat,
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), 
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Export the logger
module.exports = logger;
