
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

fetch('http://localhost:3000/weather?address=Bagladesh').then((response) =>{
    response.json().then((data) =>{
        if(data.error){
            console.log(data.error)
            // document.getElementById("forecast").innerText = data.error
        } else {
            console.log(data.location)
            console.log(data.forecast)
            // document.getElementById("forecast").innerText = 'Location: ' + data.location + '\n Forecast: ' + data.forecast
        }
    })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector("input")
const messageOne = document.querySelector('.message1')
const messageTwo = document.querySelector('.message2')
messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    // const url = 'http://localhost:3000/weather?address=' + location

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) =>{    
        if(data.error){
            messageOne.textContent = data.error
        }
        else {
            messageOne.textContent = 'Name of Location: ' + data.location
            messageTwo.textContent = 'Forcast (Current): ' + data.forecast
        }
    })
    })

})