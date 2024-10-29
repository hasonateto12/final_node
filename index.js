const express = require('express');
const cors = require('cors'); // Import cors
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 4225;

app.use(cors()); // Use CORS middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("public", "html");
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/points', (req, res) => {
    const points = [
        { id: 1, name: "Point A", location: "Location A" },
        { id: 2, name: "Point B", location: "Location B" }
    ];
    res.json(points);
});

app.post('/api/points', (req, res) => {
    const newPoint = req.body;
    res.status(201).json(newPoint);
});

const point = require('./public/js/PointsEdit');
const visit = require('./public/js/VisitsEdit');
app.use('/points', point);
app.use('/visits', visit);

const vb = require('./V_B');
app.use('/', vb);

app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});

