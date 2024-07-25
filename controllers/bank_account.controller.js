const ACCOUNT_MODELS = require("../models/account.models");

getAllAccount = async (req, res, next) => {
  try {
    const result = await ACCOUNT_MODELS.getAllAccounts();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "All bank accounts fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

createAccount = async (req, res, next) => {
  try {
    const { bank_name, bank_account_number, balance, user_id } = req.body;
    if (!bank_name || !bank_account_number || balance === undefined || !user_id) {
      throw new BadRequest("Missing required fields");
    }

    console.log(bank_name, bank_account_number, balance, user_id);
    const result = await ACCOUNT_MODELS.createAccount({
      bank_name,
      bank_account_number,
      balance,
      user_id,
    });

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Account created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllAccount, createAccount };
