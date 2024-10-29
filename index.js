const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 4225;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files from public directory

// Import the points routes
const pointsRoutes = require('./public/js/PointsEdit');  // Adjust the path if necessary

// Use the points routes
app.use('/points', pointsRoutes);

app.listen(port, () => {
    console.log(`Now listening on http://localhost:${port}`);
});
