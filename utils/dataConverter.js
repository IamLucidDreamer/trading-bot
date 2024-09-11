function convertToFiveMinuteCandlesFromOneMinute(oneMinuteCandles) {
  const fiveMinuteCandles = [];

  // Function to aggregate 1-minute candles into a 5-minute candle
  function aggregateCandles(candles) {
    if (candles.length === 0) return null;

    const openTime = candles[candles.length - 1][0]; // Open time of the last candle in the descending order
    const openPrice = candles[candles.length - 1][1]; // Open price of the last candle in the descending order
    const highPrice = Math.max(...candles.map((c) => c[2])); // Highest high in the 5-minute window
    const lowPrice = Math.min(...candles.map((c) => c[3]));  // Lowest low in the 5-minute window
    const closePrice = candles[0][4]; // Close price of the first candle in the descending order
    const volume = candles.reduce((sum, c) => sum + c[5], 0); // Sum of volumes

    return [openTime, openPrice, highPrice, lowPrice, closePrice, volume, 0];
  }

  // Process candles in chunks of 5, starting from the latest data
  for (let i = 0; i < oneMinuteCandles.length; i += 5) {
    // Slice the candles in reverse order for aggregation
    const fiveMinuteCandle = aggregateCandles(oneMinuteCandles.slice(i, i + 5));
    if (fiveMinuteCandle) {
      fiveMinuteCandles.push(fiveMinuteCandle);
    }
  }

  return fiveMinuteCandles;
}

function convertToThreeMinuteCandleFromOneMinute(oneMinuteCandles) {
  const threeMinuteCandles = [];

  function aggregateCandles(candles) {
    if (candles.length === 0) return null;

    const openTime = candles[0][0];
    const openPrice = candles[0][1];
    const highPrice = Math.max(...candles.map((c) => c[2]));
    const lowPrice = Math.min(...candles.map((c) => c[3]));
    const closePrice = candles[candles.length - 1][4];
    const volume = candles.reduce((sum, c) => sum + c[5], 0);

    return [openTime, openPrice, highPrice, lowPrice, closePrice, volume, 0];
  }

  for (let i = 0; i < oneMinuteCandles.length; i += 3) {
    const threeMinuteCandle = aggregateCandles(
      oneMinuteCandles.slice(i, i + 3)
    );
    if (threeMinuteCandle) {
      threeMinuteCandles.push(threeMinuteCandle);
    }
  }

  return threeMinuteCandles;
}

module.exports = {
  convertToFiveMinuteCandlesFromOneMinute,
  convertToThreeMinuteCandleFromOneMinute,
};
