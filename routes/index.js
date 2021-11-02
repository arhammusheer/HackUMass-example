const express = require("express");
const router = express.Router();

router.get("/", (req, res) => { 
  res.json({
    message: "Welcome to root API",
  });
});

// Query params example
router.get("/query", (req, res) => {
  query = req.query; // query parameters
  res.send(`Hello ${query.name}!`);
});

// Real world query params example
router.get("/search", (req, res) => {
  query = req.query;
  res.send(`Searching for ${query.q}`);
});

// URL params example
router.get("/url/:name", (req, res) => {
  params = req.params;
  res.send(`Hello ${params.name}!`);
});

// POST example
router.post("/", (req, res) => {
  const body = req.body;
  res.send(`Hello ${body.name}!`);
});

module.exports = router;
