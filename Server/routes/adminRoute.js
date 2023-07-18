const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController")
const bodyParser = require ('body-parser');
const cors = require ('cors');
const  requireAuth  = require("../utls/middleware");

router.use (bodyParser.urlencoded ({extended: true}));
router.use (bodyParser.json ());
router.use (express.json ());
router.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "UPDATE", "DELETE", "PUT"],
    credentials: true,

}))

// router.use(requireAuth)


router
.post("/register", adminController.register)

router
.post("/login", adminController.login)

router
.get("/getUsers", adminController.getUsers)

router
.post("/getBookmarks", adminController.getBookmarks)


module.exports = router;