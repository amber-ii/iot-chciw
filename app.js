const { config } = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const hbs = require('express-handlebars');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv/config');
const configs = require('./config');
const User = require('./models/Post');
var router = express.Router();
const sacidRoutes = require('./routes/sacidRoutes');
const n2rRoutes = require('./routes/n2rRoutes');
const tocRoutes = require('./routes/tocRoutes');
const users = require('./controllers/userController');
const bcrypt = require('bcryptjs');
// const { db } = require('./models/User');

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION
    , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log('connect to MongoDB');
    });

// MiddleWares
app.engine('hbs', hbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'secretok',
    saveUninitialized: true,
    resave: false,
    rolling: true,
    cookie: {
        maxAge: 86400 * 1000
    },
}));

app.use(passport.initialize());
app.use(passport.session());


// 只將用戶 id 序列化存到 session 中
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    // 透過使用者 id 到 MongoDB 資料庫尋找用戶完整資訊
    User.findById(id, function (err, user) {
        done(err, user);
    });
});



passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            console.log(user);
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    return done(null, user);
                }
                return done(null, false, { message: 'Incorrect password.' });
            });
            // return done(null, user);
        });
    }
));


// Routes
app.use('/iot-chciw/views', router); //指定根路徑
app.use('/sacid', users.isLoggedIn, sacidRoutes.routes);
// app.use('/sacid', sacidRoutes.routes)


app.use('/n2r', users.isLoggedIn, n2rRoutes.routes);


app.use('/toc', users.isLoggedIn, tocRoutes.routes);

app.get('/login', users.isLoggedOut, (req, res) => {
    const response = {
        title: 'CHCIW_IOT',
        error: req.query.error
    };
    res.render('login', response);
});


app.get('/register', (req, res) => {
    res.render('register');
});


app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const username = req.body.username;
        const permission = req.body.permission;
        console.log(req.body);
        const postUser = new User({
            username: username,
            password: hashedPassword,
            permission: permission
        });
        const saveUser = await postUser.save();
        res.json(saveUser);
    } catch {
        res.render('register');
    }
});





app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


app.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/login?error=true'
    }), (req, res) => {
        if (req.user.permission == 1) {
            res.redirect('/');
        }
        if (req.user.permission == 2) {
            res.redirect('/air');
        }
        if (req.user.permission == 3) {
            res.redirect('/sacid');
        }
        if (req.user.permission == 4) {
            res.redirect('/water');
        }
        if (req.user.permission == 5) {
            res.redirect('/n2r');
        }
        if (req.user.permission == 6) {
            res.redirect('/plc');
        }
        if (req.user.permission == 7) {
            res.redirect('/vpc');
        }
    });


// app.post('/login',
//     passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/login?error=true'
//     }),
// )

app.get('/', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1) {
        res.render('index', { title: '首頁' });
    } else {
        res.sendFile(`${__dirname}/public/404.html`);
    }
});

app.get('/air', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 2) {
        res.sendFile(`${__dirname}/public/air.html`);
    } else {
        res.sendFile(`${__dirname}/public/404.html`);
    }
});


// app.get('/water', users.isLoggedIn, (req, res) => {

//     res.sendFile(`${__dirname}/public/water.html`)
// })




app.get('/water', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 4) {
        res.sendFile(`${__dirname}/public/water.html`);
    } else {
        res.sendFile(`${__dirname}/public/404.html`);
    }
});





// app.get('/n2r',  users.isLoggedIn, (req, res) => {
//     res.sendFile(`${__dirname}/public/n2r.html`)
// })
app.get('/plc', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 6) {
        res.sendFile(`${__dirname}/public/plc.html`);
    } else {
        res.sendFile(`${__dirname}/public/404.html`);
    }
});



app.get('/vpc', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 7) {
        res.sendFile(`${__dirname}/public/vpc.html`);
    } else {
        res.sendFile(`${__dirname}/public/404.html`);
    }
});


// PORT
app.listen(8080);