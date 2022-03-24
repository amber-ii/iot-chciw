const express = require('express');
const app = express();
const router = express.Router();
const rp = require('request-promise');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; //必要阿沒加的話賴收不到

// 打入http://localhost:8888/line 就會回傳一個code
router.get('/', function(req, res, next) {
    const state = '200';
    res.redirect(`https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=jz2yZxyRDbS5KcRaLezGbz&redirect_uri=http://localhost:8888/line/callback&scope=notify&state=${state}`);
});
// 要取得code 這行要先打開
router.get('/callback', async function(req, res, next) {
    res.send(req.query);
});

// 發送訊息 我自己的帳號發不了，需要群組的code才能
router.get('/notify', function(req, res, next) {
    // NodeJS群組
    var options = {
        method: 'POST',
        // uri: 'https://notify-api.line.me/api/notify',
        auth: {
            'bearer': 'uG5cCxCLV9rynnJ59GhcOCOUS1BDq71o0uskkZCxTlg'
        },
        form: {
            message: '自來水',
        },
        json: true // Automatically stringifies the body to JSON
    };
    rp(options)
        .then(function(parsedBody) {
            console.log('發送成功，去line看看');

        })
        .catch(function(err) {
            console.log(err);
        });
    res.send(options.form);
});

module.exports = router;