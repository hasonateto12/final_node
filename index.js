const express = require('express');
const port = 4225;
const app = express();
const path = require('path');
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.set("public", "html");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'js')));


const pointRoutes = require('./js/PointsEdit');
const visitRoutes = require('./js/VisitsEdit');
app.use('/points', pointRoutes);
app.use('/visits', visitRoutes);

const vb = require('./V_B');
app.use('/', vb);

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port http://localhost:${port}`);
});
