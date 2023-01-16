const express = require("express");
const { Wrapper } = require("../../helpers");
const { validateBody, authenticate, upload } = require("../../middleware");
const ctrl = require("../../controllers/auth");
const { schemas } = require("../../models/user");

const router = express.Router();
router.post(
  "/signup",
  validateBody(schemas.registerSchema),
  Wrapper(ctrl.register)
);

router.post("/login", validateBody(schemas.loginSchema), Wrapper(ctrl.login));

router.get("/current", authenticate, Wrapper(ctrl.getCurrent));

router.post("/logout", authenticate, Wrapper(ctrl.logout));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  Wrapper(ctrl.updateAvatar)
);
module.exports = router;
