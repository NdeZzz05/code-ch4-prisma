const { BadRequest, NotFoundError } = require("../errors/customsErrors");
const TRANSACTION_MODELS = require("../models/transaction.models");

getAllTransactions = async (req, res, next) => {
  try {
    const result = await TRANSACTION_MODELS.getAllTransactions();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Transactions fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

getDetailTransactions = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await TRANSACTION_MODELS.getTransactionById(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Detail transactions fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

createTransaction = async (req, res, next) => {
  try {
    const { amount, source_account_id, destination_account_id } = req.body;
    // if (!amount || !source_account_id || !destination_account_id) {
    //   throw new BadRequest("Missing required fields");
    // }

    const result = await TRANSACTION_MODELS.createTransaction({
      amount,
      source_account_id,
      destination_account_id,
    });

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Transaction created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

createCashDeposit = async (req, res, next) => {
  try {
    const { amount, destination_account_id } = req.body;
    if (!amount || !destination_account_id) {
      throw new BadRequest("Missing required fields");
    }

    const result = await TRANSACTION_MODELS.createCashDeposit(amount, destination_account_id);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Cash deposit created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTransactions, getDetailTransactions, createTransaction, createCashDeposit };
