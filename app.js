// const { config } = require('dotenv')
// require('dotenv/config')
require('./break')

const express = require('express')
const app = express()
const configs = require('./config')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const hbs = require('express-handlebars')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/Post')
const Login = require('./models/Login')
var router = express.Router()
const sacidRoutes = require('./routes/sacidRoutes')
const n2rRoutes = require('./routes/n2rRoutes')
const tocRoutes = require('./routes/tocRoutes')
const users = require('./controllers/userController')
const a25Routes = require('./routes/a25Routes')
const a14Routes = require('./routes/a14Routes')
const manageMongoDB = require('./routes/manageMongoDBRoutes')
const particalRoutes = require('./routes/particleRoutes')
const empTempRoutes = require('./routes/empTempRoutes')
const waterRoutes = require('./routes/waterRoutes')
const loginRecordRoutes = require('./routes/loginRecordRoutes')
const a25OutputRoutes = require('./routes/a25OutputRoutes')
const modbusRoutes = require('./routes/modbusRoutes')
const a4LineController = require('./controllers/a4LineController')
const moment = require('moment-timezone')
const bcrypt = require('bcryptjs')
const acl = require('express-acl')
// const cookieParser = require('cookie-session')
mongoose.connect(
    process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log('connect to MongoDB')
    }
)

// MiddleWares
app.engine('hbs', hbs({ extname: '.hbs' }))
app.set('view engine', 'hbs')
    // app.use(express.static(__dirname + '/public'))
app.use(express.static('public'))



app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
    session({
        secret: 'secretok',
        saveUninitialized: true,
        resave: false,
        rolling: true,
        cookie: {
            //   maxAge: 86400 * 1000,
            // ??????????????????????????????????????????
            maxAge: 86400 * 1000,
        },
    })
)

// ????????????
// app.use(cookieParser({
//     name: 'session',
//     secret: 'secret',
//     maxAge: 20 * 1000
// }))


app.use(passport.initialize())
app.use(passport.session())

// ???????????? id ??????????????? session ???
passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    // ??????????????? id ??? MongoDB ?????????????????????????????????
    User.findById(id, function(err, user) {
        done(err, user)
    })
})

passport.use(
    new LocalStrategy(function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            var flag = new RegExp("[`~!#$^&*()=|{}':;',\\[\\].<>??????/?~???#?????????&*????????????|{}?????????????????????'???????????? ]") //eslint-disable-line

            console.log(user)
            if (err || username.length > 11 || flag.test(username)) {
                return done(err)
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' })
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password.' })
                }

                // ?????????????????????DB
                 const post = new Login({
                     username: user.username,
                     permission: user.permission,
                     name: user.name,
                     loginDate: moment().utcOffset('+16:00').format('YYYY/MM/DD HH:mm:ss'),
                 })
                 console.log(post.loginDate)
                 const saveUser = post.save()
                return done(null, user)
            })
        })
    })
)
app.use('/a4line',a4LineController.getEvent)
// Routes
app.use('/iot-chciw/views', router) //???????????????

// ??????per3
app.use('/sacids', users.isLoggedIn, sacidRoutes.routes)

app.use('/waters', users.isLoggedIn, waterRoutes.routes)

// ??????per5
app.use('/n2rs', users.isLoggedIn, n2rRoutes.routes)
app.use('/mongo', manageMongoDB.routes)

// ????????????per3
app.use('/tocs', users.isLoggedIn, tocRoutes.routes)

// A25-DATA per3
app.use('/a25data', users.isLoggedIn, a25Routes.routes)
app.use('/a14data', users.isLoggedIn, a14Routes.routes)
app.use('/particles', users.isLoggedIn, particalRoutes.routes)
app.use('/line', users.isLoggedIn, empTempRoutes.routes)

app.use('/loginrecord', users.isLoggedIn, loginRecordRoutes.routes)
app.use('/a25outputs', users.isLoggedIn, a25OutputRoutes.routes)
    // app.use('/modbus', users.isLoggedIn, modbusRoutes.routes)
app.use('/modbus', modbusRoutes.routes)
app.get('/login', users.isLoggedOut, (req, res) => {
    const response = {
        title: 'CHCIW_IOT',
        error: req.query.error,
    }
    res.render('login', response)
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const username = req.body.username
        const permission = req.body.permission
        const name = req.body.name
        console.log(req.body)
        const postUser = new User({
            username: username,
            password: hashedPassword,
            permission: permission,
            name: name,
        })
        const saveUser = await postUser.save()
        res.render('login')
    } catch {
        res.render('register')
    }
})

app.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
})

// ????????????+????????????
app.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/login?error=true',
    }),
    (req, res) => {
        res.redirect('/')
    }
)

//
app.get('/', users.isLoggedIn, async(req, res) => {
    await res.render('index', { title: 'CHCIW IOT', name: req.user.name })
})

// ??????per2
app.get('/air', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 2 || req.user.permission == 4 || req.user.permission == 8) {
        res.sendFile(`${__dirname}/public/air.html`)
    } else {
        res.sendFile(`${__dirname}/public/404.html`)
    }
})

