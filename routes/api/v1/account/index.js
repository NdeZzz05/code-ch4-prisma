var express = require("express");
var router = express.Router();

const ACCOUNT_CONTROLLER = require("../../../../controllers/bank_account.controller");

router.get("/", ACCOUNT_CONTROLLER.getAllAccount);
router.post("/", ACCOUNT_CONTROLLER.createAccount);

module.exports = router;
