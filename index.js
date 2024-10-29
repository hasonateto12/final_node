const express = require('express');
const port = 4225;

const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const cors = require('cors');
app.use(cors());

const path = require('path');
app.use(express.static(path.join(__dirname, 'public'))); 


const points = require('./public/js/PointsEdit');  
app.use('/points', points);


const visits = require('./public/js/VisitsEdit'); 
app.use('/visits', visits);

app.listen(port, () => {
    console.log(`Now listening on http://localhost:${port}`);
});
