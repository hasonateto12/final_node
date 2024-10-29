const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const path = require('path');
app.use(express.static(path.join(__dirname, "public")));

let  visits=[];
visits.push({name:"teto",id:"0003323", notes:"finished",visittime:"13/10/2024,12:36:34"});
visits.push({name:"teto",id:"0003323", notes:"finished",visittime:"13/10/2024,12:36:34"});

app.post('/visitAdd', (req, res) => {
    let visit={};
    visit.name=req.body.full_name;
    visit.id =req.body.id ;
    visit.notes = req.body.notes ;
    visits.push(visit);

    res.status(200).json("ok");
});
app.patch('/visitEdit', (req, res) => {
    let idx=req.body.idx;
    let visit={};
    visit.name=req.body.name;
    visit.id =req.body.id ;
    visit.notes = req.body.notes ;
    visits[idx]=visit;
    res.status(200).json("ok");
});
app.delete('/visitDelete', (req, res) => {
    let idx=req.query.id;
    visits.splice(idx, 1);

    res.status(200).json(visits);
})
app.get('/visitsList', (req, res) => {
    res.status(200).json(visits);
});


app.get('/', (req, res) => {
    es.status(200).sendFile(path.join(__dirname,"/public/bekor.html"));
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port http://localhost:${port}`);
});
