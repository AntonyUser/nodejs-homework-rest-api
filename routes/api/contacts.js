const express = require("express");

const { contacts: controllers } = require("../../controllers");
const { auth, validation, controllerWrapper } = require("../../middleware");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

const validationMiddlewere = validation(joiSchema);

const router = express.Router();

router.get("/", auth, controllerWrapper(controllers.getAll));

router.get("/:contactId", controllerWrapper(controllers.getById));

router.post(
  "/",
  auth,
  validationMiddlewere,
  controllerWrapper(controllers.addContact)
);

router.put(
  "/:contactId",
  validationMiddlewere,
  controllerWrapper(controllers.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  controllerWrapper(controllers.changeFavorite)
);

router.delete("/:contactId", controllerWrapper(controllers.deleteContact));

module.exports = router;