// ??????
app.get('/sacid', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 3 || req.user.permission == 4) {
      res.sendFile(`${__dirname}/public/sacid.html`)
    } else {
      res.sendFile(`${__dirname}/public/404.html`)
    }
})


// ?????????
app.get('/water', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 3) {
        res.sendFile(`${__dirname}/public/water.html`)
    } else {
        res.sendFile(`${__dirname}/public/404.html`)
    }
})



// ????????? ??????per4
app.get('/water_per4', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 4) {
        res.sendFile(`${__dirname}/public/water_per4.html`)
    } else {
        res.sendFile(`${__dirname}/public/404.html`)
    }
})


// ??????
app.get('/n2r', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 4 || req.user.permission == 5) {
      res.sendFile(`${__dirname}/public/n2r.html`)
    } else {
      res.sendFile(`${__dirname}/public/404.html`)
    }
})



// A10??????
app.get('/vpc', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 3) {
        res.sendFile(`${__dirname}/public/vpc.html`)
    } else {
        res.sendFile(`${__dirname}/public/404.html`)
    }
})


// A10?????? ??????per4
app.get('/vpc_per4', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 4) {
        res.sendFile(`${__dirname}/public/vpc_per4.html`)
    } else {
        res.sendFile(`${__dirname}/public/404.html`)
    }
})

// ?????????(A22A23)?????? per8
app.get('/elctair', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 8 || req.user.permission == 4) {
        res.sendFile(`${__dirname}/public/elctair.html`)
    } else {
        res.sendFile(`${__dirname}/public/404.html`)
    }
})

app.get('/toc', users.isLoggedIn, (req, res) => {
  if (req.user.permission == 1 || req.user.permission == 3 || req.user.permission == 4) {
    res.sendFile(`${__dirname}/public/toc.html`)
  } else {
    res.sendFile(`${__dirname}/public/404.html`)
  }
})


// ?????????per9
app.get('/ah2ph', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 9 || req.user.permission == 4) {
        res.sendFile(`${__dirname}/public/ah2ph.html`)
    } else {
        res.sendFile(`${__dirname}/public/404.html`)
    }
})



// A11??????per11
app.get('/a11', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 3 || req.user.permission == 4) {
        res.sendFile(`${__dirname}/public/a11.html`)
    } else {
        res.sendFile(`${__dirname}/public/404.html`)
    }
})

// A25DATA per12
app.get('/a25datas', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 3 || req.user.permission == 4) {
        res.sendFile(`${__dirname}/public/a25.html`)
    } else {
        res.sendFile(`${__dirname}/public/404.html`)
    }
})


app.get('/a14datas', users.isLoggedIn, (req, res) => {
        if (req.user.permission == 1 || req.user.permission == 5 || req.user.permission == 4) {
            res.sendFile(`${__dirname}/public/a14.html`)
        } else {
            res.sendFile(`${__dirname}/public/404.html`)
        }
    })
    // A10?????????

app.get('/a10heat', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 3) {
        res.sendFile(`${__dirname}/public/a10heat.html`)
    } else {
        res.sendFile(`${__dirname}/public/404.html`)
    }
})

// A10????????? ??????per4
app.get('/a10heat_per4', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 4) {
        res.sendFile(`${__dirname}/public/a10heat_per4.html`)
    } else {
        res.sendFile(`${__dirname}/public/404.html`)
    }
})

app.get('/loginrecord', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 4) {
        res.sendFile(`${__dirname}/public/loginRecord.html`)
    } else {
        res.sendFile(`${__dirname}/public/404.html`)
    }
})

app.get('/particle', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 3 || req.user.permission == 4) {
        res.sendFile(`${__dirname}/public/particle.html`)
    } else {
        res.sendFile(`${__dirname}/public/404.html`)
    }
})
app.get('/empTemp', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1) {
        res.sendFile(`${__dirname}/public/empTemp.html`)
    } else {
        res.sendFile(`${__dirname}/public/404.html`)
    }
})
app.get('/a2', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 5 || req.user.permission == 4) {
        res.sendFile(`${__dirname}/public/a2.html`)
    } else {
        res.sendFile(`${__dirname}/public/404.html`)
    }
})

app.get('/modbus', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1) {
        res.sendFile(`${__dirname}/public/modbus.html`)
    } else {
        res.sendFile(`${__dirname}/public/404.html`)
    }
})


app.get('/stm', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 4 || req.user.permission == 3) {
        res.sendFile(`${__dirname}/public/stm.html`)
    } else {
        res.sendFile(`${__dirname}/public/404.html`)
    }
})
app.get('/a25output', users.isLoggedIn, (req, res) => {
    if (req.user.permission == 1 || req.user.permission == 4 || req.user.permission == 3) {
        res.sendFile(`${__dirname}/public/a25output.html`)
    } else {
        res.sendFile(`${__dirname}/public/404.html`)
    }
})



// PORT
app.listen(8080)