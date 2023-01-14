const express = require("express");
const controllers = require("../../controllers/contacts");
const { Wrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middleware");
const { schemas } = require("../../models/contact");
const router = express.Router();

router.get("/", authenticate, Wrapper(controllers.listContacts));

router.get("/:id", authenticate, Wrapper(controllers.getContactById));

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  Wrapper(controllers.add)
);

router.delete("/:id", authenticate, Wrapper(controllers.removeContact));

router.put(
  "/:id",
  authenticate,
  validateBody(schemas.addSchema),
  Wrapper(controllers.updateContact)
);

router.patch(
  "/:id/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  Wrapper(controllers.patch)
);

module.exports = router;
