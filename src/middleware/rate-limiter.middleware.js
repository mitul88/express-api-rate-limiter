const { rateLimiterService } = require("../service/rate-limiter.service");

module.exports.rateLimiterMiddleware = {
  tokenBucketLimiter: async (req, res, next) => {
    const clientIp = req.socket.remoteAddress;
    const maxNumOfRequest = 3;
    const tokenRefillInterval = 1000 * 60;
    try {
      let allowed = await rateLimiterService.tokenBucket(
        clientIp,
        maxNumOfRequest,
        tokenRefillInterval
      );
      // console.log("allowed", allowed);
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
