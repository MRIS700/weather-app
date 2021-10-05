const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const port = 3000
const name = 'Md. Rakibul Islam'
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')
const request = require('request')

// changing directory
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set method
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// console.log(__dirname)
// console.log(publicDirectoryPath)

app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index',{
        name,
        title: "Weather"
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About Me',
        name
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help',
        name
        //if want to provide any dynamic value
    })
})

app.get('/weather', (req, res)=> { 
    if(!req.query.address){
        return res.send({
            error: 'Please enter an address name'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, placeName}= {}) => {
        if( error){
            return res.send({error})
        }else{
            forcast(latitude, longitude, (error, forcastData) =>{
                if(error){
                    return res.send({error})
                } else {
                    res.send({
                        forecast : forcastData,
                        location : placeName,
                        address : req.query.address 
                    })
                }
            })
        }
        })
    }
    // res.send({
    //     forecast: 'Cloudy',
    //     location: 'BD',
    //     address: req.query.address
    // })
})

// *** This is how to check express.js works
// app.get('',(req, res) => {
//     res.send('<h1>Home Page</h1><br><h2>Ok</h2>')
// })


// // /weather 
// app.get('/weather', (req, res)=> {
//     res.send(
//         [{
//             forecast: 'Sunnay Day',
//             location: 'Bangladesh'
//         }
//         ]
//     )
// })

app.get('/help/*',(req, res) => {
    // res.send('Help page not found')
    res.render('404',{
        name,
        title: '!',
        errorMsg: 'Help Page Not Found'
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        name,
        title: 'Error Page',
        errorMsg: 'Page Not Found'
    })
    // res.send('404 not found')
})


// Listening from localhost:port

app.listen(port, () => {
    console.log('Finally you reached ',port)
})


//localhost:3000