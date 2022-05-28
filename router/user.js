const express = require('express')
const router = express.Router()
const User = require('../model/user')
const passport = require('passport')

router.get('/', async (req, res) => {
    const users = await User.find()
    res.send('Welcome')
})

router.get('/home', async (req, res) => {
    const allUsers = await User.find()
    const users = allUsers.filter((user) => user.id !== req.user.id)
    res.render('home', {
        users
    })
})

router.route('/register')
    .get((req, res) => {
        res.render('register')
    })
    .post(async (req, res) => {
        const user = new User({
            username: req.body.username
        })
        const newUser = await User.register(user, req.body.password)
        req.login(newUser, err => {
            if (err) console.log(err)
            res.redirect('/home')
        })

    })

router.route('/login')
    .get((req, res) => {
        res.render('login')
    })
router.route('/login')
    .post(passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
        res.redirect('/home')

    }) 

module.exports = router