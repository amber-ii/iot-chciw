const { config } = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const session = require('express-session')
const hbs = require('express-handlebars')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
require('dotenv/config');
const configs = require('./config');
const User = require('./models/Post')
var router = express.Router()
const sacidRoutes = require('./routes/sacidRoutes');
const users = require('./controllers/userController');


// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION
    , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log('connect to MongoDB');
    })


// Middlewares
app.engine('hbs', hbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');
// app.set("views",+"views") 
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
    secret: 'secretok',
    saveUninitialized: true,
    resave: false,
    rolling: true,
    cookie: {
        maxAge: 86400 * 1000
    },
}))


// passport.js
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user, done) {
    // 只將用戶 id 序列化存到 session 中
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    // 透過使用者 id 到 MongoDB 資料庫尋找用戶完整資訊
    User.findById(id, function (err, user) {
        done(err, user)
    })
})



// Import Routes
// const postsRoute = require('./routes/posts');
// app.use('/posts', postsRoute)



passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            console.log(user)
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password != password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));


// Routes
app.use('/iot-chciw/views', router) //指定根路徑


app.get('/login', users.isLoggedOut, (req, res) => {
    console.log(__dirname);
    const response = {
        title: "Login",
        error: req.query.error
    }
    res.render('login', response)
    
})

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/')
})

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login?error=true'
    }),
)

app.get('/', isLoggedIn, (req, res) => {
    res.render('index', { title: "首頁" })
})

app.get('/air', isLoggedIn, (req, res) => {
    res.sendFile(`${__dirname}/public/air.html`)
    // res.render('air')
})
app.get('/water', isLoggedIn, (req, res) => {
    res.sendFile(`${__dirname}/public/water.html`)
})
app.get('/sacid', isLoggedIn, (req, res) => {
   
   
}, app.use('/sacid', sacidRoutes.routes))
app.get('/n2r', isLoggedIn, (req, res) => {
    res.sendFile(`${__dirname}/public/n2r.html`)
})
app.get('/plc', isLoggedIn, (req, res) => {
    res.sendFile(`${__dirname}/public/plc.html`)
})
app.get('/vpc', isLoggedIn, (req, res) => {
    res.sendFile(`${__dirname}/public/vpc.html`)
})


// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) { return next() }
//     res.redirect('/login')
// }

// function isLoggedOut(req, res, next) {
//     if (!req.isAuthenticated()) { return next() }
//     res.redirect('/')
// }


// PORT
app.listen(8080);