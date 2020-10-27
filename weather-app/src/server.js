const express = require('express');
const exphbs = require('express-handlebars');
const {searchLocation, getLocationWeather} = require('./weather');

const app = express();
const port = 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    const searchText = req.query.searchText;

    if(!searchText) {
        res.render('home', {searchText});
        return;
    }
    searchLocation(searchText, (error, locations) => {
        res.render('home', {searchText, locations, error});
    });
});

app.get('/weatherForecast/:locationWoeid', (req, res) => {
    const locationWoeid = req.path.split("/weatherForecast/")[1]*1;
    const date = "";
    getLocationWeather({locationWoeid, date}, (error, detailLocation) => {
        const weathers = detailLocation.consolidated_weather;
        const locationName = detailLocation.title;
        for (const i in weathers) {
            weathers[i].min_temp = Math.round(weathers[i].min_temp);
            weathers[i].max_temp = Math.round(weathers[i].max_temp);
        }
        res.render('weather_forecast', {weathers, locationName, error});
    })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});