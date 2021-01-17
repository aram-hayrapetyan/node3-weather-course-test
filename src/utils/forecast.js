const request = require('postman-request')

const forecast = (cordiantes, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2324072fc88a2bd84358ce12fda8fd8e&query=' + cordiantes + '&units=f'

    request({url, json: true}, (error, { body } = {}) => {
        if (error){
            callback('Undable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to get location!', undefined)
        } else {
            const current_data = body.current
            const message = `<img id="weather-icon" src=${current_data.weather_icons}> ${current_data.weather_descriptions[0]}. It is currently ${current_data.temperature} deggress out. It feels like ${current_data.feelslike} deggress out.`
            callback(undefined, message)
        }
    })
}

module.exports = forecast