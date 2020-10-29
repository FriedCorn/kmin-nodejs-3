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
    const locationWoeid = req.params.locationWoeid;
    const date = "";
    getLocationWeather({locationWoeid, date}, (error, detailLocation) => {
        if (error) {
            res.render('error', {error});
            return;
        }
        const weathers = detailLocation.consolidated_weather;
        const locationName = detailLocation.title;
        for (const i in weathers) {
            weathers[i].min_temp = Math.round(weathers[i].min_temp);
            weathers[i].max_temp = Math.round(weathers[i].max_temp);
            weathers[i].applicable_date = convertDate(weathers[i].applicable_date);
        }
        res.render('weather_forecast', {weathers, locationName, error});
    })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const convertDate = (date) => {
    const dateConverted = date[8] + date[9] + '-' + date[5] + date[6] + '-' + date[0] + date[1] + date[2] + date[3];
    return dateConverted;
}