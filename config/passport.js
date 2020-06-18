const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const secret = require('../config/secret');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret.secretKey;


module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        //console.log(jwt_payload);
        User.findById({
                _id: jwt_payload.id
            })
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
    }));
};