const userRouter = require("./auth.routes");
module.exports = (app) => {
  app.use("/api", userRouter);
};
