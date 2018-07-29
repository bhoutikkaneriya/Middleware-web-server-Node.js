const express = require('express');

const port  = process.env.PORT || 3000
const app = express()
const hbs = require('hbs')
const fs = require('fs');



// app.use((req,res,next) => {
//     res.send('<h1>Site under Maintainence</h1>')
//     next()
// })
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear()
    // return 'test'
})

hbs.registerHelper('ScreamIt',(text) => {
    return text.toUpperCase();
    // return 'test'
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
    // res.send('<h1>Site under Maintainence</h1>')
})


app.get('/', (req,res) => {
    // console.log(req)
    // console.log(res)
   //res.send('<h1>Hello Express</h1>') // now the content-type is text/html
    // res.send({                       // now the content-type is json, express is very smart it does that automatically
    //     name : 'bhoutik',
    //     age: 27
    // })
    res.render('home.hbs', {
        greeting : 'Welcome',
        pageTitle: 'Home Page'
        // currentYear : new Date().getFullYear()
    })
})

app.get('/about', (req,res) => {
    // res.send('About Page')
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