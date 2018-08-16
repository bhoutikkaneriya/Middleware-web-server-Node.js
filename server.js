const express = require('express');

const port  = process.env.PORT || 3000
const app = express()
const hbs = require('hbs')
const fs = require('fs');


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear()
})

hbs.registerHelper('ScreamIt',(text) => {
    return text.toUpperCase();
})

app.use((req,res,next) => {
    const now = new Date().toString()
    var log = `Time is ${now}: ${req.method} : ${req.url}`
    fs.appendFile('log.txt', log + '\n' , (err) => {
        if(err) {
            console.log(err)
        }
    })
    next();
})

app.get('/', (req,res) => {
    res.render('home.hbs', {
        greeting : 'Welcome',
        pageTitle: 'Home Page'
    })
})

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    })
})

app.get('/bad', (req,res) => {
    res.send('bad / error')
})

app.listen(port,() => {
    console.log('Server is running')
})