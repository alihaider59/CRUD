const express = require("express");
const router = express.Router();

router.use(express.json());

const mainContrlr = require("../controllers/mainController");
const middleware = require("../Middlewares/middleware1")

router.get("/user", mainContrlr.getUsers);

router.post("/user", mainContrlr.postUser);

router.patch("/user/:id", mainContrlr.patchUser);

router.put("/user/:id", mainContrlr.putUser);

router.delete("/user/delete", mainContrlr.deleteUser);

router.use("/user/login", middleware, mainContrlr.loginUser);

module.exports = router;
