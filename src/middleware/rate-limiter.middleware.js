const { RATE_LIMITER_CONFIG } = require("../config/rate-limiter.config");
const { rateLimiterService } = require("../service/rate-limiter.service");

module.exports.rateLimiterMiddleware = {
  tokenBucketLimiter: async (req, res, next) => {
    const clientIp = req.socket.remoteAddress;
    const maxNumOfRequest = RATE_LIMITER_CONFIG.MAX_REQUEST;
    const tokenRefillInterval = RATE_LIMITER_CONFIG.REFILL_INTERVAL;
    const cacheExpiry = RATE_LIMITER_CONFIG.EXPIRE_IN_SECOND;
    try {
      let allowed = await rateLimiterService.tokenBucket(
        clientIp,
        maxNumOfRequest,
        tokenRefillInterval,
        cacheExpiry
      );
      if (allowed) {
        next();
      } else {
        return res
          .status(429)
          .send({ message: "Too many request! Please try again sometimes" });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
