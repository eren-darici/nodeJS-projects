const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

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
        message: 'You can navigate to Index page and search your location with address or postal code!'
    })
})


// ExpressJS
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error: error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error: error})
            }

            res.send({
                forecast: {
                    temperature: forecastData.temperature,
                    description: forecastData.weather_descriptions[0],
                    pcip: forecastData.precip,
                },
                location: location,
                weather_icon: forecastData.weather_icons[0],
            })
        })
    })

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