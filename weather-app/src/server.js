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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})