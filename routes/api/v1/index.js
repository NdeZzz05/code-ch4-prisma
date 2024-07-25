const express = require("express");
const router = express.Router();
const USER_ROUTER = require("./user");
const TRANSACTION_ROUTER = require("./transaction");
const ACCOUNT_ROUTER = require("./account");

router.use("/users", USER_ROUTER);
router.use("/transactions", TRANSACTION_ROUTER);
router.use("/accounts", ACCOUNT_ROUTER);

module.exports = router;
