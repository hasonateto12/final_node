const express = require('express');
const router = express.Router();

let points = [];

router.get('/Point', (req, res) => {
    res.status(200).json(points);
});


router.post('/Point', (req, res) => {
    let point = {
        name: req.body.name,
        location: req.body.location
    };
    points.push(point);
    res.status(200).json("ok");
});


router.patch('/Point', (req, res) => {
    let idx = req.body.idx;  
    if (idx < points.length) {
        points[idx].name = req.body.full_name;  
        points[idx].location = req.body.location;  
        res.status(200).json("ok");
    } else {
        res.status(404).json("Point not found");
    }
});


router.delete('/Point', (req, res) => {
    let idx = req.body.idx; 
    if (idx < points.length) {
        points.splice(idx, 1);
        res.status(200).json("ok");
    } else {
        res.status(404).json("Point not found");
    }
});

module.exports = router;  
