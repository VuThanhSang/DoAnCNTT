import passport from 'passport';
import { ExtractJwt } from 'passport-jwt';
import { getDB } from '../config/mongodb';
// import { AuthModel } from '../models/User.model';
import { env } from '../config/environment';
import { StudentModel } from '../models/students.model';
import { date } from 'joi';
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(async function (user, done) {
    const newUser = await getDB().collection('Users').findOne({ _id: user._id });
    if (newUser) {
        done(null, newUser);
    }
    done(null, user);
});
//passport Jwt
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
            secretOrKey: env.JWT_SECRET,
            passReqToCallback: true,
        },
        async (payload, done) => {
            try {
                const user = await UserModel.findOneById(payload.sub);
                if (!user) return done(null, false);
                done(null, user);
            } catch (error) {
                done(error, false);
            }
        },
    ),
);
const createRandom = () => {
    var randomstring = '';
    var characters = '1234567890';
    for (var i, i = 0; i < 8; i++) {
        randomstring += characters.charAt(Math.floor(Math.random() * 8));
    }
    return randomstring;
};
//passport  google
passport.use(
    new GoogleStrategy(
        {
            clientID: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3240/v1/auth/google/callback',
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const exitsStudent = await getDB().collection('Students').findOne({ Email: profile.email });
                if (exitsStudent) {
                    return done(null, { data: exitsStudent, authType: 'student' });
                }
                let newStudent;
                if (profile._json.hd) {
                    newStudent = await StudentModel.createNew({
                        Email: profile.email,
                        FullName: profile.displayName,
                        MSSV: profile.email.slice(0, 8),
                    });
                } else {
                    newStudent = await StudentModel.createNew({
                        Email: profile.email,
                        FullName: profile.displayName,
                        MSSV: createRandom(),
                    });
                }
                return done(null, { data: newStudent, authType: 'student' });
            } catch (error) {
                done(error, false);
            }
        },
    ),
);
