const express = require('express');
const router = express.Router();

const userCon = require("../controllers/user")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json("i");
});
router.get("/create", userCon.create_get)
router.post("/create", userCon.create_post)

module.exports = router;
