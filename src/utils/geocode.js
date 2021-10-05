const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibXJpczcwMCIsImEiOiJja3R2NDkyM2UyNmtpMnZvM3Vkcjdmcm1hIn0._gsAfXiETlBTBhUyfRt01Q&limit=1'


    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Connection Failed to Load', undefined)
        } else if(body.features.length === 0){
            callback('Geocode request not found! Search for another address', undefined)
        } else {
            callback(undefined, {
            latitude : body.features[0].center[1],
            longitude : body.features[0].center[0],
            placeName : body.features[0].place_name
            })
            
        }
    })
}

module.exports = geocode