const express = require('express');
const path = require('path');
const hbs = require('hbs');

// Create Express Application
const app = express();

// Config file paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');



// Set public folder as static
app.use(express.static(publicDirectoryPath));

// Set view engine and config handlebars
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);


// Home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Eren'
    })
})

// About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Eren',
        picture: 'img/pic.png'
    })
})

// Weather page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a help message'
    })
})


// ExpressJS
app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
    });
})

// 404 Page
app.get('*', (req, res) => {
    res.render('404', {title: '404', message: 'Page not found'})
})

// app.com
// app.com/help
// app.com/about


app.listen(3000, () => {
    console.log('Server is up on port 3000');
})