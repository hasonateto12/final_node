const express = require('express');
const port = 4225;
const app = express();
const path = require('path');
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const cors = require('cors');
app.use(cors());

app.set("public", "html");
app.use(express.static(path.join(__dirname, 'public')));


const point = require('./public/js/PointsEdit');
const visit = require('./public/js/VisitsEdit');
app.use('/points', point);
app.use('/visits', visit);

const vb = require('./V_B');
app.use('/', vb);

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port http://localhost:${port}`);
});
