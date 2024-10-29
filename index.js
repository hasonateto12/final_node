const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 4225;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); 


const points = require('./public/js/PointsEdit');  
app.use('/points', points);


const visits = require('./public/js/VisitsEdit'); 
app.use('/visits', visits);

app.listen(port, () => {
    console.log(`Now listening on http://localhost:${port}`);
});
