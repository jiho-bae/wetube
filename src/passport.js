import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import dotenv from "dotenv";
import { kakaoLoginCallback, githubLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

dotenv.config();
passport.use(User.createStrategy());
passport.use(
    new GithubStrategy({
        clientID: process.env.GH_ID,
        clientSecret: process.env.GH_SECRET,
        callbackURL: process.env.PRODUCTION ? `https://salty-caverns-36837.herokuapp.com${routes.githubCallback}` : `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
    )
); 

passport.use(
    new KakaoStrategy({
        clientID: process.env.KA_ID,
        clientSecret: process.env.KA_SECRET,
        callbackURL: process.env.PRODUCTION ? `https://salty-caverns-36837.herokuapp.com${routes.kakaoCallback}` : `http://localhost:4000${routes.kakaoCallback}`
    },
    kakaoLoginCallback
    )
);  

passport.serializeUser(function (user, done) {
    done(null, user);
    });
    
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
    done(err, user);
    });
});