// http://localhost:8000/api/alpha/jokes

const express = require("express");
const router = express.Router();
const jokesDB = require("../../../models/joke");

router.get("/", async function (req, res) {
  let jokes = await jokesDB.find({}).sort("-createdAt");
  console.log(jokes);
  return res.json(200, {
    message: "Haslo ye saare jokes hai",
    jokes: jokes,
  });
});

module.exports = router;
