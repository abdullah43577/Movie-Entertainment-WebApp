const express = require("express")
const router = express.Router();
const saveController = require("../controllers/saveController")
const bodyParser = require ('body-parser');
const cors = require ('cors');
const requireAuth  = require("../utls/middleware");

router.use (bodyParser.urlencoded ({extended: true}));
router.use (bodyParser.json ());
router.use (express.json ());
router.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "UPDATE", "DELETE", "PUT"],
    credentials: true,

}))

router.use(requireAuth)

router
.post("/newBookmark", saveController.newBookmark)

router
.post("/getBookmarks", saveController.getBookmarks)

router
.get("/getBookmark/:id", saveController.getBookmarkId)

router
.delete("/deleteBookmark/:id", saveController.deleteBookmark)

module.exports = router