const express = require('express');
const router = express.Router();

const userCon = require("../controllers/user");
const postCon = require("../controllers/post")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.json("uaaaaaaaaaaaaa");
});
router.get("/create", userCon.create_get);
router.post("/api/create", userCon.create_post);
router.get("/login", userCon.log_in_get);
router.post("/api/login", userCon.log_in_post);
router.get("/write", postCon.create_get)
router.post("/api/write", postCon.create_post);

module.exports = router;
