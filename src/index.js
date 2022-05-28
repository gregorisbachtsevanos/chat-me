const express = require('express')
const mongoose = require('mongoose')
const socketio = require('socket.io')
const passport = require('passport')
const localStrategy = require('passport-local')
const session = require('express-session')
const ejs = require('ejs')
const ejsMate = require('ejs-mate')
const path = require('path')
const http = require('http')

const User = require('../model/user')
const userRouter = require('../router/user')

const sessionConfig = {
    secret: 'd7sa8d789das65da4sd7sa',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
const app = express()
const PORT = 3000

mongoose.connect('mongodb://localhost:27017/chat', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once("open", () => console.log("Database connected"));

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../view'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// socket
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('sendMsg', ({msg, personId}) => {
        // socket.join(personId)
        connectedUsers[i].emit('message',  {msg, personId})
        
    })

})


// socket

app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})
app.use('/', userRouter)

server.listen(PORT, () => console.log('Server is up and running'))