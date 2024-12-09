const app = require("express")();
require("./middleware")(app);
require("./routes")(app);

module.exports = app;
