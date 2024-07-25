var express = require("express");
var router = express.Router();

const TRANSACTION_CONTROLLER = require("../../../../controllers/transaction.controller");

router.get("/", TRANSACTION_CONTROLLER.getAllTransactions);
router.get("/:id", TRANSACTION_CONTROLLER.getDetailTransactions);
router.post("/", TRANSACTION_CONTROLLER.createTransaction);
router.post("/cash-deposit", TRANSACTION_CONTROLLER.createCashDeposit);

module.exports = router;
