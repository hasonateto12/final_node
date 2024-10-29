const path = require('path');
const express = require('express');
const router = express.Router();

router.get("/pointshtml", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "points.html")); 
});

router.get("/visitshtml", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "visits.html")); 
});

module.exports = router;
