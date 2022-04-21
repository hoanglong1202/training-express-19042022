const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const passport = require("passport");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
require("dotenv").config();

var GitHubStrategy = require("passport-github2").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const PORT = process.env.PORT || 5010;

// parse json request body
app.use(express.json());

app.use(helmet());
app.use(morgan("common"));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log({ githubId: profile.id });
      done(null, profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log({ googleId: profile.id });
      done(null, profile);
    }
  )
);

app.get("/", (req, res) => {
  res.send("This is Dashboard");
});

app.get("/login-fail", (req, res) => {
  res.send("Login Failed");
});

app.get("/login-success", (req, res) => {
  res.send("Login success");
});

app.use("/api", routes);

app.use((err, req, res, next) => {
  const msg = `${req.url}---${req.method}---${err.status}---${err.message}`;

  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
    link: {
      docs: 'https://docs.com',
    },
  });
})

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

mongoose.connection.on("connected", () => console.log("MongoDB connects successfully"));
mongoose.connection.on("disconnected", () => console.log("MongoDB disconnects successfully"));
mongoose.connection.on("error", (error) => console.log("MongoDB didnt connect successfully " + error));

process.on("SIGINT", () => {
  mongoose.connection.close();
  process.exit(0);
});

app.listen(PORT, () => console.log(`Server listen on ${PORT}`));
