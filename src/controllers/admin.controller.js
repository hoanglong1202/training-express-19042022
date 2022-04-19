const { AdminService } = require("../services");

const getAllUser = async (req, res, next) => {
  const result = await AdminService.getAllUser();

  res.status(200).send({
    success: true,
    message: "Fetching data successfullyy",
    dataObj: result,
  });
};

module.exports = { getAllUser };
