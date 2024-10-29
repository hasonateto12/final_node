const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 4225;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files from public directory

let points = [
    { name: "Point1", location: 1 },
    { name: "Point2", location: 2 },
];

// Fetch all points
app.get('/points', (req, res) => {
    res.status(200).json(points);
});

// Add a new point
app.post('/points', (req, res) => {
    let point = {
        name: req.body.name,
        location: req.body.location
    };
    points.push(point);
    res.status(200).json("ok");
});

// Edit a point
app.patch('/points', (req, res) => {
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
app.delete('/points', (req, res) => {
    let idx = req.body.idx;  // Expect 'idx' to identify which point to delete
    if (idx < points.length) {
        points.splice(idx, 1);
        res.status(200).json("ok");
    } else {
        res.status(404).json("Point not found");
    }
});

app.listen(port, () => {
    console.log(`Now listening on http://localhost:${port}`);
});
