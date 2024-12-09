const {
  getObjValue,
  setObjValue,
  setObjPropValue,
} = require("./redis.service");

module.exports.rateLimiterService = {
  tokenBucket: async (key, maxAmount, refillTime) => {
    // data structure = key ={"tokens": 2, "ts/lastUpdated": 14348622}
    try {
      let bucket = await getObjValue(key);
      if (!bucket) {
        let value = {
          tokens: maxAmount,
          ts: 0,
        };
        // create bucket
        await setObjValue(key, value);
      }
      // check if time stored in cache elapsed or not
      if (Date.now() - parseInt(bucket.ts) >= refillTime) {
        // if interval time is elapsed
        console.log("time elapsed and creating new obj");
        let currentTimestamp = Date.now();
        await setObjPropValue(key, "tokens", maxAmount);
        await setObjPropValue(key, "ts", 0);
      } else {
        // if time stroed in cache not elapsed
        let bucket = await getObjValue(key);
        let requestLeft = bucket.tokens;
        console.log("reqlft", requestLeft);
        if (requestLeft <= 0) {
          // drop request
          return false;
        }
      }

      // decrement request/token count by 1
      let modifiedBucket = await getObjValue(key);
      let decrToken = parseInt(modifiedBucket.tokens) - 1;
      console.log("dectoken", decrToken);
      let currentTimestamp = Date.now();
      await setObjPropValue(key, "tokens", decrToken);
      await setObjPropValue(key, "ts", currentTimestamp);

      // allow incoming request
      return true;
    } catch (err) {
      console.log(err);
    }
  },
  // end of token bucket
};
