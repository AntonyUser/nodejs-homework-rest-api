const express = require("express");

const { users: controllers } = require("../../controllers");
const { auth, validation, controllerWrapper } = require("../../middleware");
const { subscriptionJoiSchema } = require("../../models/user");

const router = express.Router();

router.get("/current", auth, controllerWrapper(controllers.getCurrent));
router.patch(
  "/",
  auth,
  validation(subscriptionJoiSchema),
  controllerWrapper(controllers.changeSubscription)
);

module.exports = router;
