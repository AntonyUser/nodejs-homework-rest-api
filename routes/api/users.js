const express = require("express");

const { users: controllers } = require("../../controllers");
const {
  auth,
  upload,
  validation,
  controllerWrapper,
} = require("../../middleware");
const { subscriptionJoiSchema } = require("../../models/user");

const router = express.Router();

router.get("/current", auth, controllerWrapper(controllers.getCurrent));
router.patch(
  "/",
  auth,
  validation(subscriptionJoiSchema),
  controllerWrapper(controllers.changeSubscription)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  controllerWrapper(controllers.updateAvatar)
);

module.exports = router;
