const request = require('request')

const forcast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=06451cc05ea1c8bfdcc9fa7ea3adf748&query='+ latitude +',-'+ longitude +'&units=m'

    request({url, json: true}, (error, {body}) => {

        if(error){
            callback('Connection Failed to Load! Check your internet connection!', undefined)
        } else if (body.error){
            callback('Forcast request invalid! Please check again the location name...', undefined)
        }else{
            const temp = body.current.temperature
            const weather = body.current.weather_descriptions
            const precip = body.current.precip
            callback(undefined, `The weather is ${weather}, Temperature: ${temp} degree Celcius and The chance of Rain is ${precip}%`)
            
        }
    })

}

module.exports = forcast