const express = require('express');
const router = express.Router();

const userCon = require("../controllers/user")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.json("uaaaaaaaaaaaaa");
});
router.get("/create", userCon.create_get);
router.post("/api/create", userCon.create_post);
router.get("/api/login", userCon.log_in_get);
router.post("/api/login", userCon.log_in_post);

module.exports = router;
