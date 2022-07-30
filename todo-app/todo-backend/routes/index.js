const express = require("express");
const router = express.Router();

const redis = require("../redis");
const configs = require("../util/config");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get("/statistics", async (_, res) => {
  const todoCount = await redis.getAsync("addedd_todos");
  res.send({ addedd_todos: todoCount });
});

module.exports = router;
