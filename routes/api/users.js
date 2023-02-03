const express = require("express");

const { users: controllers } = require("../../controllers");
const { auth, controllerWrapper } = require("../../middleware");

const router = express.Router();

router.get("/current", auth, controllerWrapper(controllers.getCurrent));

module.exports = router;
