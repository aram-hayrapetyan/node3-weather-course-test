const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYS1jb3JkaW5hdGUtaCIsImEiOiJja2l2bTc5c2IzYjVuMnlxamZ0ajNoZGg0In0.9pQ22AZ7PmmwPfyJrreqzg&limit=1'

    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to geocoding services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location!', undefined)
        } else {
            const data = body.features[0]
            callback(undefined, {
                cordinates: data.center.reverse().join(','),
                latitude: data.center[1],
                longitude: data.center[0],
                location: data.place_name
            })
        }
    })
}

module.exports = geocode