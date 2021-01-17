const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//
const public_dir = path.join(__dirname, '../public')
const views_dir = path.join(__dirname, '../templates/views')
const partials_dir = path.join(__dirname, '../templates/partials')

//
app.set('view engine', 'hbs')
app.set('views', views_dir)
hbs.registerPartials(partials_dir)

//
app.use(express.static(public_dir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bobby',
        script: true
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'What ?',
        desc: 'This is Bob',
        name: 'Lobby'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Huh ?',
        message: 'What ?',
        name: 'Dobby'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (error, { cordinates, location } = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(cordinates, (error, message) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                message,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Add something to search' 
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Can\'t help... Sorry'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Haha!'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})