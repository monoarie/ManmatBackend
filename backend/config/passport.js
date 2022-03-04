import passport from 'passport'
import GoogleOauth from 'passport-google-oauth2'
const GoogleStrategy = GoogleOauth.Strategy

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new GoogleStrategy(
    {
        clientID : '425668981848-blghkdesuk6hfdeiaamrabe305hca4l4.apps.googleusercontent.com',
        clientSecret : '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',
        callabackURL : '/auth/google/callback',
        passReqToCallback : true
    }, (request, accessToken, refreshToken, profile, done) => {
        console.log('profile: ', profile)
        const user = profile

        done(null, user)
    }
))

export default passport