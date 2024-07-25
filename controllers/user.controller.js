const { BadRequest, NotFoundError } = require("../errors/customsErrors");
const USER_MODELS = require("../models/user.models");

getUser = async (req, res, next) => {
  try {
    const result = await USER_MODELS.getUser();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

getDetailUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await USER_MODELS.getDetailUser(id);
    if (!result) throw new NotFoundError("User tidak ditemukan");
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User found successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

createUser = async (req, res, next) => {
  try {
    let data = req.body;
    if (!data.name || !data.email) throw new BadRequest("Tolong isi semua kolom");
    // if (!data.email) throw new BadRequest("Email tidak boleh kosong");
    const result = await USER_MODELS.createUser(data);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser, getDetailUser, createUser };
