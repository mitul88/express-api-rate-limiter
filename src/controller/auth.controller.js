module.exports.createUser = async (req, res) => {
  console.log("create user route hit");
  res.send({ message: "create api hit" });
  res.end();
};
