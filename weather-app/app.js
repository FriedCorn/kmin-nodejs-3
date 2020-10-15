const yargs = require('yargs');
const { searchLocation, getLocationWeather } = require('./weather');

// Get user input
const location = yargs.argv.location;
const date = yargs.argv.date;

searchLocation(location, (error, location) => {
    if (error) {
        console.log(error);
        return;
    }
    getLocationWeather({ locationWoeid: location.woeid, date: date}, (error, weather) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(`It's ${weather.weather_state_name} in ${location.title}`);
    })
});