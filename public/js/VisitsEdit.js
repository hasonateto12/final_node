const express = require('express');
const router = express.Router();

let visits=[
    {guardname:"teto",pointId:1,notes:"finished",},
    {guardname:"hasona",pointId:2,notes:"finished",},
];

router.post('/Visit', (req, res) => {
    let visit={};
    visit.guardname=req.body.guardname;
    visit.pointId =req.body.pointId ;
    visit.notes =req.body.notes ;
    let visitTime= new Date();
    visits.push(visit);
    visits.push(visitTime);
    res.status(200).json("ok");
});
router.patch('/Visit', (req, res) => {
    let idx=req.body.idx;
    let visit={};
    visit.guardname  =req.body.guardname;
    visit.pointId=req.body.pointId;
    visit.notes=req.body.notes;
    visits[idx]=visit;

    res.status(200).json("ok");
});
router.delete('/Visit', (req, res) => {
    let idx=req.body.idx;
    visits.splice(idx, 1);

    res.status(200).json("ok");
})
router.get('/Visit', (req, res) => {
    res.status(200).json(visits);
    res.status(200).json(visitTime);
});

module.exports = router;

