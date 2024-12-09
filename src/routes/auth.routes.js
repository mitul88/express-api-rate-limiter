const { createUser } = require("../controller/auth.controller");
const {
  rateLimiterMiddleware,
} = require("../middleware/rate-limiter.middleware");

const router = require("express").Router();

router.route("/").get([rateLimiterMiddleware.tokenBucketLimiter], createUser);

module.exports = router;
