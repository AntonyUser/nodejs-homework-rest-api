const express = require("express");

const { auth: controllers } = require("../../controllers");
const { auth, validation, controllerWrapper } = require("../../middleware");
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiVerifyEmailSchema,
} = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(joiRegisterSchema),
  controllerWrapper(controllers.register)
);
router.get(
  "/verify/:verificationToken",
  controllerWrapper(controllers.verifyEmail)
);

router.post(
  "/verify",
  validation(joiVerifyEmailSchema),
  controllerWrapper(controllers.resendVerifyEmail)
);
router.post(
  "/login",
  validation(joiLoginSchema),
  controllerWrapper(controllers.login)
);
router.get("/logout", auth, controllerWrapper(controllers.logout));

module.exports = router;
