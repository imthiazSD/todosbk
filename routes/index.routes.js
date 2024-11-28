const router = require("express").Router();
const auth = require("../middleware/auth");
const noteRoutes = require("./note.routes");

router.use("/notes", auth, noteRoutes);

module.exports = router;
