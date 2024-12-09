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

module.exports.getObjValue = async (key) => {
  return client.hGetAll(key);
};

module.exports.setObjValue = async (key, value) => {
  return client.hSet(key, value);
};

module.exports.setObjPropValue = async (key, prop, val) => {
  return client.hSet(key, prop, val);
};
