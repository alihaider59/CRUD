const express = require("express");
const router = express.Router();

router.use(express.json());

const mainContrlr = require("../controllers/mainController");

router.get("/user", mainContrlr.getUsers);

router.post("/user", mainContrlr.postUser);

router.patch("/user", mainContrlr.patchUser);

module.exports = router;
