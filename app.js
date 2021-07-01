const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', (req,res) => {
  const query = req.body.city
  const apiKey = '9e35d27d474b314464e2bbe46304733c'
  const unit = 'metric'
  console.log(req.body.city)

  const url ="http://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apiKey+"&units="+unit+""

  axios.get(url).then(response => {
    console.log(response.data.weather[0].icon)
    const temp = response.data.main.temp
    const feels = response.data.main.feels_like
    const icon = response.data.weather[0].icon
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    res.write(`<h1>The weather is ${temp} in ${query}</h1>`)
    res.write(`<p>And it feels like ${feels} degrees C </p>`)
    res.write('<img src='+ imageURL +'>')
    res.send()
  })
  .catch(error => {
    console.log(error)
  })
})








app.listen(3000, () => {
  console.log('server running on port 3000')
})

// 9e35d27d474b314464e2bbe46304733c
