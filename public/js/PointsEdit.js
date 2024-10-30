const express = require('express');
const router = express.Router();
let points=[
    {name:"Point1",location:1},
    {name:"Point2", location:2},
];

router.post('/Point', (req, res) => {
    let point={};
    point.name=req.body.name;
    point.location =req.body.location ;
    points.push(point);

    res.status(200).json("ok");
});
router.patch('/Point', (req, res) => {
    let idx=req.body.idx;
    let point={};
    point.name  =req.body.full_name;
    point.location=req.body.location;
   points[idx]=point;
    res.status(200).json("ok");
});
router.delete('/Point', (req, res) => {
    let idx=req.body.idx;
    points.splice(idx, 1);

    res.status(200).json("ok");
})
router.get('/Point', (req, res) => {
    res.status(200).json(points);
});

module.exports = router;

