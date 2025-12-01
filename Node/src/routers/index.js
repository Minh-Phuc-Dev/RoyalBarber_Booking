const express = require('express');
const { MediaController } = require("src/controllers/MediaController");
const router = express.Router();

router.use(
    "/api",
    require("src/routers/Services")
)

router.use(
    "/api",
    require("src/routers/Authenticate")
)

router.use(
    "/api",
    require("src/routers/Users")
)

router.use(
    "/api",
    require("src/routers/Booking")
)

router.use(
    "/api",
    require("src/routers/Promotion")
)

router.use(
    "/api",
    require("src/routers/Chatbot")
)

router.use(
    "/api",
    require("src/routers/Dashboard")
)

router.post(
    "/api/media",
    MediaController.upload
)

router.get(
    "/api/media/:file",
    MediaController.get
)

module.exports = router;
