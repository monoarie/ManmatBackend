import express from 'express'
const router = express.Router();
import passport from '../config/passport.js'

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

const authSuccess = (req, res) => {
    res.redirect('/')
}

router.get('/google', passport.authenticate('google', { scope: ['profile']}))
router.get('/google/callback', passport.authenticate('google'), authSuccess)



export default router