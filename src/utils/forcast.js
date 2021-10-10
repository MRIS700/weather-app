const request = require('request')

const forcast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8f884b98e3bac09a847ee27948bfe6c8&query='+ latitude +',-'+ longitude +'&units=m'

    request({url, json: true}, (error, {body}) => {

        if(error){
            callback('Connection Failed to Load! Check your internet connection!', undefined)
        } else if (body.error){
            callback('Forcast request invalid! Please check again the location name...', undefined)
        }else{
            const temp = body.current.temperature
            const weather = body.current.weather_descriptions
            const precip = body.current.precip
            const humidity = body.current.humidity
            const feelsLike = body.current.feelslike
            callback(undefined, `Weather Status: ${weather}, Actual Temperature is ${temp}°C, Feels Like : ${feelsLike}°C, Humidity: ${humidity} and The chance of Rain is ${precip}%`)
            
        }
    })

}

module.exports = forcast