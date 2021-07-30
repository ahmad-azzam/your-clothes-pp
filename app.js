const express = require('express')
const session = require('express-session');
const router = require('./routes/index')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')

app.set('view engine', 'ejs')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: false }))
app.use('/dashboard', express.static(path.join(__dirname, 'public/dashboard')))

app.use('/', router)

app.listen(PORT, () => {
  console.log('App is listening in port', PORT);
})