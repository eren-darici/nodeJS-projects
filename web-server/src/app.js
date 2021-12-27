const express = require('express');
const path = require('path');

// Create Express Application
const app = express();

// Public files path
const publicDirectoryPath = path.join(__dirname, '../public');

// Set public folder as static
app.use(express.static(publicDirectoryPath));
// Set view engine
app.set('view engine', 'hbs');

// ExpressJS
app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
    });
})

// app.com
// app.com/help
// app.com/about


app.listen(3000, () => {
    console.log('Server is up on port 3000');
})