var express = require("express");
var router = express.Router();

const USER_CONTROLLER = require("../../../../controllers/user.controller");

router.get("/", USER_CONTROLLER.getUser);
router.get("/:id", USER_CONTROLLER.getDetailUser);
router.post("/", USER_CONTROLLER.createUser);

module.exports = router;
