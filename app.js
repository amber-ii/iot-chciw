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
const a25Routes = require('./routes/a25Routes');
const bcrypt = require('bcryptjs');
const acl = require('express-acl');
// const { request } = require('https');



mongoose.connect(
    process.env.DB_CONNECTION, {
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
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    // 透過使用者 id 到 MongoDB 資料庫尋找用戶完整資訊
    User.findById(id, function(err, user) {
        done(err, user);
    });
});



passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            var flag = new
            RegExp("[`~!#$^&*()=|{}':;',\\[\\].<>《》/?~！#￥……&*（）——|{}【】‘；：”“'。，、？ ]"); //eslint-disable-line

            console.log(user);
            if (err || username.length > 11 || flag.test(username)) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user);
            });
        });
    }
));


// Routes
app.use('/iot-chciw/views', router); //指定根路徑

// 硫酸per3
app.use('/sacid', users.isLoggedIn, sacidRoutes.routes);

// 氮氣per5
app.use('/n2r', users.isLoggedIn, n2rRoutes.routes);

// 水質檢測per6
app.use('/toc', users.isLoggedIn, tocRoutes.routes);


// A25-DATA per12
app.use('/a25data', users.isLoggedIn, a25Routes.routes);


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


app.post('/register', async(req, res) => {
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


app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


// 登入驗證+權限設定
app.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/login?error=true'
    }), (req, res) => {
        res.redirect('/');
        // if (req.user.permission == 1) {
        //     res.redirect('/');
        // }
        // if (req.user.permission == 2) {
        //     res.redirect('/air');
        // }
        // if (req.user.permission == 3) {
        //     res.redirect('/permission3');
        // }

        // if (req.user.permission == 5) {
        //     res.redirect('/permission5');
        // }
        // if (req.user.permission == 8) {
        //     res.redirect('/permission8');
        // }
        // if (req.user.permission == 9) {
        //     res.redirect('/ah2ph');
        // }
    });


// 管理員的首頁
app.get('/', users.isLoggedIn, (req, res) => {
    res.render('index', { title: '首頁', name: req.user.name });
    // res.sendFile(`${__dirname}/public/404.html`);
});
// app.get('/', users.isLoggedIn, (req, res) => {
//     if (req.user.permission == 1) {
//         res.render('permission8', { title: '首頁', name: req.user.name });
//     } else {
//         res.sendFile(`${__dirname}/public/404.html`);
//     }
// });
// app.get('/permission3', users.isLoggedIn, (req, res) => {
//     if (req.user.permission == 3) {
//         res.render('permission8', { title: '首頁', name: req.user.name });
//     } else {
//         res.sendFile(`${__dirname}/public/404.html`);
//     }
// });
// app.get('/permission5', users.isLoggedIn, (req, res) => {
//     if (req.user.permission == 5) {
//         res.render('permission8', { title: '首頁', name: req.user.name });
//     } else {
//         res.sendFile(`${__dirname}/public/404.html`);
//     }
// });


// app.get('/permission8', users.isLoggedIn, (req, res) => {
//     if (req.user.permission == 8) {
//         res.render('permission8', { title: '首頁', name: req.user.name });
//     } else {
//         res.sendFile(`${__dirname}/public/404.html`);
//     }
// });

// 各單位的首頁
// app.get('/home', users.isLoggedIn, (req, res) => {
//     const response = {
//         title: 'CHCIW-IOT',
//         name: req.user.name,
//         per2: req.query.per2,
//         per3: req.query.per3,
//         per4: req.query.per4,
//         per5: req.query.per5,
//         per6: req.query.per6,
//         per7: req.query.per7,
//         per8: req.query.per8,
//         per9: req.query.per9,
//         per10: req.query.per10,
//         per11: req.query.per11,
//         per12: req.query.per12,
//     };
//     res.render('index2', response);
// });


// 冷氣per2
app.get('/air', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 2 || req.user.permission == 8) {
        res.sendFile(`${__dirname}/public/air.html`);
    } else {
        res.sendFile(`${__dirname}/public/404.html`);
    }
});

// 自來水per4
app.get('/water', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 3) {
        res.sendFile(`${__dirname}/public/water.html`);
    } else {
        res.sendFile(`${__dirname}/public/404.html`);
    }
});



// A25水質 per6
// app.get('/toc', users.isLoggedIn, (req, res) => {
//     if (req.user.permission == 1 || req.user.permission == 6) {
//         res.sendFile(`${__dirname}/public/toc.html`);
//     } else {
//         res.sendFile(`${__dirname}/public/404.html`);
//     }
// });


// A10蒸氣per7
app.get('/vpc', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 3) {
        res.sendFile(`${__dirname}/public/vpc.html`);
    } else {
        res.sendFile(`${__dirname}/public/404.html`);
    }
});


// A22A23溫度 per8
app.get('/elctair', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 8) {
        res.sendFile(`${__dirname}/public/elctair.html`);
    } else {
        res.sendFile(`${__dirname}/public/404.html`);
    }
});





// 廢水池per9
app.get('/ah2ph', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 9) {
        res.sendFile(`${__dirname}/public/ah2ph.html`);
    } else {
        res.sendFile(`${__dirname}/public/404.html`);
    }
});


// a2a3water per10
app.get('/a2a3water', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 5) {
        res.sendFile(`${__dirname}/public/a2a3water.html`);
    } else {
        res.sendFile(`${__dirname}/public/404.html`);
    }
});


// A11數據per11
app.get('/a11', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 3 || req.user.permission == 11) {
        res.sendFile(`${__dirname}/public/a11.html`);
    } else {
        res.sendFile(`${__dirname}/public/404.html`);
    }
});


// A25DATA per12
app.get('/a25datas', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 3 || req.user.permission == 12) {
        res.sendFile(`${__dirname}/public/a25.html`);
    } else {
        res.sendFile(`${__dirname}/public/404.html`);
    }
});


// A10加熱器 per13

app.get('/a10heat', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 3 || req.user.permission == 13) {
        res.sendFile(`${__dirname}/public/a10heat.html`);
    } else {
        res.sendFile(`${__dirname}/public/404.html`);
    }
});









// PORT
app.listen(8080);