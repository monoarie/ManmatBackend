import express from 'express'
import dotenv from 'dotenv'

import passport from 'passport'
import session from 'express-session'
import main from './routes/main.js'
import auth from './routes/auth.js'

import connectDB from './config/db.js'
import restaurantRoutes from './routes/restaurantRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.set('view engine', 'ejs')
app.use(session({secret:'MySecret', resave: false, saveUninitialized:true}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/', main)
app.use('./auth', auth)

app.use(restaurantRoutes)
app.use('/api/users', userRoutes)
//app.use(userRoutes)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
