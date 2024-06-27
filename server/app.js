const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()
const indexRouter = require('./routes/index');
const apicache = require("apicache")
let cache = apicache.middleware;
const cors = require("cors")
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user")
const bcrypt = require('bcryptjs');
const MongoStore = require('connect-mongo');

const app = express();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


const corsOptions = {
  origin: 'https://blog-7tydo1uhw-brdorads-projects.vercel.app',
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cookieParser());
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true, store: MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'sessions'
  
}),
cookie: { maxAge: 1000*60*60*24, ephemeral: true, secure:true }  }));
app.use(passport.session());
// app.use(cache('2 minutes'))
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    
    res.json("success")
  });
});

passport.use(
  new LocalStrategy({
    usernameField: "email",
    passwordField: "password",

  },
    
    async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, { message: "Incorrect email" });
        
      };
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch) {
        return done(null, false, { message: "Incorrect password" });
      };
      
      return done(null, user);
      
    } catch(err) {
      return done(err);
    };
  })
);
passport.serializeUser((user, done) => {
  
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    
    const user = await User.findById(id).exec();
    done(null, user);
  } catch(err) {
    done(err);
  };
});

app.use('/', indexRouter);


app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;