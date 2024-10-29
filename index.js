const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 4225;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cors.static(path.join(__dirname, 'public')));  // Serve static files from public directory

const pointsRoutes = require('./jsedit/PointsEdit');
app.use('/points', pointsRoutes);

app.listen(port, () => {
    console.log(`Now listening on http://localhost:${port}`);
});
