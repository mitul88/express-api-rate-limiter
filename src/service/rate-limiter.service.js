const {
  getObjValue,
  setObjValue,
  setObjPropValue,
  expireValue,
} = require("./redis.service");

module.exports.rateLimiterService = {
  tokenBucket: async (key, maxAmount, refillTime, expiryInSeconds) => {
    // redis cache data structure = key ={"tokens": 2, "ts/lastUpdated": 14348622}
    try {
      let bucket = await getObjValue(key);
      if (!bucket) {
        let value = {
          tokens: maxAmount,
          ts: 0,
        };
        // create bucket
        await setObjValue(key, value);
        await expireValue(key, expiryInSeconds);
      }
      // check if time stored in cache elapsed or not
      if (Date.now() - parseInt(bucket.ts) >= refillTime) {
        // if interval time is elapsed
        await setObjPropValue(key, "tokens", maxAmount);
        await setObjPropValue(key, "ts", 0);
      } else {
        // if time stroed in cache not elapsed
        let bucket = await getObjValue(key);
        let requestLeft = bucket.tokens;
        if (requestLeft <= 0) {
          // drop request
          return false;
        }
      }

      // decrement request/token count by 1
      let modifiedBucket = await getObjValue(key);
      if (maxAmount - modifiedBucket.tokens == 0) {
        let currentTimestamp = Date.now();
        await setObjPropValue(key, "ts", currentTimestamp);
      }
      let decrToken = parseInt(modifiedBucket.tokens) - 1;
      await setObjPropValue(key, "tokens", decrToken);

      // allow incoming request
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  // start of leaky bucket rate limiter
  leakyBucket: async () => {},
};
