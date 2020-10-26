const request = require('request');

const searchLocation = (location, callback) => {
    request(`https://www.metaweather.com/api/location/search/?query=${location}`, { json: true }, (error, res, body) => {
        if (error) {
            callback(error, undefined);
        }
        if (body.length == 0) {
            callback(`No location found for "${location}"`, undefined);
            return;
        }
        // if (body.length > 1) {
        //     const limit = 5;

        //     console.log(
        //         body
        //             .splice(0, limit)
        //             .map((item) => item.title)
        //             .join(", ")
        //     );

        //     if (body.length > 0) {
        //         console.log(`and ${body.length} more location`);
        //     }

        //     return;
        // }

        callback(null, body);
    });
}

const getLocationWeather = ({ locationWoeid, date }, callback) => {
    request(`https://www.metaweather.com/api/location/${locationWoeid}/`, { json: true }, (err, body) => {
        if (body.length == 0) {
            callback("No data found", undefined);
            return;
        }
        const weather = body.consolidated_weather;
        if (date == undefined) {
            callback(null, weather[0]);
            return;
        }
        checkAndConvertDate(date, (error, dateConverted) => {
            if (error) {
                callback(error, undefined);
                return;
            }
            for (const i in weather) {
                if (weather[i].applicable_date == dateConverted) {
                    callback(null, weather[i]);
                    return;
                }
            }
            callback(`No weather data of ${date}`, undefined);
        })
    })
}

// Check date and convert dd/mm/yyyy -> yyyy-mm-dd
const checkAndConvertDate = (date, callback) => {
    let day = '', month = '', year = '';
    if (date[2] != '/' || date[5] != '/') {
        callback("Wrong format of date", undefined);
        return;
    }
    for (const i in date) {
        if (i != 2 && i != 5) {
            if ((date[i]) < '0' || (date[i]) > '9') {
                callback("Wrong input", undefined);
                return;
            }
        }
    }
    day = date[0] + date[1];
    month = date[3] + date[4];
    year = date[6] + date[7] + date[8] + date[9];

    callback(null, year + '-' + month + '-' + day);
    // i = 0;
    // while (date[i] != '/') {
    //     day += date[i];
    //     i++;
    // }
    // i++;
    // while (date[i] != '/') {
    //     month += date[i];
    //     i++;
    // }
    // i++;
    // while (i < date.length) {
    //     year += date[i];
    //     i++;
    // }
    // return year+'-'+month+'-'+day;
}

module.exports = {
    searchLocation,
    getLocationWeather
}