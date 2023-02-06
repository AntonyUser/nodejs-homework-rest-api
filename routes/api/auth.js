const express = require("express");

const { auth: controllers } = require("../../controllers");
const { auth, validation, controllerWrapper } = require("../../middleware");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(joiRegisterSchema),
  controllerWrapper(controllers.register)
);
router.post(
  "/login",
  validation(joiLoginSchema),
  controllerWrapper(controllers.login)
);
router.get("/logout", auth, controllerWrapper(controllers.logout));

module.exports = router;
