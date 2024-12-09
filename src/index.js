const app = require("./app");
const { ENV_CONFIG } = require("./config/env.config");
const port = ENV_CONFIG.PORT || 3000;

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
