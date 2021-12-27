const request = require('request');
const dotenv = require('dotenv').config();


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_TOKEN}`;
    request({url: url, json: true}, (error, {body})=>{
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined);
        }
        else {
            const data = body.features[0];
            var latitude = data.center[1];
            var longitude = data.center[0];
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: data.place_name
            });
        }
    });
}

module.exports = geocode;