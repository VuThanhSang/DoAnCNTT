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
                if (profile._json.hd) {
                    // console.log(profile);
                    if (profile._json.hd.includes('student.hcmute')) {
                        const exitsStudent = await getDB().collection('Students').findOne({ Email: profile.email });
                        if (exitsStudent) {
                            return done(null, { data: exitsStudent, authType: 'student' });
                        }
                        const newStudent = await StudentModel.createNew({
                            Email: profile.email,
                            FullName: profile.displayName,
                            MSSV: profile.email.slice(0, 8),
                        });
                        return done(null, { data: newStudent, authType: 'student' });
                    }
                }
                return done(null, { data: null, message: 'cant login' });
            } catch (error) {
                done(error, false);
            }
        },
    ),
);
