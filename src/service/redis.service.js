const { createClient } = require("redis");

const client = createClient();

client.on("error", (err) => console.log("Redis is not connected!"));

client.connect().then(() => console.log("redis connected!"));

module.exports.setValue = async ({ key, value }) => {
  return client.set(key, value);
};

module.exports.getValue = async ({ key, value }) => {
  return client.get(key);
};
