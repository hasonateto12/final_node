const express = require('express');
const router = express.Router();

let points = [
    { name: "Point1", location: 1 },
    { name: "Point2", location: 2 },
];

// Fetch all points
router.get('/', (req, res) => {
    res.status(200).json(points);
});

// Add a new point
router.post('/', (req, res) => {
    let point = {
        name: req.body.name,
        location: req.body.location
    };
    points.push(point);
    res.status(200).json("ok");
});

// Edit a point
router.patch('/', (req, res) => {
    let idx = req.body.idx;  // Expect 'idx' to identify which point to update
    if (idx < points.length) {
        points[idx].name = req.body.full_name;  // Update name
        points[idx].location = req.body.location;  // Update location
        res.status(200).json("ok");
    } else {
        res.status(404).json("Point not found");
    }
});

// Delete a point
router.delete('/', (req, res) => {
    let idx = req.body.idx;  // Expect 'idx' to identify which point to delete
    if (idx < points.length) {
        points.splice(idx, 1);
        res.status(200).json("ok");
    } else {
        res.status(404).json("Point not found");
    }
});

module.exports = router;  // Export the router
