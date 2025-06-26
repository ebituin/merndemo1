require("dotenv").config();
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const GoogleStategy = require("passport-google-oauth20").Strategy;

const router = express.Router();

passport.use(new GoogleStategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
        const user = {
            id: profile.id,
            name: profile.displayName,
            email: profile.email[0].value,
            picture: profile.photos[0].value,
        };
        return done(null,user);
    }
));


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"]}));

router.get(
    "/google/callback",
    passport.authenticate("google", {session: false}),
    (req, res) => {
        const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.redirect(`http://localhost:3000/login-success?token=${token}`)
    }
);

module.exports = router;