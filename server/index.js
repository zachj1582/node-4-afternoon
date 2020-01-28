require('dotenv').config()
const express = require('express'),
      app = express(),
      session = require('express-session'),
      cfs = require('./middlewares/checkForSession'),
      sc = require('./controllers/swagController'),
      ac = require('./controllers/authController'),
      cc = require('./controllers/cartController'),
      searchc = require('./controllers/searchController');

let {SERVER_PORT, SESSION_SECRET} = process.env

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}))
app.use(cfs)
app.use(express.static(`${__dirname}/../build`))
//endpoints
//swag
app.get('/api/swag', sc.read)
//auth
app.post('/api/login', ac.login)
app.post('/api/register', ac.register)
app.post('/api/signout', ac.signout)
app.get('/api/user', ac.getUser)
//cart
app.post('/api/cart/checkout', cc.checkout)
app.post('/api/cart/:id', cc.add)
app.delete('/api/cart/:id', cc.delete)
//search
app.get('/api/search', searchc.search)

app.listen(SERVER_PORT, ()=> console.log(`Server running on ${SERVER_PORT}`))
