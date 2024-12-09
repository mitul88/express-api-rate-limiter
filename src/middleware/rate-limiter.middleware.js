module.exports.rateLimiterMiddleware = {
  leakyLimiter: async (req, res, next) => {
    next();
  },
};
