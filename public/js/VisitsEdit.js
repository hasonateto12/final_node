const express = require('express');
const router = express.Router();

let visits=[
    {guardname:"teto",pointId:1,notes:"finished",},
    {guardname:"hasona",pointId:2,notes:"finished",},
];

router.get('/Visit', (req, res) => {
    res.status(200).json(visits);
    res.status(200).json(visitTime);
});


router.post('/Visit', (req, res) => {
    let visit={
    guardname:req.body.guardname,
    pointId :req.body.pointId ,
    notes :req.body.notes ,
    visit_time: new Date().toISOString() 
    };
    visits.push(visit);
    res.status(200).json("ok");
});

router.patch('/Visit', (req, res) => {
    let idx = req.body.idx;  
    if (idx < visits.length) {
        visits[idx].guardname = req.body.guardname;    
        visits[idx].notes = req.body.notes; 
        res.status(200).json("ok");
    } else {
        res.status(404).json("Point not found");
    }
});
router.delete('/Visit', (req, res) => {
    let idx = req.body.idx; 
    if (idx < visits.length) {
        visits.splice(idx, 1);
        res.status(200).json("ok");
    } else {
        res.status(404).json("Point not found");
    }
});


module.exports = router;

